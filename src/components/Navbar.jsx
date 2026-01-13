import { Link } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "../context/useCart";

function Navbar() {
  const { cartItems } = useCart();

  return (
    <nav className="bg-white border-b-2 border-blue-600 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top row: Logo + Search + Cart */}
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">Subhan Arts</h1>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search clothing..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
              />
              <button className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-600">
                <Search size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/admin/products"
              className="hidden sm:inline-flex items-center px-3 py-2 text-sm font-semibold text-blue-700 border border-blue-200 rounded-lg hover:border-blue-600 hover:text-blue-800 transition-colors"
            >
              Admin Panel
            </Link>
            <Link
              to="/cart"
              className="relative flex items-center text-blue-600 hover:text-blue-800 transition font-medium"
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Bottom row: Navigation links */}
        <div className="flex items-center h-12 gap-8 text-gray-700 font-medium">
          <a href="#top" className="hover:text-blue-600 transition">
            Home
          </a>
          <a href="#products" className="hover:text-blue-600 transition">
            Collections
          </a>
          <a href="#contact" className="hover:text-blue-600 transition">
            Contact
          </a>
          <Link
            to="/admin/products"
            className="text-blue-700 hover:text-blue-800 transition font-semibold"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
