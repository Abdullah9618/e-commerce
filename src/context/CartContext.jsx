// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
  setCartItems((prev) => {
    const existing = prev.find((item) => item.id === product.id);
    if (existing) {
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Include category when adding to cart
      return [...prev, { ...product, quantity: 1, category: product.category || "N/A" }];
    }
  });
};
  // Remove product from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity of a product
  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate subtotal
  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Place order in Firebase
  const placeOrder = async (userInfo) => {
    try {
      await addDoc(collection(db, "orders"), {
        userInfo,          // includes name, email, contact, address
        products: cartItems, 
        total: getSubtotal(),
        createdAt: new Date(),
      });
      clearCart(); // Clear cart after successful order
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order.");
    }
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubtotal,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
