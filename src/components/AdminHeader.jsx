import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { LocationOn, AccessTime, Thermostat } from "@mui/icons-material";

const apiKey = "3045cb2d0b5cf94d1d3f4cad30bb3409";

export default function AdminHeader() {
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState({ city: "", country: "" });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
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

    fetchLocationAndWeather();
  }, []);

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      {location.city && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <LocationOn />
          <Typography variant="body2">{location.city}, {location.country}</Typography>
        </Box>
      )}
      {weather && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Thermostat />
          <Typography variant="body2">{Math.round(weather.main.temp)}°C, {weather.weather[0].main}</Typography>
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <AccessTime />
        <Typography variant="body2">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Typography>
      </Box>
    </Box>
  );
}
