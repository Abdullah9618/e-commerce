import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/organic-3-green.png";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useCart();

  return (
    <nav className="bg-green-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3">

        {/* Top row: Logo + Search + Cart */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img src={logo} alt="Biolife Logo" className="h-12" />
          </Link>

          <div className="flex-1 flex">
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-1 px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
            />
            <button className="px-4 py-2 bg-green-600 text-white rounded-r hover:bg-green-700 transition">
              <i className="fa fa-search"></i>
            </button>
          </div>

          <Link
            to="/cart"
            className="relative px-4 py-2 border rounded border-green-600 text-green-900 hover:bg-green-100 transition"
          >
            <i className="fa fa-shopping-cart"></i>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Bottom row: Navigation links */}
        <div className="flex space-x-8 mt-3 text-green-900 font-medium">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
