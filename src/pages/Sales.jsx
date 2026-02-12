import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, ShieldCheck, Cpu, HardDrive, Wifi, Server, Monitor, Lock, Battery, Wrench } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const products = [
    {
        id: 1,
        name: "Enterprise Laptop Fleet",
        category: "Laptops",
        price: "From £899",
        image: "/images/laptop.png",
        features: ["Core i7/i9 Processors", "32GB RAM", "1TB SSD", "Enterprise Security"],
        icon: <Cpu size={20} />
    },
    {
        id: 2,
        name: "4K IP Surveillance System",
        category: "CCTV Cameras",
        price: "From £1,299",
        image: "/images/cctv.png",
        features: ["4K Resolution", "Night Vision", "AI Motion Detection", "Weatherproof"],
        icon: <ShieldCheck size={20} />
    },
    {
        id: 3,
        name: "Network Video Recorders",
        category: "NVR Systems",
        price: "From £499",
        image: "/images/nvr_system.png",
        features: ["16-Channel Recording", "Remote Access", "4TB Storage", "H.265+ Compression"],
        icon: <HardDrive size={20} />
    },
    {
        id: 4,
        name: "Smart Office Networking",
        category: "Networking",
        price: "Custom Quote",
        image: "/images/smart.png",
        features: ["Wi-Fi 6 Mesh", "Cloud Management", "IoT Ready", "Secure Guest Access"],
        icon: <Wifi size={20} />
    },
    {
        id: 5,
        name: "Rackmount Servers",
        category: "Servers",
        price: "Custom Configure",
        image: "/images/server.png",
        features: ["Xeon Scalable CPUs", "Redundant Power", "Hot-Swap Drive Bays", "Remote Mgmt"],
        icon: <Server size={20} />
    },
    {
        id: 6,
        name: "Ultra-Wide Monitors",
        category: "Displays",
        price: "From £450",
        image: "/images/monitor.png",
        features: ["34-inch Curved", "IPS Panel", "USB-C Docking", "Color Accurate"],
        icon: <Monitor size={20} />
    },
    {
        id: 7,
        name: "Biometric Access Control",
        category: "Security",
        price: "From £2,500",
        image: "/images/access_control.png",
        features: ["Fingerprint/Face ID", "RFID Integration", "Time & Attendance", "Anti-Passback"],
        icon: <Lock size={20} />
    },
    {
        id: 8,
        name: "Enterprise UPS Systems",
        category: "Power",
        price: "From £350",
        image: "/images/cps.png", // Abstract tech/power image
        features: ["Battery Backup", "Surge Protection", "Voltage Regulation", "LCD Design"],
        icon: <Battery size={20} />
    },
    {
        id: 9,
        name: "Conference Room Solutions",
        category: "AV Systems",
        price: "Custom Quote",
        image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=2525&auto=format&fit=crop",
        features: ["4K Video Bars", "Wireless Casting", "Touch Controllers", "Acoustic Treatment"],
        icon: <Monitor size={20} />
    },
    {
        id: 10,
        name: "Firewall Appliances",
        category: "Cybersecurity",
        price: "From £699",
        image: "/images/firewalls.png",
        features: ["Next-Gen Threat Prevention", "VPN Gateway", "Deep Packet Inspection", "SD-WAN"],
        icon: <ShieldCheck size={20} />
    },
    {
        id: 11,
        name: "System Repair & Maintenance",
        category: "Services",
        price: "From £80/hr",
        image: "/images/repair.png",
        features: ["Hardware Diagnostics", "Component Replacement", "Data Recovery", "Software Troubleshooting"],
        icon: <Wrench size={20} />
    }
];

const Sales = () => {
    const handlePurchase = (productName) => {
        const message = `Hello, I'm interested in purchasing: ${productName} from your online store. Can you provide more details?`;
        window.open(`https://wa.me/447586352447?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="bg-primary min-h-screen text-off-white font-sans selection:bg-accent selection:text-primary">
            <Navbar />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-accent text-xs font-black tracking-[0.3em] uppercase block mb-6"
                        >
                            Datanet Store
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black mb-8 leading-tight"
                        >
                            Premium <span className="text-gradient-gold">Hardware</span><br />
                            for Modern Business.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-off-white/60 text-lg font-light leading-relaxed"
                        >
                            Upgrade your infrastructure with our curated selection of enterprise-grade equipment.
                            Directly sourced and configured for optimal performance.
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-graphite/30 border border-white/5 rounded-3xl overflow-hidden hover:border-accent/30 transition-all duration-500 h-full flex flex-col"
                            >
                                <div className="aspect-[4/3] overflow-hidden bg-white/5 relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-graphite to-transparent opacity-60 z-10" />
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        onError={(e) => { e.target.src = 'https://placehold.co/800x600/1a1a1a/FFF?text=Product+Image' }}
                                    />
                                    <div className="absolute top-6 right-6 z-20 bg-primary/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest text-accent">
                                        {product.category}
                                    </div>
                                </div>

                                <div className="p-8 md:p-10 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors line-clamp-1">{product.name}</h3>
                                            <p className="text-lg font-light text-off-white/80">{product.price}</p>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded-xl text-accent/80 shrink-0">
                                            {product.icon}
                                        </div>
                                    </div>

                                    <ul className="space-y-3 mb-10 flex-grow">
                                        {product.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-off-white/50">
                                                <div className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => handlePurchase(product.name)}
                                        className="w-full py-4 bg-white/5 hover:bg-accent text-white hover:text-primary font-bold uppercase tracking-widest text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto"
                                    >
                                        Order via WhatsApp
                                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-24 p-12 bg-accent/5 border border-accent/20 rounded-3xl text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none">
                            <ShoppingBag size={400} className="text-accent" />
                        </div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-black mb-6">Need a Custom Configuration?</h2>
                            <p className="text-off-white/60 mb-10 leading-relaxed">
                                We specialize in bespoke enterprise setups. Contact our sales team for bulk orders,
                                custom server builds, or complex security integrations.
                            </p>
                            <a
                                href="https://wa.me/447586352447"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-primary font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-accent-light transition-colors"
                            >
                                Chat with Sales
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Sales;
