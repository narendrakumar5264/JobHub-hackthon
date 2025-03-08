import React from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter, FaPhone, FaEnvelope } from "react-icons/fa";

export default function About() {
  return (
    <div className="py-16 px-6 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white text-center py-16 rounded-2xl shadow-lg mb-12">
        <h1 className="text-5xl font-extrabold mb-4 animate-fade-in">
          About <span className="text-yellow-300">JobHub</span>
        </h1>
        <p className="text-xl font-medium animate-fade-in-delayed">
          Empowering Careers, One Job at a Time 🚀
        </p>
      </div>

      {/* About Description */}
      <div className="text-gray-700 space-y-6 text-lg mb-14">
        <p>
          <span className="font-semibold text-blue-600">JobHub</span> is a fully functional, full-stack job-finding platform designed to connect talented individuals with the best job opportunities. Our mission is to make job searching seamless, efficient, and rewarding.
        </p>
        <p>
          We utilize cutting-edge technologies like <span className="font-semibold text-blue-600">React, Tailwind CSS, Node.js, Express.js, and MongoDB</span> to create a smooth and user-friendly experience. From crafting visually engaging interfaces to building secure and scalable back-end architectures, we ensure that JobHub is optimized for performance.
        </p>
        <p>
          Whether you're looking for full-time jobs, internships, or freelance gigs, <span className="font-semibold text-blue-600">JobHub</span> simplifies the process and connects you with the right opportunities.
        </p>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-3xl font-semibold text-slate-800 mb-6 text-center">
          Get in Touch
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center text-lg">
          {/* Phone Contact */}
          <a
            href="tel:9875709813"
            className="flex items-center space-x-4 p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-blue-50 w-full max-w-xs"
          >
            <FaPhone className="text-blue-600 text-3xl" />
            <span className="text-slate-800 font-medium">+91 9875709813</span>
          </a>
          {/* Email Contact */}
          <a
            href="mailto:jangidnarendra858@gmail.com"
            className="flex items-center space-x-4 p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-blue-50 w-full max-w-xs"
          >
            <FaEnvelope className="text-blue-600 text-3xl" />
            <span className="text-slate-800 font-medium">jangidnarendra858@gmail.com</span>
          </a>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-slate-800 mb-4">Connect with Us</h2>
        <div className="flex justify-center space-x-6 text-blue-600">
          <a href="https://www.instagram.com/narendrajangid2022/" target="_blank" rel="noopener noreferrer" className="text-4xl hover:text-blue-800 transition-all duration-300">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/in/narendra-kumar-9b2223257/" target="_blank" rel="noopener noreferrer" className="text-4xl hover:text-blue-800 transition-all duration-300">
            <FaLinkedin />
          </a>
          <a href="https://github.com/narendrakumar5264" target="_blank" rel="noopener noreferrer" className="text-4xl hover:text-blue-800 transition-all duration-300">
            <FaGithub />
          </a>
          <a href="https://x.com/JangifNarendra" target="_blank" rel="noopener noreferrer" className="text-4xl hover:text-blue-800 transition-all duration-300">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-slate-600 mt-16">
        <h3 className="hover:text-blue-800 font-semibold text-lg">Contact Us for Any Queries</h3>
      </footer>
    </div>
  );
}
