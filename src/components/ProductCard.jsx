import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { Chip } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import ImageZoomModal from "./ImageZoomModal";

function ProductCard({ product }) {
  const { cartItems, addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const navigate = useNavigate();

  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setShowCartPopup(true);
    setTimeout(() => {
      setIsAdded(false);
      setShowCartPopup(false);
    }, 1500);
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
      <div
        className="relative h-64 sm:h-72 overflow-hidden bg-gray-100 cursor-pointer group/image"
        onClick={() => setShowZoomModal(true)}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Zoom Icon Indicator */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/image:bg-opacity-20 transition-all flex items-center justify-center">
          <div className="opacity-0 group-hover/image:opacity-100 transition-opacity">
            <svg
              className="w-8 h-8 text-white drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
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

        {/* Cart Popup Modal */}
        {showCartPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-xs w-full flex flex-col items-center gap-4 border-2 border-blue-200">
              <div className="text-2xl text-blue-700 font-bold">Added to Cart!</div>
              <button
                onClick={() => navigate('/cart')}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Go to Cart
              </button>
              <button
                onClick={() => setShowCartPopup(false)}
                className="w-full bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

        {/* Image Zoom Modal */}
        <ImageZoomModal
          key={showZoomModal ? `${product.id}-open` : `${product.id}-closed`}
          isOpen={showZoomModal}
          imageUrl={product.image}
          imageName={product.name}
          onClose={() => setShowZoomModal(false)}
        />
      </div>
    </div>
  );
}

export default ProductCard;
