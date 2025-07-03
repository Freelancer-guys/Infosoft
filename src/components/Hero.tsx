import React from 'react';
import { motion } from 'framer-motion';
import { Play, Cloud, Cpu, ShieldCheck, Database } from 'lucide-react';

// Responsive icon positions: Better centered on large screens
const floatingIcons = [
  {
    icon: Cloud,
    style:
      'top-16 left-6 sm:top-32 sm:left-[10%] animate-float-slow',
  },
  {
    icon: Cpu,
    style:
      'top-10 right-6 sm:top-48 sm:right-[12%] animate-float-medium',
  },
  {
    icon: ShieldCheck,
    style:
      'bottom-20 left-8 sm:bottom-[20%] sm:left-[20%] animate-float-medium',
  },
  {
    icon: Database,
    style:
      'bottom-32 right-8 sm:bottom-[20%] sm:right-[18%] animate-float-slow',
  },
];

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-white to-green-50"
    >
      {/* Background Blobs */}
      <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0" />

      {/* Floating Icons */}
      {floatingIcons.map((item, i) => (
        <div
          key={i}
          className={`absolute text-teal-500 opacity-80 drop-shadow-md ${item.style}`}
        >
          <item.icon className="w-10 h-10" />
        </div>
      ))}

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-24 sm:pb-28"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.2]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Empowering Businesses with
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 pt-3 pb-3">
            Tailored Technology Solutions
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          At Infosoft Technologies, we empower businesses with cutting-edge technology—from cloud computing and custom software to robust data management and 24/7 IT support. Let us help you innovate, grow, and operate efficiently through tailored, expert solutions.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={() => {
              const contact = document.getElementById('contact');
              if (contact) {
                contact.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Start Your Journey
          </button>


          <button className="flex items-center text-teal-700 hover:text-emerald-600 font-medium">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-3 shadow-inner">
              <Play className="w-6 h-6" />
            </div>
            Watch Our Story
          </button>
        </motion.div>
      </motion.div>

      {/* Wave Transition */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-full h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 80"
        >
          <path d="M1200 0L0 0 892.25 80 1200 0z" fill="#f9fafb" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
