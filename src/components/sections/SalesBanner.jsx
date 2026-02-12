import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SalesBanner = () => {
    const navigate = useNavigate();

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                    alt="Technology Hardware"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-accent text-xs font-black tracking-[0.3em] uppercase block mb-6"
                        >
                            Datanet Store
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black mb-6 leading-tight"
                        >
                            Equip Your Business with <br />
                            <span className="text-gradient-gold">Enterprise Grade Hardware</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-off-white/60 text-lg font-light mb-8 max-w-lg"
                        >
                            From high-performance laptops to advanced security systems, browse our curated catalog of certified equipment.
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            onClick={() => navigate('/sales')}
                            className="btn-primary flex items-center gap-4 group"
                        >
                            <ShoppingBag size={20} />
                            Visit Store
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>

                    {/* Floating Product Cards Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative hidden md:block"
                    >
                        <div className="grid grid-cols-2 gap-4 w-[500px] -rotate-6 hover:rotate-0 transition-transform duration-700 ease-out">
                            <div className="space-y-4 pt-12">
                                <img src="/images/laptop_products.png" className="rounded-2xl border border-white/10 shadow-2xl" alt="Laptop" />
                                <img src="/images/cctv.png" className="rounded-2xl border border-white/10 shadow-2xl" alt="Server" />
                            </div>
                            <div className="space-y-4">
                                <img src="/images/cps.png" className="rounded-2xl border border-white/10 shadow-2xl" alt="Camera" />
                                <img src="/images/monitor.png" className="rounded-2xl border border-white/10 shadow-2xl" alt="Monitor" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SalesBanner;
