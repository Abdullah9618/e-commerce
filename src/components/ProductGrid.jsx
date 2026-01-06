import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";
import app from "../services/firebase";

import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";

import ProductCard from "./ProductCard";
import Loading from "./Loading";

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products + categories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      // Debug: log which Firebase project we're connected to
      try {
        console.log("[ProductGrid] Firebase projectId:", app?.options?.projectId || "<no-app>");
      } catch (e) {
        console.warn("[ProductGrid] Could not read app options:", e);
      }
      try {
        // Try ordered fetch first (may require index)
        try {
          const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
          const prodSnap = await getDocs(q);
          const productList = prodSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setProducts(productList);
          console.log("[ProductGrid] fetched products (ordered):", productList.length);
        } catch (orderedErr) {
          // Fallback to unordered fetch if ordered query fails
          console.warn("Ordered query failed, retrying without order:", orderedErr);
          const prodSnap = await getDocs(collection(db, "products"));
          const productList = prodSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setProducts(productList);
          console.log("[ProductGrid] fetched products (fallback):", productList.length);
        }

        // Fetch categories (separate try so products still show if categories fail)
        try {
          const catSnap = await getDocs(collection(db, "categories"));
          const categoryList = catSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setCategories(categoryList);
          console.log("[ProductGrid] fetched categories:", categoryList.length);
        } catch (catErr) {
          console.warn("Failed to load categories:", catErr);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products. Check console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter logic
  const filteredProducts =
    selectedCategory === ""
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (loading) return <Loading message="Loading products..." />;

  return (
    <div className="max-w-7xl mx-auto p-4">

      <h1 className="text-3xl font-bold mb-4">All Products</h1>

      {/* ⭐ Filter Bar */}
    {/* ⭐ Filter Bar */}
<div className="flex items-center gap-4 p-4 border-2 border-blue-200 rounded-lg shadow-md bg-gradient-to-r from-blue-50 to-white mb-6">

  <FilterListIcon className="text-blue-600" sx={{ fontSize: 28 }} />

  <span className="font-semibold text-gray-800 text-lg">
    Filter by Category
  </span>

  <select
    className="p-2 rounded-lg border-2 border-blue-400 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
  >
    <option value="">All</option>
    {categories.map((cat) => (
      <option key={cat.id} value={cat.name}>
        {cat.name}
      </option>
    ))}
  </select>

  {selectedCategory && (
    <button
      onClick={() => setSelectedCategory("")}
      className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-800 transition ml-auto"
    >
      <ClearIcon sx={{ fontSize: 18 }} />
      Clear
    </button>
  )}

</div>


      {/* Product Grid */}
      {error && (
        <p className="text-red-500 mb-4 text-center">{error}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductGrid;
