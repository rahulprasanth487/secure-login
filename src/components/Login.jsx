import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import CardsSection from "./CardSection";
import Footer from "./Footer";

export default function Login() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />
      <HeroSection />
      <CardsSection />
      <Footer />
    </div>
  );
}