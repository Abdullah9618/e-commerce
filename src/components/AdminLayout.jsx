// src/components/AdminLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@mui/material";
import {
  Inventory,
  ShoppingCart,
  Home as HomeIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";

import AdminHeader from "./AdminHeader";





export default function AdminLayout() {
  // ...existing code...
  return (
    <Box>
      <CssBaseline />
      {/* Top Navigation Bar */}
      <AppBar position="fixed" sx={{ background: "linear-gradient(to right, #2563eb, #1e40af)" }}>
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
          <Typography variant="h6" noWrap sx={{ flex: 1 }}>Subhan Arts Admin Panel</Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Link to="/admin" style={{ color: "#fff", textDecoration: "none", fontWeight: 500, padding: 8 }}>Home</Link>
            <Link to="/admin/products" style={{ color: "#fff", textDecoration: "none", fontWeight: 500, padding: 8 }}>Products</Link>
            <Link to="/admin/categories" style={{ color: "#fff", textDecoration: "none", fontWeight: 500, padding: 8 }}>Categories</Link>
            <Link to="/admin/orders" style={{ color: "#fff", textDecoration: "none", fontWeight: 500, padding: 8 }}>Orders</Link>
          </Box>
          <Box sx={{ ml: 2 }}><AdminHeader /></Box>
        </Toolbar>
      </AppBar>
      {/* Main Content */}
      <Box component="main" sx={{ pt: 10, px: { xs: 1, sm: 2, md: 3 } }}>
        {/* Default welcome card */}
        <Box
          sx={{
            mb: 4,
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            background: "linear-gradient(to right, #2563eb, #1e40af)",
            color: "#fff",
            fontSize: { xs: 16, sm: 18 },
          }}
        >
          <Typography variant="h5" gutterBottom>Welcome Admin!</Typography>
          <Typography>
            Manage products, categories, and orders of your Subhan Arts store.
          </Typography>
        </Box>
        {/* Nested route content */}
        <Outlet />
      </Box>
    </Box>
  );
}
