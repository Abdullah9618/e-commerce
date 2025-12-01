import React from "react";
import HeaderTop from "../components/HeaderTop";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import ProductGrid from "../components/ProductGrid";
import Contact from "../components/Contact";


function Home() {
  return (
    <div className="bg-green-50">
      <HeaderTop/>
      <Navbar/>
      <Hero />
      <Banner />
      <ProductGrid />
      <Contact />
    </div>
  );
}

export default Home;
