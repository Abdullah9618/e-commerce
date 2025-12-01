// src/pages/Checkout.jsx
import React, { useState } from "react";
import { db } from "../firebase";
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
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {itemsToCheckout.length === 0 ? (
        <p className="text-red-500 font-semibold">Your cart is empty!</p>
      ) : (
        <>
          {/* ORDER SUMMARY */}
          <div className="bg-gray-100 p-4 rounded mb-4">
            <h3 className="font-bold mb-2">Order Summary</h3>
            {itemsToCheckout.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-1">
                <span>{item.name} (x{item.quantity || 1})</span>
                <span>Rs {item.price * (item.quantity || 1)}</span>
              </div>
            ))}
            <hr className="my-2" />
            <p className="font-bold">
              Total: Rs{" "}
              {itemsToCheckout.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)}
            </p>
          </div>

          {/* CHECKOUT FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-3 border rounded"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              className="w-full p-3 border rounded"
              value={form.contact}
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder="Full Address"
              className="w-full p-3 border rounded"
              value={form.address}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Checkout;
