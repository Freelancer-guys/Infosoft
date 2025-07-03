import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../public/Info_logo.png';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', sectionId: 'home' },
    { name: 'About', sectionId: 'about' },
    { name: 'Services', sectionId: 'services' },
    { name: 'Contact', sectionId: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-sm ${
      isScrolled ? 'bg-white/90 backdrop-blur-md' : 'bg-transparent'
    }`} style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={logo} alt="Infosoft Logo" className="h-10 w-auto" />
            <span className="ml-2 text-2xl font-semibold text-gray-900">Infosoft Technologies</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.sectionId)}
                className="text-base font-medium text-gray-900 hover:text-teal-600"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => navigate('/payment')}
              className="bg-teal-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-teal-700 transition-all"
            >
              Get Started
            </button>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${isScrolled ? 'text-gray-800' : 'text-teal-700'}`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          ref={overlayRef}
          className="absolute top-0 left-0 w-full min-h-screen z-[100] flex flex-col items-center justify-center px-6 bg-gradient-to-br from-[#1d1d36cc] to-[#2d1e59cc] backdrop-blur-2xl"
        >
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-white">
            <X className="h-8 w-8" />
          </button>
          <img src={logo} alt="Infosoft Logo" className="h-16 mb-4" />
          <span className="text-2xl text-white mb-6 font-semibold">Infosoft Technologies</span>
          <nav className="flex flex-col items-center space-y-4 w-full">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.sectionId)}
                className="text-lg font-medium text-white hover:text-teal-300"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate('/payment');
              }}
              className="w-3/4 mt-6 bg-teal-500 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-teal-400"
            >
              Pay as You Go
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
