import React from 'react';
import { motion } from 'framer-motion';

const projects = [
    {
        title: "Global Enterprise Connectivity",
        category: "Network Solutions",
        image: "/images/network_project.png"
    },
    {
        title: "Elite Surveillance Hub",
        category: "Security & CCTV",
        image: "/images/security_project.png"
    },
    {
        title: "Cloud Infrastructure 2.0",
        category: "Managed Services",
        image: "/images/cloud_project.png"
    }
];

const Portfolio = () => {
    return (
        <section id="work" className="section-padding overflow-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col items-center text-center mb-24">
                    <span className="text-accent text-xs font-black tracking-[0.3em] uppercase mb-6 block">Our Case Studies</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                        Proof of <span className="text-gradient-gold">Excellence.</span>
                    </h2>
                    <div className="w-24 h-1 bg-accent/20" />
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Main Large Project */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 group cursor-pointer"
                    >
                        <div className="relative aspect-[16/9] bg-graphite overflow-hidden rounded-3xl border border-white/5">
                            <img
                                src={projects[0].image}
                                alt={projects[0].title}
                                className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700"
                            />
                            <div className="absolute inset-0 p-12 flex flex-col justify-end">
                                <span className="text-accent font-bold tracking-widest text-xs uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    {projects[0].category}
                                </span>
                                <h3 className="text-4xl md:text-6xl font-black opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    {projects[0].title}
                                </h3>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sibling Projects */}
                    <div className="lg:col-span-4 flex flex-col gap-12">
                        {projects.slice(1).map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[4/3] bg-graphite overflow-hidden rounded-3xl border border-white/5">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <span className="text-accent font-bold tracking-widest text-xs uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            {project.category}
                                        </span>
                                        <h3 className="text-2xl font-black opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            {project.title}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
