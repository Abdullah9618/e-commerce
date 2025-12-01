// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// User pages
import Home from "./pages/Home";
import ProductGrid from "./components/ProductGrid";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import AddProduct from "./pages/admin/AddProduct";
import AdminProductList from "./pages/admin/AdminProductList";
import EditProduct from "./pages/admin/EditProduct";
import Categories from "./pages/admin/Categories"; // New categories page

// Admin Layout
import AdminLayout from "./components/AdminLayout";

import { useAuth } from "./context/AuthContext";

// Layout wrapper: shows user header/navbar only on non-admin pages
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  return <>{children}</>;
};

// User protected route
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
};

// Admin protected route
const ProtectedAdmin = ({ children }) => {
  const isAdmin = localStorage.getItem("adminLoggedIn") === "true";
  if (!isAdmin) return <Navigate to="/admin-login" />;
  return children;
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductGrid />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Admin Layout with nested routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedAdmin>
                <AdminLayout />
              </ProtectedAdmin>
            }
          >
            {/* Default dashboard shows welcome message */}
            <Route index element={<></>} />

            {/* Product CRUD */}
            <Route path="products" element={<AdminProductList />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="add-product" element={<AddProduct />} /> 

            {/* Categories CRUD */}
            <Route path="categories" element={<Categories />} />

            {/* Users and Orders */}
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <h1 className="text-3xl font-bold text-gray-700">
                  404 - Page Not Found
                </h1>
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
