// src/pages/Checkout.jsx
import React, { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // If user clicked "Buy Now" on a single product
  const productFromState = location.state?.product;

  const itemsToCheckout = productFromState ? [{ ...productFromState, quantity: 1 }] : cartItems;

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (itemsToCheckout.length === 0) {
      alert("No items to checkout!");
      return;
    }

    try {
      // Save order to Firebase
      await addDoc(collection(db, "orders"), {
        userInfo: { ...form },
        products: itemsToCheckout,
        total: itemsToCheckout.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
        createdAt: serverTimestamp(),
      });

      alert("Order placed successfully!");

      // Clear form + cart
      setForm({ name: "", email: "", contact: "", address: "" });
      clearCart();

      // Redirect to home after order
      navigate("/");

    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Checkout</h2>

          {itemsToCheckout.length === 0 ? (
            <p className="text-red-500 font-semibold text-center">Your cart is empty!</p>
          ) : (
            <>
              {/* ORDER SUMMARY */}
              <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg mb-6 border-2 border-blue-200">
                <h3 className="font-bold mb-4 text-gray-900 text-lg">Order Summary</h3>
                {itemsToCheckout.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm mb-3">
                    <span className="text-gray-700">{item.name} × {item.quantity || 1}</span>
                    <span className="font-semibold text-gray-900">Rs {(item.price * (item.quantity || 1)).toLocaleString()}</span>
                  </div>
                ))}
                <hr className="my-4 border-blue-200" />
                <p className="font-bold text-lg text-blue-600">
                  Total: Rs{" "}
                  {itemsToCheckout.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toLocaleString()}
                </p>
              </div>

              {/* CHECKOUT FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="contact"
                  placeholder="Contact Number"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.contact}
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="address"
                  placeholder="Full Address"
                  rows="3"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.address}
                  onChange={handleChange}
                  required
                />

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    Place Order
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-gray-300 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
