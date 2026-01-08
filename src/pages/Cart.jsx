import React, { useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import { useCart } from "../context/useCart";
import { FiTrash2 } from "react-icons/fi";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleDecrease = (item) => {
    if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
  };

  const handleIncrease = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">Your Shopping Cart</h1>
          <a href="/" className="inline-block bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-200 transition text-sm sm:text-base">Continue Shopping</a>
        </div>
        <ul className="space-y-4 mb-8">
          {cartItems.map(item => (
            <li key={item.id} className={`flex flex-col sm:flex-row items-center sm:justify-between gap-4 bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition ${item.ordered ? 'opacity-60' : ''}`}>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img src={item.image} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg" />
                <div>
                  <h3 className="text-gray-900 font-semibold text-base sm:text-lg">{item.name}</h3>
                  <p className="text-blue-600 font-medium text-sm sm:text-base">Rs {item.price}</p>
                  {item.ordered && <span className="text-xs text-green-600 font-bold ml-2">Ordered</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                {/* Quantity buttons */}
                <div className="flex items-center border-2 border-blue-300 rounded-lg">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold text-lg"
                    disabled={item.ordered}
                  >
                    -
                  </button>
                  <span className="px-3 py-2 sm:px-4 sm:py-2 text-gray-900 font-medium text-base">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item)}
                    className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold text-lg"
                    disabled={item.ordered}
                  >
                    +
                  </button>
                </div>
                {/* Delete button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
                  disabled={item.ordered}
                >
                  <FiTrash2 size={22} />
                </button>
                {/* Price */}
                <div className="font-bold text-gray-900 text-base sm:text-lg min-w-max">Rs {(item.price * item.quantity).toLocaleString()}</div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col items-center sm:items-end">
          <div className="w-full max-w-md bg-white p-4 sm:p-8 rounded-lg shadow-lg border-2 border-blue-200 space-y-4">
            <div className="flex justify-between font-bold text-gray-900 text-lg sm:text-xl border-b-2 border-blue-200 pb-4">
              <span>Total Amount:</span>
              <span className="text-blue-600">Rs {total.toLocaleString()}</span>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-base sm:text-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
        {isCheckoutOpen && <CheckoutForm onClose={() => setIsCheckoutOpen(false)} />}
      </div>
    </div>
  );
}

export default Cart;
