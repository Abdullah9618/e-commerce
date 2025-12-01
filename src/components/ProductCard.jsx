import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Chip } from "@mui/material";

function ProductCard({ product }) {
  const { cartItems, addToCart } = useCart();
  const { user } = useAuth();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const isAdded = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!user) {
      setIsLoginOpen(true);
      return;
    }
    if (!isAdded) {
      addToCart(product);
    }
  };

  return (
    <div className="relative block overflow-hidden border border-gray-100 bg-white rounded shadow-sm">
      {/* CATEGORY CHIP OUTSIDE HOVER/IMAGE */}
      {product.category && (
        <Chip
          label={product.category}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            backgroundColor: "#e0e7ff",
            color: "#1e3a8a",
            fontWeight: 600,
            borderRadius: "16px",
            height: "24px",
            zIndex: 10, // make sure it's above image
          }}
        />
      )}

      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition duration-500 hover:scale-105 sm:h-72"
        />
      </div>

      <div className="relative p-6">
        <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1.5 text-sm text-gray-700">Rs. {product.price}</p>

        <button
          onClick={handleAddToCart}
          className={`mt-4 block w-full rounded-sm p-4 text-sm font-medium transition hover:scale-105 ${
            isAdded
              ? "bg-white text-green-600 border border-green-600 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
          disabled={isAdded}
        >
          {isAdded ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>

      {isLoginOpen && (
        <Login
          isModal={true}
          closeModal={() => setIsLoginOpen(false)}
          switchToRegister={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
          redirectAfterLogin={null}
        />
      )}

      {isRegisterOpen && (
        <Register
          isModal={true}
          closeModal={() => setIsRegisterOpen(false)}
          switchToLogin={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
          redirectAfterRegister={null}
        />
      )}
    </div>
  );
}

export default ProductCard;
