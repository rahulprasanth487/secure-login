import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Investors</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Banking</h4>
          <ul>
            <li><a href="#" className="hover:underline">Accounts</a></li>
            <li><a href="#" className="hover:underline">Loans</a></li>
            <li><a href="#" className="hover:underline">Credit Cards</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul>
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul>
            <li><a href="#" className="hover:underline">Privacy</a></li>
            <li><a href="#" className="hover:underline">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs mt-6 text-gray-400">&copy; 2025 Wells Fargo Clone. All rights reserved.</div>
    </footer>
  );
}
