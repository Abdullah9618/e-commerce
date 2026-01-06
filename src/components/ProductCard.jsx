import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Chip } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";

function ProductCard({ product }) {
  const { cartItems, addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group relative block overflow-hidden border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
      {/* CATEGORY CHIP */}
      {product.category && (
        <Chip
          label={product.category}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            backgroundColor: "#1e3a8a",
            color: "#ffffff",
            fontWeight: 600,
            zIndex: 10,
          }}
        />
      )}

      {/* IMAGE */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* PRODUCT INFO */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-2xl font-bold text-blue-600 mb-4">
          Rs. {product.price}
        </p>

        {/* ADD TO CART BUTTON */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            isInCart
              ? "bg-blue-100 text-blue-700 border border-blue-700 cursor-default"
              : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
          }`}
          disabled={isInCart}
        >
          <ShoppingBag size={18} />
          {isInCart ? "In Cart" : isAdded ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
