// src/context/CartContext.jsx
import React, { useReducer, useEffect } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

import { CartContext } from "./CartProvider";

export const CartProvider = ({ children }) => {
  // Load cart from localStorage if present
  const getInitialCart = () => {
    try {
      const stored = localStorage.getItem("cartItems");
      if (stored) return { cartItems: JSON.parse(stored) };
    } catch {
      // Ignore JSON parse/localStorage errors
    }
    return { cartItems: [] };
  };
  const initialState = getInitialCart();

  function cartReducer(state, action) {
    switch (action.type) {
      case "ADD": {
        const product = action.payload;
        const existing = state.cartItems.find((i) => i.id === product.id);
        if (existing) {
          return {
            ...state,
            cartItems: state.cartItems.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return {
          ...state,
          cartItems: [...state.cartItems, { ...product, quantity: 1, category: product.category || "N/A" }],
        };
      }
      case "REMOVE":
        return { ...state, cartItems: state.cartItems.filter((i) => i.id !== action.payload) };
      case "UPDATE_QTY":
        return {
          ...state,
          cartItems: state.cartItems.map((item) => (item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item)),
        };
      case "CLEAR":
        return { ...state, cartItems: [] };
      case "SET":
        return { ...state, cartItems: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addToCart = (product) => dispatch({ type: "ADD", payload: product });
  const removeFromCart = (id) => dispatch({ type: "REMOVE", payload: id });
  const updateQuantity = (id, quantity) => dispatch({ type: "UPDATE_QTY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const getSubtotal = () => state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async (userInfo) => {
    try {
      await addDoc(collection(db, "orders"), {
        userInfo,
        products: state.cartItems,
        total: getSubtotal(),
        createdAt: new Date(),
      });
      // Mark items as ordered, but keep them in cart
      dispatch({ type: "SET", payload: state.cartItems.map(item => ({ ...item, ordered: true })) });
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order.");
    }
  };

  const value = {
    cartItems: state.cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubtotal,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
