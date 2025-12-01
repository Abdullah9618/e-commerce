import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";

import ProductCard from "./ProductCard";

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch products + categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const prodSnap = await getDocs(q);

        const productList = prodSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);

        // Fetch categories
        const catSnap = await getDocs(collection(db, "categories"));
        const categoryList = catSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchData();
  }, []);

  // Filter logic
  const filteredProducts =
    selectedCategory === ""
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto p-4">

      <h1 className="text-3xl font-bold mb-4">All Products</h1>

      {/* ⭐ Filter Bar */}
    {/* ⭐ Filter Bar */}
<div className="flex items-center gap-4 p-4 border rounded-sm shadow-sm bg-white mb-6">

  <FilterListIcon className="text-blue-600" sx={{ fontSize: 28 }} />

  <span className="font-semibold text-gray-800 text-lg">
    Filter by Category
  </span>

  <select
    className="p-2 rounded w-25 border border-blue-300 bg-green-50 text-gray-900"
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
      className="flex items-center gap-1 text-red-600 text-sm font-medium hover:underline ml-auto"
    >
      <ClearIcon sx={{ fontSize: 18 }} />
      Clear
    </button>
  )}

</div>


      {/* Product Grid */}
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
