// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  if (!isAdminLoggedIn) return <Navigate to="/admin-login" />;
  return children;
};

export default AdminRoute;
