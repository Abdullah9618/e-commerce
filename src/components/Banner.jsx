import React from "react";
import lemonImg from "../assets/images/p-07.jpg";
import {Link} from 'react-router-dom'
function Banner() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-green-400 to-green-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="md:w-1/2 relative">
            <img src={lemonImg} alt="Lemon Product" className="w-full h-72 md:h-full object-cover" />
            <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-extrabold px-4 py-2 rounded-lg text-lg">
              50% OFF!
            </div>
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-4 text-white">
            <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">Juicy Fresh Organic Lemons</h2>
            <p className="text-lg md:text-xl drop-shadow-md">
              Grab your fresh lemons at half price! Perfect for juices, desserts, and healthy snacks.
            </p>
            <p className="text-base md:text-lg drop-shadow-md">
              Limited time offer! Don’t miss out on this fresh and zesty deal.
            </p>
            <Link
              to="/products"
              className="inline-block mt-4 px-8 py-3 bg-yellow-400 text-green-900 font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition-all"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
