// src/components/AdminLayout.jsx
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
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
  People,
  ShoppingCart,
  Logout,
  Home as HomeIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";

import AdminHeader from "./AdminHeader";
import { useCounts } from "../hooks/useCounts"; // custom hook to fetch counts

const drawerWidth = 240;

export default function AdminLayout() {
  const { productCount, userCount, orderCount } = useCounts();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap>Biolife Admin Panel</Typography>
          <AdminHeader />
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#111827",
            color: "#fff",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>

            {/* Dashboard Home */}
            <ListItemButton component={Link} to="/admin">
              <ListItemIcon sx={{ color: "#fff" }}>
                <HomeIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>

            {/* Products */}
            <ListItemButton component={Link} to="/admin/products">
              <ListItemIcon sx={{ color: "#fff" }}>
                <Badge badgeContent={productCount} color="primary">
                  <Inventory sx={{ color: "#fff" }} />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>

            {/* Categories */}
            <ListItemButton component={Link} to="/admin/categories">
              <ListItemIcon sx={{ color: "#fff" }}>
                <CategoryIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>

            {/* Users */}
            <ListItemButton component={Link} to="/admin/users">
              <ListItemIcon sx={{ color: "#fff" }}>
                <Badge badgeContent={userCount} color="success">
                  <People sx={{ color: "#fff" }} />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>

            {/* Orders */}
            <ListItemButton component={Link} to="/admin/orders">
              <ListItemIcon sx={{ color: "#fff" }}>
                <Badge badgeContent={orderCount} color="error">
                  <ShoppingCart sx={{ color: "#fff" }} />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>

            {/* Logout */}
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <Logout sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {/* Default welcome card */}
        <Box
          sx={{
            mb: 4,
            p: 3,
            borderRadius: 2,
            background: "linear-gradient(to right, #8e2de2, #4a00e0)",
            color: "#fff",
          }}
        >
          <Typography variant="h5" gutterBottom>Welcome Admin!</Typography>
          <Typography>
            Manage products, categories, orders, and users of your Biolife store.
          </Typography>
        </Box>

        {/* Nested route content */}
        <Outlet />
      </Box>
    </Box>
  );
}
