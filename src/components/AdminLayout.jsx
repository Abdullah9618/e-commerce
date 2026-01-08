import AdminHeader from "./AdminHeader";
import { useCounts } from "../hooks/useCounts";
// src/components/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Divider,
} from "@mui/material";
import {
  Inventory,
  ShoppingCart,
  Home as HomeIcon,
  Category as CategoryIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";


export default function AdminLayout() {
  const { productCount, orderCount } = useCounts();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/admin", icon: <HomeIcon /> },
    { label: "Products", to: "/admin/products", icon: <Inventory />, badge: productCount },
    { label: "Categories", to: "/admin/categories", icon: <CategoryIcon /> },
    { label: "Orders", to: "/admin/orders", icon: <ShoppingCart />, badge: orderCount },
  ];

  const drawer = (
    <Box sx={{ width: 220 }} role="presentation" onClick={() => setMobileOpen(false)}>
      <Typography variant="h6" sx={{ p: 2, fontWeight: 700 }}>Subhan Arts</Typography>
      <Divider />
      <List>
        {navLinks.map(({ label, to, icon, badge }) => (
          <ListItemButton component={Link} to={to} key={label}>
            <ListItemIcon>{icon}</ListItemIcon>
            {badge !== undefined ? (
              <Badge badgeContent={badge} color="error" max={99} sx={{ mr: 1 }}>
                <ListItemText primary={label} />
              </Badge>
            ) : (
              <ListItemText primary={label} />
            )}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      <CssBaseline />
      {/* Top Navigation Bar */}
      <AppBar position="fixed" sx={{ background: "linear-gradient(to right, #2563eb, #1e40af)" }}>
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
          {/* Hamburger for mobile */}
          <IconButton
            color="inherit"
            edge="start"
            sx={{ display: { xs: "inline-flex", md: "none" }, mr: 2 }}
            onClick={() => setMobileOpen(true)}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flex: 1 }}>Subhan Arts Admin Panel</Typography>
          {/* Desktop nav links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, flexWrap: "wrap" }}>
            {navLinks.map(({ label, to, badge }) => (
              <Link
                key={label}
                to={to}
                style={{ color: "#fff", textDecoration: "none", fontWeight: 500, padding: 8, display: "flex", alignItems: "center" }}
              >
                {badge !== undefined ? (
                  <Badge badgeContent={badge} color="error" max={99} sx={{ mr: 1 }}>{label}</Badge>
                ) : label}
              </Link>
            ))}
          </Box>
          <Box sx={{ ml: 2 }}><AdminHeader /></Box>
        </Toolbar>
      </AppBar>
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {drawer}
      </Drawer>
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
