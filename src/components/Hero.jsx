import { Link } from "react-router-dom";
import heroImg from "../assets/images/hi5.jpg";

function Hero() {
  return (
    <section className="relative py-8">
      {/* Full-width image with small side padding */}
      <div className="px-3">
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={heroImg}
            alt="Subhan Arts Collection"
            className="w-full max-w-none h-[520px] object-cover block"
          />

          {/* Text overlay (no opacity on image) */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 px-10">
                      <h1 className="text-4xl text-5xl md:text-6xl lg:text-7xl font-extrabold font-serif text-white drop-shadow-lg">
                       Your Premium Clothing Partner
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
