import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="section-padding relative overflow-hidden">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    {/* Image/Visual side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] bg-graphite rounded-3xl overflow-hidden border border-white/5 relative group">
                            {/* Replace with actual image later or use a stylized placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent/20 transition-transform duration-700 group-hover:scale-110" />
                            <img
                                src="/images/about_hero.png"
                                alt="Datanet Global Technology Center"
                                className="w-full h-full object-cover mix-blend-overlay opacity-60 transition-opacity duration-700 group-hover:opacity-80"
                            />
                            <div className="absolute inset-0 p-12 flex flex-col justify-end">
                                <span className="text-accent font-black text-9xl opacity-10 absolute top-10 right-10">01</span>
                                <h3 className="text-3xl font-bold mb-4">Innovation First.</h3>
                                <p className="text-off-white/60">We don't just solve problems; we engineer growth through technology.</p>
                            </div>
                        </div>
                        {/* Decals */}
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 blur-3xl rounded-full" />
                    </motion.div>

                    {/* Text side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-accent text-xs font-black tracking-[0.3em] uppercase mb-6 block">Our Legacy</span>
                        <h2 className="text-4xl md:text-5xl font-black mb-10 leading-tight">
                            A Forward-Thinking <br />
                            <span className="text-gradient-gold">Technology Partner.</span>
                        </h2>
                        <div className="space-y-8 text-lg text-off-white/70 font-light leading-relaxed">
                            <p>
                                Datanet Global Limited is committed to helping organizations build reliable,
                                secure, and scalable digital environments. We specialize in delivering
                                comprehensive technology services that meet the evolving needs of modern businesses.
                            </p>
                            <p>
                                Driven by innovation and a customer-centric approach, we partner with clients
                                across various sectors to enhance operational efficiency, strengthen data security,
                                and enable sustainable digital transformation.
                            </p>
                        </div>

                        <div className="mt-16 grid grid-cols-2 gap-12 border-t border-white/5 pt-12">
                            <div>
                                <h4 className="text-accent text-xs font-black uppercase tracking-widest mb-4">Our Mission</h4>
                                <p className="text-sm text-off-white/50 leading-relaxed">
                                    To provide dependable technology solutions that empower organisations through secure, innovative, and scalable systems.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-accent text-xs font-black uppercase tracking-widest mb-4">Our Vision</h4>
                                <p className="text-sm text-off-white/50 leading-relaxed">
                                    To be a trusted global technology partner delivering smart infrastructure and reliable IT solutions.
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-12">
                            <div>
                                <h4 className="text-accent text-3xl font-bold mb-2">99%</h4>
                                <p className="text-xs uppercase tracking-widest text-off-white/40">Reliability Rate</p>
                            </div>
                            <div>
                                <h4 className="text-accent text-3xl font-bold mb-2">24/7</h4>
                                <p className="text-xs uppercase tracking-widest text-off-white/40">Technical Support</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
