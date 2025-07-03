import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, BadgeCheck } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import emailjs from 'emailjs-com';
import Dialog from './Dialog';

const Contact: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.2);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: ''
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const handleEmailSend = () => {
   emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: formData.name,
        email: formData.email,
        company: formData.company || 'N/A',
        service: formData.service,
        message: formData.message,
        time: new Date().toLocaleString('en-AU', {
          timeZone: 'Australia/Melbourne',
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )

    .then(() => {
      alert('Email sent!');
      setIsDialogOpen(false);
    }).catch(() => {
      alert('Email sending failed.');
    });
  };

  const handleWhatsAppSend = () => {
    const msg = `Hi, I'm ${formData.name} (${formData.email}) from ${formData.company || 'N/A'}.\nService Interested In: ${formData.service}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=61411851765&text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    setIsDialogOpen(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      info: 'Infosofttech.info@gmail.com',
      subInfo: 'We typically respond within 1 business day.'
    },
    {
      icon: Phone,
      title: 'Call Us',
      info: '+61411851765',
      subInfo: 'Available Mon–Fri, 9AM to 6PM AEST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      info: 'Melbourne VIC, Australia',
      subInfo: 'Let’s meet over coffee or Zoom.'
    },
    {
      icon: BadgeCheck,
      title: 'ABN',
      info: '92 683 984 975',
      subInfo: 'Infosoft Tech PTY LTD'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={elementRef}
          className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : ''}`}
        >
          <div className="inline-flex items-center bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageCircle className="h-4 w-4 mr-2" />
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Contact <span className="text-blue-400">Infosoft Technologies</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Reach out to discuss how we can help your business thrive with tailored technology solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`${isVisible ? 'animate-slide-in-left' : ''}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  placeholder="Full Name *"
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  placeholder="Email Address *"
                />
              </div>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Company Name"
              />
             <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                required
              >
                <option value="" disabled hidden>
                  Select Service Type
                </option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Data Management">Data Management</option>
                <option value="IT Support & Services">IT Support & Services</option>
                <option value="Others">Others</option>
              </select>

              <textarea
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white resize-none"
                placeholder="Tell us about your project, goals, and timeline..."
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold"
              >
                <Send className="h-5 w-5 inline-block mr-2" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className={`${isVisible ? 'animate-slide-in-right' : ''}`}>
            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-gray-800 rounded-xl">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-blue-400">{item.info}</p>
                    <p className="text-gray-400 text-sm">{item.subInfo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Popup */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onEmailClick={handleEmailSend}
        onWhatsAppClick={handleWhatsAppSend}
      />
    </section>
  );
};

export default Contact;
