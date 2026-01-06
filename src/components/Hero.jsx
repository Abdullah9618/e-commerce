import { Link } from "react-router-dom";
import heroImg from "../assets/images/main-slide-01.jpg";

function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="uppercase text-sm font-semibold text-blue-600 mb-3">
              Welcome to Subhan Arts
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Premium Clothing Collection
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Discover our curated selection of high-quality clothing pieces designed for style, comfort, and confidence.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors duration-200"
            >
              Explore Collections
            </Link>
          </div>
          <div className="hidden md:block">
            <img
              src={heroImg}
              alt="Subhan Arts Collection"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
