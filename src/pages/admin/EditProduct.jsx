import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import axios from "axios";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [localFile, setLocalFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const imgbbApiKey = "60d8de76b8915722cd93bb36faa4dcca";

  // Fetch product + categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        }

        // Fetch categories
        const catSnap = await getDocs(collection(db, "categories"));
        setCategories(catSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageURL = product.image;

      // If new image selected → upload to imgbb
      if (localFile) {
        const formData = new FormData();
        formData.append("image", localFile);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          formData
        );

        finalImageURL = res.data.data.url;
      }

      // Update Firestore
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, {
        name: product.name,
        price: Number(product.price),
        category: product.category,
        image: finalImageURL,
      });

      setMessage("Product updated successfully!");
      setTimeout(() => navigate("/admin/products"), 1200);
    } catch (error) {
      console.error("Error updating:", error);
      setMessage("Error updating product.");
    }

    setLoading(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Edit Product
      </Typography>

      <form onSubmit={handleUpdate}>

        <TextField
          label="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Price (Rs)"
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          fullWidth
          margin="normal"
        />

        {/* Category Dropdown */}
        <TextField
          select
          label="Category"
          value={product.category || ""}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          fullWidth
          margin="normal"
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Image URL"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
          fullWidth
          margin="normal"
        />

        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload New Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setLocalFile(e.target.files[0])}
          />
        </Button>

        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </Button>
        </Box>

        {message && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </form>
    </Box>
  );
}

export default EditProduct;
