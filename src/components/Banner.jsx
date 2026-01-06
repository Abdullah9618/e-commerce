import { Link } from "react-router-dom";
import bannerImg from "../assets/images/2.png";

function Banner() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl overflow-hidden shadow-xl">
          <div className="md:w-1/2 relative">
            <img
              src={bannerImg}
              alt="Subhan Arts Featured Collection"
              className="w-full h-72 md:h-80 object-cover"
            />
            <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-extrabold px-4 py-2 rounded-lg text-lg shadow-lg">
              New Arrivals
            </div>
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-4 text-white">
            <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
              Elevate Your Style
            </h2>
            <p className="text-lg md:text-xl drop-shadow-md">
              Discover the latest collection of premium quality clothing designed for the modern individual.
            </p>
            <p className="text-base md:text-lg drop-shadow-md">
              Shop now and experience comfort, style, and elegance in every piece.
            </p>
            <Link
              to="/products"
              className="inline-block mt-4 px-8 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg shadow-lg hover:bg-yellow-300 transition-all"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
