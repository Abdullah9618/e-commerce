import React from "react";
import heroImg from "../assets/images/main-slide-01.jpg";
import {Link} from 'react-router-dom'
function Hero() {
  return (
    <section className="relative bg-green-50">
      <div className="relative mx-4 md:mx-6 rounded-lg overflow-hidden">
        <img
          src={heroImg}
          alt="Hero Banner"
          className="w-full h-[450px] md:h-[550px] object-cover object-center"
        />
        <div className="absolute top-1/2 right-6 md:right-12 transform -translate-y-1/2 md:w-1/2 p-4">
          <p className="uppercase text-sm mb-2 text-white">Fresh & Organic</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Healthy food, delivered to your door
          </h1>
          <p className="mb-4 text-white">
            Discover our selection of organic products picked from trusted farms.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 rounded text-white font-medium"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
