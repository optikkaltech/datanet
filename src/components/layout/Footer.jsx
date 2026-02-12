import React from 'react';
import { Instagram, Facebook, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="py-20 px-6 border-t border-white/5 bg-primary">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-20">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10">
                                <img
                                    src="/images/logo.jpeg"
                                    alt="Datanet Global Logo"
                                    className="w-full h-full object-contain rounded-full border border-accent/20"
                                />
                            </div>
                            <span className="text-lg font-black tracking-tighter uppercase">Datanet<span className="text-accent">Global</span></span>
                        </div>
                        <p className="text-off-white/40 max-w-xs text-sm font-light">
                            Building the future of secure, reliable IT infrastructure for a connected world.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-12 text-sm uppercase tracking-widest font-bold">
                        <a href="#about" className="hover:text-accent transition-colors">About</a>
                        <a href="#services" className="hover:text-accent transition-colors">Services</a>
                        <a href="#work" className="hover:text-accent transition-colors">Portfoilo</a>
                        <a href="#contact" className="hover:text-accent transition-colors">Support</a>
                    </div>

                    <div className="flex gap-6">
                        <a href="https://www.facebook.com/share/1BYZC5MoR2/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="p-3 bg-graphite rounded-full hover:bg-accent hover:text-primary transition-all duration-300"><Facebook size={18} /></a>
                        <a href="https://www.instagram.com/oke.jeremiah.71?igsh=N2Jvbm1zaDVpZmk1" target="_blank" rel="noreferrer" className="p-3 bg-graphite rounded-full hover:bg-accent hover:text-primary transition-all duration-300"><Instagram size={18} /></a>
                        <a href="https://wa.me/447586352447" target="_blank" rel="noreferrer" className="p-3 bg-graphite rounded-full hover:bg-accent hover:text-primary transition-all duration-300"><Phone size={18} /></a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between pt-12 border-t border-white/5 text-[10px] uppercase tracking-[0.3em] font-medium text-off-white/20">
                    <p>© since 2009 to {new Date().getFullYear()} Datanet Global Limited. All Rights Reserved.</p>
                    <div className="flex gap-8 mt-6 md:mt-0">
                        <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
