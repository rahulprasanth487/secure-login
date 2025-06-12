import React from "react";
import { FaUniversity, FaHome, FaCreditCard } from "react-icons/fa";

const services = [
  { icon: <FaUniversity size={24} />, title: "Bank Accounts", desc: "Everyday banking for every lifestyle." },
  { icon: <FaHome size={24} />, title: "Home Loans", desc: "Finance or refinance your dream home." },
  { icon: <FaCreditCard size={24} />, title: "Credit Cards", desc: "Flexible options that fit your needs." },
];

export default function CardsSection() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        {services.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-[#b40000] mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
