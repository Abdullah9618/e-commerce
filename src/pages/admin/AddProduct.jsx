import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import axios from "axios";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [localFile, setLocalFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const imgbbApiKey = "60d8de76b8915722cd93bb36faa4dcca";

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(list);
    };

    fetchCategories();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!name || !price || !category || (!imageURL && !localFile)) {
      setMessage("Please fill all fields including category.");
      return;
    }

    setLoading(true);

    try {
      let finalImageURL = imageURL;

      // Upload local image to imgbb
      if (localFile) {
        const formData = new FormData();
        formData.append("image", localFile);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          formData
        );

        finalImageURL = res.data.data.url;
      }

      // Add product to Firestore
      await addDoc(collection(db, "products"), {
        name,
        price: parseFloat(price),
        category,
        image: finalImageURL,
        createdAt: serverTimestamp(),
      });

      setMessage("Product added successfully!");
      setName("");
      setPrice("");
      setCategory("");
      setImageURL("");
      setLocalFile(null);
    } catch (err) {
      console.error("Error adding product:", err);
      setMessage("Error adding product. Check console.");
    }

    setLoading(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Product
      </Typography>

      <form onSubmit={handleAddProduct}>
        <TextField
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Price (Rs)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Category Dropdown */}
        <TextField
          select
          label="Select Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setLocalFile(e.target.files[0])}
          />
        </Button>

        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Product"}
          </Button>
        </Box>

        {message && (
          <Typography color="error" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </form>
    </Box>
  );
}

export default AddProduct;
