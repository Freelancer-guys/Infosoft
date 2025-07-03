// App.tsx (with React Router support)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PaymentGateway from './components/PaymentGateway';

const Home = () => (
  <>
    <Hero />
    <About />
    <Services />
    <Contact />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payment" element={<PaymentGateway onClose={() => window.history.back()} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;