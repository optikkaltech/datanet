import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, ShieldCheck, Headphones, Settings, ArrowUpRight } from 'lucide-react';
import ServiceDetailModal from './ServiceDetailModal';

const services = [
    {
        title: "IT & Network Solutions",
        description: "Comprehensive infrastructure design, structured cabling, and enterprise connectivity for modern businesses.",
        longDescription: "We provide end-to-end networking solutions that form the backbone of your digital transformation. From small office setups to global enterprise infrastructures, our certified engineers ensure seamless connectivity.",
        icon: <Network size={32} />,
        tags: ["Network Design", "Cloud Support", "Deployment"],
        features: [
            { title: "Structured Cabling", desc: "Category 6/6A and Fiber optic installations following global standards." },
            { title: "Enterprise Wi-Fi", desc: "High-density wireless solutions with seamless roaming and security." },
            { title: "VPN & Remote Access", desc: "Secure tunnels for your remote workforce to access HQ resources." },
            { title: "Hardware Procurement", desc: "Official partners with Cisco, Ubiquiti, and MikroTik." }
        ]
    },
    {
        title: "Security & CCTV Systems",
        description: "Advanced surveillance monitoring, access control, and alarm system integration for asset protection.",
        longDescription: "Your safety is our priority. We deploy cutting-edge surveillance and biometric systems designed to protect your physical assets and personnel with 24/7 reliability.",
        icon: <ShieldCheck size={32} />,
        tags: ["CCTV", "Access Control", "Monitoring"],
        features: [
            { title: "IP Surveillance", desc: "4K High-definition cameras with night vision and remote playback." },
            { title: "Biometric Access", desc: "Fingerprint, facial recognition, and RFID card gate systems." },
            { title: "Intrusion Detection", desc: "Smart alarm systems with mobile alerts and perimeter monitoring." },
            { title: "VMS Integration", desc: "Centralized Video Management Systems for large-scale deployments." }
        ]
    },
    {
        title: "Managed IT Services",
        description: "Continuous monitoring, preventive maintenance, and expert technical assistance around the clock.",
        longDescription: "Let us handle your technology so you can focus on your business. Our managed services provide proactive maintenance and instant support for your entire IT fleet.",
        icon: <Headphones size={32} />,
        tags: ["24/7 Support", "Lifecycle Mgmt", "Remote Help"],
        features: [
            { title: "24/7 Helpdesk", desc: "Expert technical assistance available whenever you need it." },
            { title: "Patch Management", desc: "Regular updates and security patches for all your systems." },
            { title: "Cloud Backup", desc: "Automated off-site backups for disaster recovery and business continuity." },
            { title: "Asset Management", desc: "Tracking and optimization of your hardware and software lifecycle." }
        ]
    },
    {
        title: "System Repair Services",
        description: "Professional diagnostics and hardware replacement for computers, servers, and enterprise IT equipment.",
        longDescription: "Minimize downtime with our expert system repair services. We offer professional board-level repairs, data recovery, and performance upgrades for all IT hardware.",
        icon: <Settings size={32} />,
        tags: ["Hardware Repair", "Data Recovery", "Upgrades"],
        features: [
            { title: "Server Maintenance", desc: "Critical hardware repairs and cleaning for enterprise rack servers." },
            { title: "Data Recovery", desc: "Specialized laboratory services for failing HDDs, SSDs, and RAID arrays." },
            { title: "Mac & PC Repair", desc: "Component-level diagnostics and replacement for workstations." },
            { title: "Performance Upgrades", desc: "SSD and RAM optimization to extend the life of your existing hardware." }
        ]
    }
];

const Services = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenDetail = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    return (
        <section id="services" className="section-padding bg-graphite/30">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-accent text-xs font-black tracking-[0.3em] uppercase mb-6 block">Our Expertise</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                            Unmatched <span className="text-gradient-gold">Precision</span><br />
                            in Every Solution.
                        </h2>
                    </div>
                    <p className="text-off-white/40 max-w-sm font-light text-right hidden md:block">
                        Providing end-to-end technology and security infrastructure that empowers your organization to scale without limits.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative p-10 bg-primary/40 border border-white/5 hover:bg-accent/[0.03] transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover highlight line */}
                            <div className="absolute top-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-700" />

                            <div className="mb-8 p-4 w-fit bg-graphite/50 rounded-lg group-hover:scale-110 transition-transform duration-500 text-accent">
                                {service.icon}
                            </div>

                            <h3 className="text-2xl font-bold mb-6 group-hover:text-accent transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-off-white/50 mb-8 font-light text-sm leading-relaxed">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10">
                                {service.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-off-white/30 border border-white/5 px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <button
                                onClick={() => handleOpenDetail(service)}
                                className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] group-hover:gap-4 transition-all opacity-40 group-hover:opacity-100"
                            >
                                Learn More <ArrowUpRight size={14} className="text-accent" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            <ServiceDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                service={selectedService}
            />
        </section>
    );
};

export default Services;
