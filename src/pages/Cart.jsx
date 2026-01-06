import React, { useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import { useCart } from "../context/CartContext";
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
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-center justify-between gap-4 bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div>
                      <h3 className="text-gray-900 font-semibold text-lg">{item.name}</h3>
                      <p className="text-blue-600 font-medium">Rs {item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Quantity buttons */}
                    <div className="flex items-center border-2 border-blue-300 rounded-lg">
                      <button
                        onClick={() => handleDecrease(item)}
                        className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 text-gray-900 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item)}
                        className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
                    >
                      <FiTrash2 size={22} />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="ml-4 font-bold text-gray-900 text-lg min-w-max">Rs {(item.price * item.quantity).toLocaleString()}</div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-end">
              <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border-2 border-blue-200 space-y-4">
                <div className="flex justify-between font-bold text-gray-900 text-xl border-b-2 border-blue-200 pb-4">
                  <span>Total Amount:</span>
                  <span className="text-blue-600">Rs {total.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {isCheckoutOpen && <CheckoutForm onClose={() => setIsCheckoutOpen(false)} />}
    </div>
  );
}

export default Cart;
