import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Cpu, HardDrive, Monitor, ShieldCheck, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { laptopProducts, cctvProducts, networkingProducts, enterpriseHardware } from '../../data/productsData';

const SalesBanner = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Pick top curated featured items for the landing page
    const featuredDell = laptopProducts.filter(p => p.brand === 'Dell' && (p.ram === '32GB' || p.processor === 'Core i7')).slice(0, 3);
    const featuredHp = laptopProducts.filter(p => p.brand === 'HP' && (p.model.includes('Dragonfly') || p.model.includes('1040') || p.model.includes('840 G8'))).slice(0, 3);
    const featuredTouch = laptopProducts.filter(p => p.model.includes('2-in-1') || p.model.includes('x360')).slice(0, 3);
    const featuredCctv = cctvProducts.slice(0, 2);
    const featuredNet = networkingProducts.slice(0, 2);

    const getDisplayProducts = () => {
        switch (activeTab) {
            case 'dell':
                return laptopProducts.filter(p => p.brand === 'Dell').slice(0, 6);
            case 'hp':
                return laptopProducts.filter(p => p.brand === 'HP').slice(0, 6);
            case '2in1':
                return laptopProducts.filter(p => p.model.includes('2-in-1') || p.model.includes('x360') || p.screenType.toLowerCase().includes('touch')).slice(0, 6);
            case 'cctv':
                return [...cctvProducts, ...enterpriseHardware.filter(p => p.category === 'Access Control')].slice(0, 6);
            case 'networking':
                return [...networkingProducts, ...enterpriseHardware.filter(p => p.category === 'Servers' || p.category === 'Power & UPS')].slice(0, 6);
            case 'all':
            default:
                return [
                    laptopProducts[0], // Dell Latitude 7420 i7 32GB
                    laptopProducts[43], // HP EliteBook 1040 G8 x360
                    laptopProducts[58], // HP EliteBook Dragonfly
                    laptopProducts[1], // Dell Latitude 7420 2-in-1
                    cctvProducts[0], // Hikvision 4K ColorVu
                    networkingProducts[0] // Cisco Catalyst Switch
                ];
        }
    };

    const displayProducts = getDisplayProducts();

    const handleOrder = (product) => {
        let msg = `Hello Datanet Global, I am interested in purchasing/inquiring about: ${product.name}`;
        if (product.processor) msg += ` (Specs: ${product.processor} ${product.generation || ''}, ${product.ram}, ${product.storage}, ${product.screenType || ''})`;
        msg += `. Is this available for delivery?`;
        window.open(`https://wa.me/447586352447?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <section id="store-showcase" className="relative py-28 bg-primary/95 overflow-hidden border-t border-b border-white/5">
            {/* Background Glow & Noise */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-black tracking-[0.25em] uppercase mb-4">
                            <Sparkles size={14} className="animate-pulse" />
                            Hardware Store & Live Inventory
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                            Certified <span className="text-gradient-gold">Laptops & Systems</span> Ready for Business.
                        </h2>
                        <p className="text-off-white/60 text-base md:text-lg font-light mt-4 leading-relaxed">
                            Thoroughly tested enterprise-grade HP & Dell laptop fleets, 4K CCTV surveillance systems,
                            and Cisco network appliances ready for immediate dispatch.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
                        <button
                            onClick={() => navigate('/sales')}
                            className="btn-primary flex items-center gap-3 group rounded-xl shadow-lg shadow-accent/10"
                        >
                            <ShoppingBag size={18} />
                            <span>View Full Store (70+ Configs)</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 custom-scrollbar">
                    {[
                        { id: 'all', label: 'Featured Picks' },
                        { id: 'dell', label: 'Dell Latitudes' },
                        { id: 'hp', label: 'HP EliteBooks & Dragonfly' },
                        { id: '2in1', label: '2-in-1 / Touchscreens' },
                        { id: 'cctv', label: 'CCTV & Security' },
                        { id: 'networking', label: 'Network & Servers' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                                activeTab === tab.id
                                    ? 'bg-accent text-primary shadow-md shadow-accent/20'
                                    : 'bg-graphite/40 text-off-white/70 hover:text-off-white hover:bg-graphite/80 border border-white/5'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {displayProducts.map((product, idx) => {
                            const isLaptop = product.category === 'Laptops';
                            return (
                                <motion.div
                                    key={product.id || idx}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    className="group relative bg-graphite/30 hover:bg-graphite/50 border border-white/10 hover:border-accent/40 rounded-3xl overflow-hidden transition-all duration-500 flex flex-col justify-between hover:shadow-2xl hover:shadow-accent/5"
                                >
                                    {/* Top Image Box */}
                                    <div className="aspect-[16/10] overflow-hidden bg-primary/60 relative p-6 flex items-center justify-center border-b border-white/5">
                                        <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                                        
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 relative z-0"
                                            onError={(e) => { e.target.src = '/images/laptops/hp_elitebook_840.jpg'; }}
                                        />

                                        {/* Stock & Brand Badges */}
                                        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                                            <span className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md border border-white/10 text-[11px] font-black uppercase tracking-wider text-accent">
                                                {product.brand}
                                            </span>
                                        </div>

                                        <div className="absolute top-4 right-4 z-20">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                                                product.stockStatus === 'In stock'
                                                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30'
                                                    : 'bg-accent/15 text-accent border-accent/30'
                                            }`}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                                {product.stockStatus || 'In Stock'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Body Specs */}
                                    <div className="p-6 md:p-7 flex flex-col flex-grow">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold group-hover:text-accent transition-colors line-clamp-1">
                                                {product.name}
                                            </h3>
                                            <p className="text-xs text-off-white/40 mt-1 uppercase tracking-wider">
                                                {isLaptop ? `${product.processor || ''} ${product.generation ? `• ${product.generation}` : ''}` : product.category}
                                            </p>
                                        </div>

                                        {/* Specs Tag Grid */}
                                        <div className="grid grid-cols-2 gap-2 mb-6 text-xs">
                                            {isLaptop ? (
                                                <>
                                                    <div className="bg-primary/50 border border-white/5 rounded-xl px-3 py-2 flex items-center gap-2">
                                                        <Cpu size={14} className="text-accent shrink-0" />
                                                        <span className="truncate text-off-white/80">{product.ram} RAM</span>
                                                    </div>
                                                    <div className="bg-primary/50 border border-white/5 rounded-xl px-3 py-2 flex items-center gap-2">
                                                        <HardDrive size={14} className="text-accent shrink-0" />
                                                        <span className="truncate text-off-white/80">{product.storage} SSD</span>
                                                    </div>
                                                    <div className="bg-primary/50 border border-white/5 rounded-xl px-3 py-2 flex items-center gap-2">
                                                        <Monitor size={14} className="text-accent shrink-0" />
                                                        <span className="truncate text-off-white/80">{product.screenType || '14" Screen'}</span>
                                                    </div>
                                                    <div className="bg-primary/50 border border-white/5 rounded-xl px-3 py-2 flex items-center gap-2">
                                                        <ShieldCheck size={14} className="text-accent shrink-0" />
                                                        <span className="truncate text-off-white/80">{product.os || 'Windows 11'}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="col-span-2 space-y-1.5">
                                                    {(product.features || []).slice(0, 3).map((feat, fIdx) => (
                                                        <div key={fIdx} className="flex items-center gap-2 text-off-white/70 text-xs">
                                                            <CheckCircle2 size={13} className="text-accent shrink-0" />
                                                            <span className="line-clamp-1">{feat}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Features Pills for laptops */}
                                        {isLaptop && product.features && product.features.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-6">
                                                {product.features.map((feat, fIdx) => (
                                                    <span key={fIdx} className="text-[10px] bg-white/5 text-off-white/60 px-2.5 py-1 rounded-md border border-white/5">
                                                        {feat}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="mt-auto space-y-2 pt-2">
                                            <button
                                                onClick={() => handleOrder(product)}
                                                className="w-full py-3.5 bg-accent hover:bg-accent-light text-primary font-black uppercase tracking-wider text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-accent/20 cursor-pointer"
                                            >
                                                <span>Order via WhatsApp</span>
                                                <ArrowRight size={14} />
                                            </button>

                                            <button
                                                onClick={() => navigate('/sales')}
                                                className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-off-white/70 hover:text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 border border-white/5 cursor-pointer"
                                            >
                                                <span>View in Full Store</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Bottom Callout Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-graphite via-graphite/60 to-accent/10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div>
                        <span className="text-accent text-xs font-black tracking-widest uppercase block mb-2">
                            Bulk Orders & Fleet Management
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black">
                            Looking for bulk business workstations or custom IT setup?
                        </h3>
                        <p className="text-off-white/60 text-sm md:text-base mt-2 max-w-xl font-light">
                            We configure and deploy 5 to 100+ laptop units with pre-installed enterprise OS, asset tagging, and complete surveillance setups.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 shrink-0">
                        <button
                            onClick={() => navigate('/sales')}
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all"
                        >
                            Open Hardware Store
                        </button>
                        <a
                            href="https://wa.me/447586352447?text=Hello%20Datanet%20Global,%20I%20would%20like%20a%20bulk%20laptop/hardware%20quote."
                            target="_blank"
                            rel="noreferrer"
                            className="btn-primary rounded-xl"
                        >
                            Get Bulk Quote
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SalesBanner;
