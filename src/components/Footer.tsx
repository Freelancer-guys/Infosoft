import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand */}
          <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">
            Infosoft Tech PTY LTD
          </h2>

          {/* Quick Links */}
          <ul className="flex space-x-6 text-sm text-gray-500">
            <li><a href="#home" className="hover:text-gray-900">Home</a></li>
            <li><a href="#about" className="hover:text-gray-900">About</a></li>
            <li><a href="#services" className="hover:text-gray-900">Services</a></li>
            <li><a href="#contact" className="hover:text-gray-900">Contact</a></li>
            <li><a href="/payment" className="hover:text-gray-900">Get Started</a></li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Infosoft Tech PTY LTD. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
