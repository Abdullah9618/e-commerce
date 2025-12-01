import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaTemperatureHigh, FaClock } from "react-icons/fa";

const AdminHeader = () => {
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState({ city: "", country: "" });

  const apiKey = "3045cb2d0b5cf94d1d3f4cad30bb3409";

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Get location via IP and fetch weather
  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      try {
        // Use free IP-based API
        const locRes = await axios.get("http://ip-api.com/json");
        const { city, country, lat, lon } = locRes.data;
        setLocation({ city, country });

        // Fetch weather
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        setWeather(weatherRes.data);
      } catch (err) {
        console.error("Error fetching location/weather:", err);
      }
    };

    fetchLocationAndWeather();
  }, []);

  return (
    <div className="flex justify-end items-center gap-6 bg-gray-800 text-white px-6 py-3 rounded-xl shadow mb-6">
      {location.city && location.country && (
        <div className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-red-500" />
          <span>{location.city}, {location.country}</span>
        </div>
      )}

      {weather && (
        <div className="flex items-center gap-1">
          <FaTemperatureHigh className="text-yellow-400" />
          <span>{Math.round(weather.main.temp)}°C, {weather.weather[0].main}</span>
        </div>
      )}

      <div className="flex items-center gap-1">
        <FaClock className="text-blue-400" />
        <span>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
    </div>
  );
};

export default AdminHeader;
