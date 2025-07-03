import React from 'react';
import { Target, Users, Award, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.2);

  const stats = [
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Award, value: '50+', label: 'Awards Won' },
    { icon: TrendingUp, value: '99%', label: 'Success Rate' },
    { icon: Target, value: '10+', label: 'Years Experience' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div 
            ref={elementRef}
            className={`${isVisible ? 'animate-slide-in-left' : ''}`}
          >
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="h-4 w-4 mr-2" />
              About Infosoft Technologies
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering Your Business with
              <span className="text-blue-600"> Technology That Delivers</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Infosoft Technologies is committed to driving digital transformation by offering scalable, secure, and smart technology solutions. From cloud to data management and IT support, we help businesses unlock growth, efficiency, and innovation.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-gray-600 text-sm">To enable innovation through tailored technology that simplifies operations and drives results.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-gray-900 mb-2">Our Vision</h3>
                <p className="text-gray-600 text-sm">To be a trusted partner for organizations navigating the evolving digital landscape.</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={`${isVisible ? 'animate-slide-in-right' : ''}`}>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:scale-105 ${
                    isVisible ? `animate-slide-up animate-stagger-${index + 1}` : ''
                  }`}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
