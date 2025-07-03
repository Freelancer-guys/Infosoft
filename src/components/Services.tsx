import React from 'react';
import { Code, Cloud, Shield, Database, Headphones, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Services: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.15);

  const services = [
    {
      icon: Cloud,
      title: 'Cloud Computing',
      description: 'Strategic cloud adoption and management to help your business scale securely and cost-effectively.',
      features: ['Strategy & Migration', 'Management & Security', 'Cost Optimization']
    },
    {
      icon: Database,
      title: 'Data Management',
      description: 'Robust data infrastructure and analytics that turn data into business value.',
      features: ['Database & Warehousing', 'Big Data & Analytics', 'Data Governance']
    },
    {
      icon: Headphones,
      title: 'IT Support & Services',
      description: 'Reliable 24/7 technical support and proactive infrastructure management to keep you running smoothly.',
      features: ['24/7 Technical Support', 'Infrastructure Monitoring', 'Cybersecurity']
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={elementRef}
          className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : ''}`}
        >
          <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="h-4 w-4 mr-2" />
            Our Services
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Expert IT Services for
            <span className="text-emerald-600"> Business Growth</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From cloud solutions to data management and ongoing IT support, we provide tailored services that drive innovation and efficiency.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-2 ${
                isVisible ? `animate-slide-up animate-stagger-${index + 1}` : ''
              }`}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="h-8 w-8" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        
      </div>
    </section>
  );
};

export default Services;
