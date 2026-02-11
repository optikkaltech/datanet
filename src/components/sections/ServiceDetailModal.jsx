import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import Magnetic from '../utils/Magnetic';

const ServiceDetailModal = ({ isOpen, onClose, service }) => {
    if (!service) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-primary/95 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="relative w-full max-w-3xl bg-graphite border border-white/10 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/5 shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="p-2 md:p-3 bg-primary rounded-lg md:rounded-xl border border-white/5 text-accent shrink-0">
                                    {React.cloneElement(service.icon, { size: 24 })}
                                </div>
                                <h2 className="text-xl md:text-2xl font-black tracking-tight line-clamp-1">{service.title}</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-off-white/40 hover:text-white shrink-0">
                                <X size={20} md={24} />
                            </button>
                        </div>

                        <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
                            <p className="text-lg md:text-xl text-off-white/60 mb-8 md:mb-12 font-light leading-relaxed">
                                {service.longDescription || service.description}
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
                                {service.features?.map((feature, idx) => (
                                    <div key={idx} className="flex gap-4 group">
                                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-1">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-off-white mb-1 leading-tight">{feature.title}</h4>
                                            <p className="text-xs md:text-sm text-off-white/40 leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-primary/50 p-6 md:p-8 rounded-2xl border border-white/5">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="text-center md:text-left">
                                        <h4 className="font-bold mb-1">Ready to implement this solution?</h4>
                                        <p className="text-xs md:text-sm text-off-white/40">Our experts are standing by to assist with your infrastructure.</p>
                                    </div>
                                    <Magnetic strength={0.1}>
                                        <button
                                            onClick={() => {
                                                onClose();
                                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="w-full md:w-auto px-8 py-4 bg-accent text-primary font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-lg hover:bg-accent-light transition-colors"
                                        >
                                            Get Started
                                        </button>
                                    </Magnetic>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ServiceDetailModal;
