import React from "react";

export default function Header() {
  return (
    <header className="bg-[#b40000] text-white shadow">
      <div className=" px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bold text-xl">Wells Fargo</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#" className="hover:underline">Personal</a>
          <a href="#" className="hover:underline">Small Business</a>
          <a href="#" className="hover:underline">Commercial</a>
          <a href="#" className="hover:underline">About Us</a>
        </nav>
        <button className="md:hidden">☰</button>
      </div>
    </header>
  );
}
