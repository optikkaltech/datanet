import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingBag,
    ArrowRight,
    Search,
    Cpu,
    HardDrive,
    Monitor,
    ShieldCheck,
    CheckCircle2,
    SlidersHorizontal,
    X,
    Laptop,
    Camera,
    Wifi,
    Server,
    Shield,
    RotateCcw
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/utils/SEO';
import QuoteModal from '../components/sections/QuoteModal';
import FloatingQuoteButton from '../components/utils/FloatingQuoteButton';
import { allProducts, laptopProducts, cctvProducts, networkingProducts, enterpriseHardware } from '../data/productsData';

const Sales = () => {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [selectedRam, setSelectedRam] = useState('All');
    const [selectedProcessor, setSelectedProcessor] = useState('All');
    const [selectedStock, setSelectedStock] = useState('All');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showFiltersMobile, setShowFiltersMobile] = useState(false);

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            // Search text
            if (searchTerm) {
                const search = searchTerm.toLowerCase();
                const matchName = product.name?.toLowerCase().includes(search);
                const matchBrand = product.brand?.toLowerCase().includes(search);
                const matchModel = product.model?.toLowerCase().includes(search);
                const matchCpu = product.processor?.toLowerCase().includes(search);
                const matchRam = product.ram?.toLowerCase().includes(search);
                const matchStorage = product.storage?.toLowerCase().includes(search);
                const matchFeatures = (product.features || []).some(f => f.toLowerCase().includes(search));
                if (!matchName && !matchBrand && !matchModel && !matchCpu && !matchRam && !matchStorage && !matchFeatures) {
                    return false;
                }
            }

            // Category Filter
            if (selectedCategory === 'Dell Laptops') {
                if (product.category !== 'Laptops' || product.brand !== 'Dell') return false;
            } else if (selectedCategory === 'HP Laptops') {
                if (product.category !== 'Laptops' || product.brand !== 'HP') return false;
            } else if (selectedCategory === '2-in-1 Touchscreens') {
                const is2in1 = product.model?.includes('2-in-1') || product.model?.includes('x360') || (product.screenType && product.screenType.toLowerCase().includes('touch'));
                if (!is2in1) return false;
            } else if (selectedCategory === 'CCTV & Surveillance') {
                if (product.category !== 'CCTV & Surveillance' && product.category !== 'NVR & Recording') return false;
            } else if (selectedCategory === 'Networking & Security') {
                if (product.category !== 'Networking' && product.category !== 'Cybersecurity') return false;
            } else if (selectedCategory === 'Servers & Infrastructure') {
                if (product.category !== 'Servers' && product.category !== 'Power & UPS' && product.category !== 'Access Control' && product.category !== 'Displays') return false;
            }

            // Brand Filter
            if (selectedBrand !== 'All' && product.brand !== selectedBrand) {
                return false;
            }

            // RAM Filter (for laptops)
            if (selectedRam !== 'All' && product.ram !== selectedRam) {
                return false;
            }

            // Processor Filter (for laptops)
            if (selectedProcessor !== 'All' && product.processor !== selectedProcessor) {
                return false;
            }

            // Stock Filter
            if (selectedStock !== 'All' && product.stockStatus !== selectedStock) {
                return false;
            }

            return true;
        });
    }, [searchTerm, selectedCategory, selectedBrand, selectedRam, selectedProcessor, selectedStock]);

    const handlePurchase = (product) => {
        let message = `Hello Datanet Global, I would like to order/inquire about: *${product.name}*`;
        if (product.processor) {
            message += `\n- *Processor:* ${product.processor} ${product.generation || ''}`;
            message += `\n- *RAM:* ${product.ram}`;
            message += `\n- *Storage:* ${product.storage}`;
            message += `\n- *Screen:* ${product.screenType || 'Standard'} ${product.screenSize || ''}`;
            message += `\n- *Stock Status:* ${product.stockStatus || 'In Stock'}`;
        }
        message += `\n\nCould you provide availability and pricing details?`;
        window.open(`https://wa.me/447586352447?text=${encodeURIComponent(message)}`, '_blank');
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('All');
        setSelectedBrand('All');
        setSelectedRam('All');
        setSelectedProcessor('All');
        setSelectedStock('All');
    };

    const categories = [
        { id: 'All', label: 'All Inventory', count: allProducts.length, icon: <ShoppingBag size={16} /> },
        { id: 'Dell Laptops', label: 'Dell Laptops', count: laptopProducts.filter(p => p.brand === 'Dell').length, icon: <Laptop size={16} /> },
        { id: 'HP Laptops', label: 'HP Laptops', count: laptopProducts.filter(p => p.brand === 'HP').length, icon: <Laptop size={16} /> },
        { id: '2-in-1 Touchscreens', label: '2-in-1 / Touch', count: laptopProducts.filter(p => p.model.includes('2-in-1') || p.model.includes('x360') || (p.screenType && p.screenType.toLowerCase().includes('touch'))).length, icon: <Monitor size={16} /> },
        { id: 'CCTV & Surveillance', label: 'CCTV & NVR', count: cctvProducts.length, icon: <Camera size={16} /> },
        { id: 'Networking & Security', label: 'Networking', count: networkingProducts.length, icon: <Wifi size={16} /> },
        { id: 'Servers & Infrastructure', label: 'Servers & Power', count: enterpriseHardware.length, icon: <Server size={16} /> }
    ];

    const brands = ['All', 'Dell', 'HP', 'Hikvision', 'Dahua', 'Cisco', 'Cisco Meraki', 'Ubiquiti', 'ZKTeco', 'APC by Schneider'];

    return (
        <div className="bg-primary min-h-screen text-off-white font-sans selection:bg-accent selection:text-primary">
            <SEO
                title="Hardware Store & Laptop Inventory | Datanet Global"
                description="Browse Datanet's certified business laptops (Dell Latitude, HP EliteBook, Dragonfly), 4K CCTV surveillance systems, Cisco networking switches, and enterprise servers."
            />
            <Navbar onOpenQuote={() => setIsQuoteModalOpen(true)} />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    {/* Header Banner */}
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-black tracking-[0.25em] uppercase mb-6"
                        >
                            <Shield size={14} />
                            Verified Hardware Catalog
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight"
                        >
                            Enterprise <span className="text-gradient-gold">Laptops & Hardware</span> Store.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-off-white/60 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto"
                        >
                            Explore our live inventory of verified Dell Latitude and HP EliteBook business laptops,
                            4K IP surveillance, and enterprise networking hardware.
                        </motion.p>
                    </div>

                    {/* Stats Counter Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 rounded-2xl bg-graphite/30 border border-white/5 text-center">
                        <div>
                            <div className="text-2xl md:text-3xl font-black text-accent">{laptopProducts.length}</div>
                            <div className="text-[11px] uppercase tracking-wider text-off-white/50 font-bold mt-1">Laptop Configs</div>
                        </div>
                        <div>
                            <div className="text-2xl md:text-3xl font-black text-white">4K UHD</div>
                            <div className="text-[11px] uppercase tracking-wider text-off-white/50 font-bold mt-1">Surveillance Systems</div>
                        </div>
                        <div>
                            <div className="text-2xl md:text-3xl font-black text-accent">100%</div>
                            <div className="text-[11px] uppercase tracking-wider text-off-white/50 font-bold mt-1">Hardware Inspected</div>
                        </div>
                        <div>
                            <div className="text-2xl md:text-3xl font-black text-white">Instant</div>
                            <div className="text-[11px] uppercase tracking-wider text-off-white/50 font-bold mt-1">WhatsApp Dispatch</div>
                        </div>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="bg-graphite/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-10 shadow-2xl">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                            {/* Search Input */}
                            <div className="relative w-full md:max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-off-white/40" size={18} />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by model, CPU, RAM (e.g. 7420, i7, 32GB)..."
                                    className="w-full bg-primary/70 border border-white/10 rounded-xl pl-12 pr-10 py-3.5 text-sm text-off-white placeholder:text-off-white/30 focus:outline-none focus:border-accent transition-colors"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-off-white/40 hover:text-white"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            {/* Mobile Filters Toggle & Reset */}
                            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                                <button
                                    onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                                    className="md:hidden flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider"
                                >
                                    <SlidersHorizontal size={16} />
                                    <span>{showFiltersMobile ? 'Hide Filters' : 'Filter Specs'}</span>
                                </button>

                                <div className="text-xs text-off-white/60">
                                    Showing <span className="font-bold text-accent">{filteredProducts.length}</span> of {allProducts.length} items
                                </div>

                                {(searchTerm || selectedCategory !== 'All' || selectedBrand !== 'All' || selectedRam !== 'All' || selectedProcessor !== 'All' || selectedStock !== 'All') && (
                                    <button
                                        onClick={resetFilters}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-accent hover:text-accent-light transition-colors cursor-pointer"
                                    >
                                        <RotateCcw size={12} />
                                        <span>Reset</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Category Buttons Bar */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                                        selectedCategory === cat.id
                                            ? 'bg-accent text-primary shadow-lg shadow-accent/20'
                                            : 'bg-primary/50 text-off-white/70 hover:text-white hover:bg-primary border border-white/5'
                                    }`}
                                >
                                    {cat.icon}
                                    <span>{cat.label}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${selectedCategory === cat.id ? 'bg-primary/20 text-primary' : 'bg-white/10 text-off-white/50'}`}>
                                        {cat.count}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Secondary Dropdown Filters (Desktop & Mobile) */}
                        <div className={`mt-6 pt-6 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3 ${showFiltersMobile ? 'block' : 'hidden md:grid'}`}>
                            {/* Brand Select */}
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-wider text-off-white/40 mb-1.5">Brand</label>
                                <select
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    className="w-full bg-primary/70 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-off-white focus:outline-none focus:border-accent"
                                >
                                    {brands.map(b => (
                                        <option key={b} value={b} className="bg-graphite text-white">{b === 'All' ? 'All Brands' : b}</option>
                                    ))}
                                </select>
                            </div>

                            {/* RAM Select */}
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-wider text-off-white/40 mb-1.5">RAM Capacity</label>
                                <select
                                    value={selectedRam}
                                    onChange={(e) => setSelectedRam(e.target.value)}
                                    className="w-full bg-primary/70 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-off-white focus:outline-none focus:border-accent"
                                >
                                    <option value="All" className="bg-graphite text-white">All RAM Sizes</option>
                                    <option value="8GB" className="bg-graphite text-white">8 GB</option>
                                    <option value="16GB" className="bg-graphite text-white">16 GB</option>
                                    <option value="32GB" className="bg-graphite text-white">32 GB</option>
                                </select>
                            </div>

                            {/* Processor Select */}
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-wider text-off-white/40 mb-1.5">Processor</label>
                                <select
                                    value={selectedProcessor}
                                    onChange={(e) => setSelectedProcessor(e.target.value)}
                                    className="w-full bg-primary/70 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-off-white focus:outline-none focus:border-accent"
                                >
                                    <option value="All" className="bg-graphite text-white">All Processors</option>
                                    <option value="Core i7" className="bg-graphite text-white">Intel Core i7</option>
                                    <option value="Core i5" className="bg-graphite text-white">Intel Core i5</option>
                                    <option value="Pentium" className="bg-graphite text-white">Intel Pentium</option>
                                </select>
                            </div>

                            {/* Stock Status Select */}
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-wider text-off-white/40 mb-1.5">Stock Status</label>
                                <select
                                    value={selectedStock}
                                    onChange={(e) => setSelectedStock(e.target.value)}
                                    className="w-full bg-primary/70 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-off-white focus:outline-none focus:border-accent"
                                >
                                    <option value="All" className="bg-graphite text-white">All Statuses</option>
                                    <option value="In stock" className="bg-graphite text-white">In Stock</option>
                                    <option value="Available in quantity" className="bg-graphite text-white">Available in Quantity</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {filteredProducts.length === 0 ? (
                        <div className="p-16 text-center bg-graphite/20 border border-white/5 rounded-3xl max-w-xl mx-auto my-12">
                            <ShoppingBag className="mx-auto text-accent mb-4 opacity-40" size={48} />
                            <h3 className="text-xl font-bold mb-2">No matching products found</h3>
                            <p className="text-off-white/60 text-sm mb-6">
                                Try adjusting your search query or filters to find what you are looking for.
                            </p>
                            <button
                                onClick={resetFilters}
                                className="btn-primary rounded-xl"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, index) => {
                                    const isLaptop = product.category === 'Laptops';
                                    return (
                                        <motion.div
                                            key={product.id || index}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
                                            className="group relative bg-graphite/30 hover:bg-graphite/50 border border-white/10 hover:border-accent/40 rounded-3xl overflow-hidden transition-all duration-500 flex flex-col justify-between hover:shadow-2xl hover:shadow-accent/5"
                                        >
                                            {/* Product Image Box */}
                                            <div className="aspect-[16/10] overflow-hidden bg-primary/60 relative p-6 flex items-center justify-center border-b border-white/5">
                                                <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />

                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 relative z-0"
                                                    onError={(e) => { e.target.src = '/images/laptops/hp_elitebook_840.jpg'; }}
                                                />

                                                {/* Top Badges */}
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

                                            {/* Product Content */}
                                            <div className="p-6 md:p-7 flex flex-col flex-grow">
                                                <div className="mb-4">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                                                            {product.category}
                                                        </span>
                                                        {isLaptop && product.screenSize && (
                                                            <span className="text-[11px] text-off-white/40 font-mono">
                                                                {product.screenSize}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="text-xl font-bold mt-1 group-hover:text-accent transition-colors line-clamp-1">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-xs text-off-white/50 mt-1 uppercase tracking-wider">
                                                        {isLaptop ? `${product.processor || ''} ${product.generation ? `• ${product.generation}` : ''}` : product.model}
                                                    </p>
                                                </div>

                                                {/* Specs Grid */}
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
                                                                <span className="truncate text-off-white/80">{product.screenType || 'FHD Display'}</span>
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

                                                {/* Features Badges */}
                                                {isLaptop && product.features && product.features.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                                        {product.features.map((feat, fIdx) => (
                                                            <span key={fIdx} className="text-[10px] bg-white/5 text-off-white/60 px-2.5 py-1 rounded-md border border-white/5">
                                                                {feat}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Actions */}
                                                <div className="mt-auto space-y-2.5 pt-2">
                                                    <button
                                                        onClick={() => handlePurchase(product)}
                                                        className="w-full py-3.5 bg-accent hover:bg-accent-light text-primary font-black uppercase tracking-wider text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-accent/20 cursor-pointer"
                                                    >
                                                        <span>Order via WhatsApp</span>
                                                        <ArrowRight size={14} />
                                                    </button>

                                                    <button
                                                        onClick={() => setSelectedProduct(product)}
                                                        className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-off-white/70 hover:text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-colors border border-white/5 cursor-pointer text-center"
                                                    >
                                                        View Full Specifications
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Custom Request CTA */}
                    <div className="mt-24 p-10 md:p-14 bg-gradient-to-r from-accent/10 via-graphite to-primary border border-accent/20 rounded-3xl relative overflow-hidden">
                        <div className="relative z-10 max-w-2xl">
                            <span className="text-accent text-xs font-black tracking-widest uppercase block mb-3">
                                Bespoke Hardware Procurement
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black mb-4">
                                Need a specific configuration or bulk deployment?
                            </h2>
                            <p className="text-off-white/60 mb-8 leading-relaxed text-sm md:text-base font-light">
                                If you need customized RAM/SSD upgrades, specialized surveillance cameras, or Cisco enterprise switches not listed here, our team sources and prepares custom configurations within 24-48 hours.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => setIsQuoteModalOpen(true)}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-primary font-black uppercase tracking-widest text-xs rounded-xl hover:bg-accent-light transition-all shadow-xl shadow-accent/10 cursor-pointer"
                                >
                                    Request Custom Quote
                                    <ArrowRight size={16} />
                                </button>
                                <a
                                    href="https://wa.me/447586352447?text=Hello%20Datanet%20Global,%20I%20need%20a%20custom%20hardware%20configuration."
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all"
                                >
                                    WhatsApp Sales
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Product Details Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-graphite border border-white/10 rounded-3xl max-w-2xl w-full p-8 relative overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
                        >
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-off-white/60 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-black uppercase tracking-wider">
                                    {selectedProduct.brand}
                                </span>
                                <span className="text-xs text-off-white/40 uppercase tracking-wider">
                                    {selectedProduct.category}
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black mb-4">
                                {selectedProduct.name}
                            </h2>

                            <div className="aspect-[16/9] bg-primary/70 rounded-2xl overflow-hidden mb-6 p-6 flex items-center justify-center border border-white/5">
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    className="w-full h-full object-cover rounded-xl"
                                    onError={(e) => { e.target.src = '/images/laptops/hp_elitebook_840.jpg'; }}
                                />
                            </div>

                            <div className="space-y-4 mb-8">
                                <h4 className="text-xs font-black uppercase tracking-widest text-accent">Technical Specifications</h4>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    {selectedProduct.processor && (
                                        <div className="p-3 bg-primary/60 rounded-xl border border-white/5">
                                            <div className="text-[10px] text-off-white/40 uppercase font-bold">Processor</div>
                                            <div className="font-semibold text-off-white">{selectedProduct.processor} {selectedProduct.generation}</div>
                                        </div>
                                    )}
                                    {selectedProduct.ram && (
                                        <div className="p-3 bg-primary/60 rounded-xl border border-white/5">
                                            <div className="text-[10px] text-off-white/40 uppercase font-bold">Memory (RAM)</div>
                                            <div className="font-semibold text-off-white">{selectedProduct.ram}</div>
                                        </div>
                                    )}
                                    {selectedProduct.storage && (
                                        <div className="p-3 bg-primary/60 rounded-xl border border-white/5">
                                            <div className="text-[10px] text-off-white/40 uppercase font-bold">Storage</div>
                                            <div className="font-semibold text-off-white">{selectedProduct.storage}</div>
                                        </div>
                                    )}
                                    {selectedProduct.screenType && (
                                        <div className="p-3 bg-primary/60 rounded-xl border border-white/5">
                                            <div className="text-[10px] text-off-white/40 uppercase font-bold">Display</div>
                                            <div className="font-semibold text-off-white">{selectedProduct.screenType} {selectedProduct.screenSize}</div>
                                        </div>
                                    )}
                                    {selectedProduct.os && (
                                        <div className="p-3 bg-primary/60 rounded-xl border border-white/5">
                                            <div className="text-[10px] text-off-white/40 uppercase font-bold">Operating System</div>
                                            <div className="font-semibold text-off-white">{selectedProduct.os}</div>
                                        </div>
                                    )}
                                    {selectedProduct.stockStatus && (
                                        <div className="p-3 bg-primary/60 rounded-xl border border-white/5">
                                            <div className="text-[10px] text-off-white/40 uppercase font-bold">Availability</div>
                                            <div className="font-semibold text-accent">{selectedProduct.stockStatus}</div>
                                        </div>
                                    )}
                                </div>

                                {selectedProduct.features && selectedProduct.features.length > 0 && (
                                    <div className="pt-2">
                                        <div className="text-[10px] text-off-white/40 uppercase font-bold mb-2">Key Features & Security</div>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProduct.features.map((feat, i) => (
                                                <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-xs border border-white/5 text-off-white/80">
                                                    {feat}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => handlePurchase(selectedProduct)}
                                    className="w-full py-4 bg-accent text-primary font-black uppercase tracking-wider text-xs rounded-xl hover:bg-accent-light transition-colors flex items-center justify-center gap-2 shadow-lg shadow-accent/20 cursor-pointer"
                                >
                                    <span>Order / Inquire on WhatsApp</span>
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <FloatingQuoteButton onClick={() => setIsQuoteModalOpen(true)} />

            <QuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
            />

            <Footer />
        </div>
    );
};

export default Sales;
