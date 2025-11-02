import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaGlobe, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-orange from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 border-t mt-12 text-gray-700 dark:text-gray-300">
      
      {/* Inner container (centers content) */}
      <div className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* 🌍 Brand Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">TripMind AI</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400 max-w-sm">
            Turning your travel dreams into smart itineraries.  
            Discover, plan, and explore the world — intelligently. 🌍
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div className="flex flex-col items-center text-center md:items-start">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#destinations" className="hover:text-blue-500 transition">Top Destinations</a></li>
            <li><a href="#planner" className="hover:text-blue-500 transition">Trip Planner</a></li>
            <li><a href="#hotels" className="hover:text-blue-500 transition">Hotels</a></li>
            <li><a href="#about" className="hover:text-blue-500 transition">About Us</a></li>
          </ul>
        </div>

        {/* 💬 Social + Contact */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Connect With Us</h3>
          <div className="flex gap-4 justify-center md:justify-end mb-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF className="hover:text-blue-600 transition text-lg" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-500 transition text-lg" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="hover:text-sky-400 transition text-lg" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub className="hover:text-gray-800 dark:hover:text-white transition text-lg" />
            </a>
          </div>
          <p className="text-xs">
            🌐 <a href="https://tripmind.ai" className="hover:text-blue-500 transition">tripmind.ai</a>
          </p>
        </div>
      </div>

      {/* 🧡 Bottom Line */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Made with ❤️ by <span className="font-medium text-blue-600 dark:text-blue-400">TripMind AI</span> — Explore the world, intelligently.
      </div>
    </footer>
  );
}

export default Footer;
