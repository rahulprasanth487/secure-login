import React from "react";

export default function Dashboard_Header({name}) {
  return (
    <header className="bg-[#b40000] text-white shadow">
      <div className=" px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bold text-xl">Wells Fargo</span>
        </div>
        <nav className="hidden md:flex gap-6 text-md flex items-center">
          <a href="#" className="hover:underline">Welcome <b>{name}</b> !!</a>
        <button onClick={() => window.location.href = '/'} className="hover:bg-red-100 hover:text-black bg-red-600 px-3 py-1">Logout</button>
        </nav>
        <button className="md:hidden">☰</button>
      </div>
    </header>
  );
}
