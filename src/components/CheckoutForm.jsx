// src/pages/Checkout.jsx
import React, { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useCart } from "../context/useCart";
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
      setForm({ name: "", contact: "", address: "" });
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-blue-100">
        <div className="p-4 sm:p-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-blue-700 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25v12a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 18.75v-12z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 9.75h10.5m-10.5 3h10.5m-10.5 3h6.75" /></svg>
            Checkout
          </h2>

          {itemsToCheckout.length === 0 ? (
            <p className="text-red-500 font-semibold text-center">Your cart is empty!</p>
          ) : (
            <>
              {/* ORDER SUMMARY */}
              <div className="bg-gradient-to-r from-blue-50 to-white p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 border-2 border-blue-200 shadow-sm">
                <h3 className="font-bold mb-3 sm:mb-4 text-gray-900 text-base sm:text-lg flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
                  Order Summary
                </h3>
                {itemsToCheckout.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row justify-between text-sm sm:text-base mb-2 sm:mb-3">
                    <span className="text-gray-700 font-medium">{item.name} × {item.quantity || 1}</span>
                    <span className="font-semibold text-blue-700">Rs {(item.price * (item.quantity || 1)).toLocaleString()}</span>
                  </div>
                ))}
                <hr className="my-4 border-blue-200" />
                <p className="font-bold text-lg sm:text-xl text-blue-700 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 1" /></svg>
                  Total: Rs {itemsToCheckout.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toLocaleString()}
                </p>
              </div>

              {/* CHECKOUT FORM */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm sm:text-base"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />

                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <input
                    type="text"
                    name="contact"
                    placeholder="Contact Number"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm sm:text-base"
                    value={form.contact}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="address"
                    placeholder="Full Address"
                    rows="3"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm resize-none text-sm sm:text-base"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-6">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2 shadow-md text-base"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    Place Order
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full sm:flex-1 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold flex items-center justify-center gap-2 shadow-md text-base"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
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
