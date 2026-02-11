import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Magnetic from '../utils/Magnetic';

const Navbar = ({ onGetStarted }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Work', href: '#work' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? 'py-4 bg-primary/80 backdrop-blur-md border-b border-white/5' : 'py-8 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="group cursor-pointer"
                >
                    <Magnetic strength={0.2}>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 relative">
                                <img
                                    src="/images/logo.jpeg"
                                    alt="Datanet Global Logo"
                                    className="w-full h-full object-contain rounded-full border border-accent/20"
                                />
                            </div>
                            <span className="text-xl font-black tracking-tighter uppercase hidden sm:block">Datanet<span className="text-accent">Global</span></span>
                        </div>
                    </Magnetic>
                </motion.div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-12">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-sm font-medium tracking-widest uppercase hover:text-accent transition-colors"
                        >
                            {link.name}
                        </motion.a>
                    ))}
                    <Magnetic strength={0.2}>
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="px-6 py-2 border border-accent text-accent text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-all duration-300"
                            onClick={onGetStarted}
                        >
                            Get Started
                        </motion.button>
                    </Magnetic>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="text-accent" /> : <Menu className="text-accent" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-graphite border-b border-white/5"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium tracking-widest uppercase"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
