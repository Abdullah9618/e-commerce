import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon, Badge, Button
} from "@mui/material";
import { AddBox, Inventory, People, ShoppingCart, LocationOn, AccessTime, Thermostat } from "@mui/icons-material";

import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const drawerWidth = 240;

export default function AdminDashboard() {
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState({ city: "", country: "" });

  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  const apiKey = "3045cb2d0b5cf94d1d3f4cad30bb3409";

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locRes = await axios.get("http://ip-api.com/json");
        const { city, country, lat, lon } = locRes.data;
        setLocation({ city, country });

        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        setWeather(weatherRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const prodSnap = await getDocs(collection(db, "products"));
        setProductCount(prodSnap.size);

        const userSnap = await getDocs(collection(db, "users"));
        setUserCount(userSnap.size);

        const orderSnap = await getDocs(collection(db, "orders"));
        setOrderCount(orderSnap.size);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCounts();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap>Biolife Admin Panel</Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {location.city && <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}><LocationOn /><Typography variant="body2">{location.city}, {location.country}</Typography></Box>}
            {weather && <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}><Thermostat /><Typography variant="body2">{Math.round(weather.main.temp)}°C, {weather.weather[0].main}</Typography></Box>}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}><AccessTime /><Typography variant="body2">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Typography></Box>
            <Button component={Link} to="/admin-login" variant="contained" color="error" size="small">Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box", backgroundColor: "#111827", color: "#fff" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {/* <ListItem button component={Link} to="/admin/add-product">
              <ListItemIcon sx={{ color: "#fff" }}><AddBox /></ListItemIcon>
               <ListItemText primary="Add Product" /> 
            </ListItem> */}

            <ListItem button component={Link} to="/admin/products">
              <ListItemIcon sx={{ color: "#fff" }}>
                <Badge badgeContent={productCount} color="primary"><Inventory sx={{ color: "#fff" }} /></Badge>
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>

            <ListItem button component={Link} to="/admin/users">
              <ListItemIcon sx={{ color: "#fff" }}>
                <Badge badgeContent={userCount} color="success"><People sx={{ color: "#fff" }} /></Badge>
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>

            <ListItem button component={Link} to="/admin/orders">
              <ListItemIcon sx={{ color: "#fff" }}>
                <Badge badgeContent={orderCount} color="error"><ShoppingCart sx={{ color: "#fff" }} /></Badge>
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box sx={{ mb: 4, p: 3, borderRadius: 2, background: "linear-gradient(to right, #8e2de2, #4a00e0)", color: "#fff" }}>
          <Typography variant="h5" gutterBottom>Welcome Admin!</Typography>
          <Typography>Manage products, orders, and users of your Biolife store.</Typography>
        </Box>
      </Box>
    </Box>
  );
}
