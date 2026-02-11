import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Cpu, Globe } from 'lucide-react';
import Magnetic from '../utils/Magnetic';

const Hero = ({ onOpenQuote }) => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />

                {/* Animated Grid lines or subtle patterns */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '40px 40px' }}
                />
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block px-4 py-1.5 border border-accent/30 rounded-full text-accent text-xs font-bold tracking-[0.2em] uppercase mb-8">
                            Pioneering Digital Security
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
                            Integrated <span className="text-gradient-gold">IT & Security</span> Solutions.
                        </h1>
                        <p className="text-lg md:text-xl text-off-white/60 mb-12 max-w-2xl leading-relaxed font-light">
                            Datanet Global Limited delivers trusted computer sales, IT services, and
                            professional security systems tailored to modern organisations and households.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Magnetic strength={0.1}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-primary group"
                                    onClick={onOpenQuote}
                                >
                                    Request a Quote
                                    <ArrowRight className="inline-block ml-3 group-hover:translate-x-1 transition-transform" size={18} />
                                </motion.button>
                            </Magnetic>
                            <Magnetic strength={0.1}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-secondary"
                                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Explore Services
                                </motion.button>
                            </Magnetic>
                        </div>
                    </motion.div>
                </div>

                {/* Feature badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12"
                >
                    {[
                        { icon: <Shield size={20} />, text: "Certified Experts" },
                        { icon: <Cpu size={20} />, text: "Enterprise Grade" },
                        { icon: <Globe size={20} />, text: "Global Standards" },
                        { icon: <ArrowRight size={20} />, text: "24/7 Support" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 text-off-white/40 hover:text-accent transition-colors cursor-default">
                            <div className="text-accent">{item.icon}</div>
                            <span className="text-xs font-bold uppercase tracking-widest">{item.text}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
