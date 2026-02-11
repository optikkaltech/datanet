import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Values from './components/sections/Values';
import Industries from './components/sections/Industries';
import Portfolio from './components/sections/Portfolio';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import QuoteModal from './components/sections/QuoteModal';
import AdminDashboard from './pages/AdminDashboard';
import LegalPrivacy from './pages/LegalPrivacy';
import LegalTerms from './pages/LegalTerms';
import SEO from './components/utils/SEO';
import Preloader from './components/utils/Preloader';
import { motion, useScroll, useSpring } from 'framer-motion';

const MainLayout = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative bg-primary overflow-x-hidden">
      <Preloader />
      <SEO
        title="Home"
        description="Datanet Global Limited delivers professional IT infrastructure, networking, and advanced security systems in the UK. Certified experts in Cisco and surveillance integration."
      />
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Background Noise/Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-noise"></div>

      <Navbar onGetStarted={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />

      <main>
        <Hero onOpenQuote={() => setIsQuoteModalOpen(true)} />
        <About />
        <Services />
        <Values />
        <Industries />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/privacy" element={<LegalPrivacy />} />
        <Route path="/terms" element={<LegalTerms />} />
      </Routes>
    </Router>
  );
}

export default App;
