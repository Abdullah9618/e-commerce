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
    <div className="bg-green-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-700">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-center justify-between gap-4 bg-white p-4 rounded shadow-sm">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="text-gray-900 font-medium">{item.name}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Quantity buttons */}
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => handleDecrease(item)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="ml-4 font-medium text-gray-900">Rs {item.price * item.quantity}</div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-end">
              <div className="w-full max-w-md bg-white p-6 rounded shadow-md space-y-4">
                <div className="flex justify-between font-bold text-gray-900 text-lg">
                  <span>Total</span>
                  <span>Rs {total}</span>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
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
