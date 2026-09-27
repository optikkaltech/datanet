import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Send,
    CheckCircle2,
    Mail,
    User,
    Phone,
    Globe,
    Search,
    Shield,
    Sparkles,
    ChevronDown,
    MessageCircle,
    Laptop,
    Camera,
    Wifi,
    Server
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Link } from 'react-router-dom';

const serviceGroups = [
    {
        category: 'CCTV & Security Solutions',
        icon: <Camera size={13} className="text-accent" />,
        items: [
            'CCTV System (Complete Setup)',
            '4K UHD IP CCTV Cameras',
            'Wireless CCTV Camera System',
            'CCTV Installation & Maintenance',
            'NVR & 24/7 Remote Smartphone Viewing',
            'Commercial CCTV Site Survey'
        ]
    },
    {
        category: 'Business Laptops & Fleets',
        icon: <Laptop size={13} className="text-accent" />,
        items: [
            'Dell Latitude Business Laptop',
            'HP EliteBook G6 / x360 Touchscreen',
            'HP Elite Dragonfly Ultra-light',
            'Dell Latitude 2-in-1 Touchscreen',
            'Enterprise Laptop Fleet (Bulk 5-50+ Units)'
        ]
    },
    {
        category: 'Networking & Cloud Infrastructure',
        icon: <Wifi size={13} className="text-accent" />,
        items: [
            'Cisco Catalyst Switches & Meraki',
            'Business WiFi 6 & Mesh Setup',
            'Structured Network Cabling (Cat6/Cat6A)',
            'Cybersecurity, Firewall & VPN Defense'
        ]
    },
    {
        category: 'Servers, Access Control & Power',
        icon: <Server size={13} className="text-accent" />,
        items: [
            'Dell PowerEdge Enterprise Servers',
            'Biometric Access Control & Time Attendance',
            'APC Smart-UPS Power Backup',
            'Managed IT Support & PC Repair'
        ]
    }
];

const allFlatSuggestions = serviceGroups.flatMap(g => g.items);

const countries = [
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', prefix: '+44' },
    { code: 'US', name: 'United States', flag: '🇺🇸', prefix: '+1' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', prefix: '+1' },
    { code: 'IE', name: 'Ireland', flag: '🇮🇪', prefix: '+353' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬', prefix: '+234' },
    { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', prefix: '+971' },
    { code: 'EU', name: 'Other European Union', flag: '🇪🇺', prefix: '+' }
];

const QuoteModal = ({ isOpen, onClose, prefilledService = '' }) => {
    const [productName, setProductName] = useState(prefilledService || 'CCTV System');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(true);
    const [additionalNotes, setAdditionalNotes] = useState('');
    
    // Autocomplete & Browse State
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
    const [forceShowAll, setForceShowAll] = useState(false);
    const suggestionsRef = useRef(null);
    const inputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (prefilledService) {
            setProductName(prefilledService);
        }
    }, [prefilledService]);

    // Group-based filtering
    const displayedGroups = serviceGroups.map(group => {
        if (forceShowAll || !productName.trim()) {
            return group;
        }
        const query = productName.toLowerCase();
        const filteredItems = group.items.filter(item =>
            item.toLowerCase().includes(query) || group.category.toLowerCase().includes(query)
        );
        return {
            ...group,
            items: filteredItems
        };
    }).filter(group => group.items.length > 0);

    // Close suggestion box on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
                setIsSuggestionsOpen(false);
                setIsCountryDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreedToTerms) {
            alert('Please agree to the terms and privacy policy to continue.');
            return;
        }

        setLoading(true);

        try {
            await addDoc(collection(db, 'submissions'), {
                type: 'enquiry',
                product_service: productName,
                name,
                email,
                phone: phone ? `${selectedCountry.prefix} ${phone}` : '',
                country: selectedCountry.name,
                country_code: selectedCountry.code,
                notes: additionalNotes,
                status: 'new',
                created_at: serverTimestamp()
            });

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
                setName('');
                setEmail('');
                setPhone('');
                setAdditionalNotes('');
            }, 3000);
        } catch (error) {
            console.error('Error submitting enquiry:', error);
            alert('Error submitting enquiry. Please try again or message us on WhatsApp.');
        } finally {
            setLoading(false);
        }
    };

    const handleWhatsAppSubmit = () => {
        let msg = `Hello Datanet Global, I would like to request an enquiry/quote for: *${productName || 'CCTV & IT Systems'}*`;
        if (name) msg += `\n- *Name:* ${name}`;
        if (email) msg += `\n- *Email:* ${email}`;
        if (phone) msg += `\n- *Phone:* ${phone}`;
        msg += `\n- *Country:* ${selectedCountry.name}`;
        if (additionalNotes) msg += `\n- *Requirement:* ${additionalNotes}`;
        msg += `\n\nPlease provide quotation and availability details.`;
        window.open(`https://wa.me/447586352447?text=${encodeURIComponent(msg)}`, '_blank');
    };

    // Determine visual preview on the left side
    const isLaptop = productName.toLowerCase().includes('laptop') || productName.toLowerCase().includes('hp') || productName.toLowerCase().includes('dell');
    const previewImage = isLaptop ? '/images/laptops/dell_latitude_7420.jpg' : '/images/cctv.png';
    const previewTitle = isLaptop ? 'Looking for Business Laptops?' : 'Looking for CCTV System?';

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* Dark Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/85 backdrop-blur-md"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-full max-w-4xl bg-graphite border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col my-auto max-h-[92vh]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 z-30 p-2 rounded-full bg-white/5 hover:bg-white/10 text-off-white/70 hover:text-white transition-colors cursor-pointer"
                        >
                            <X size={20} />
                        </button>

                        {success ? (
                            <div className="p-12 md:p-20 text-center flex flex-col items-center justify-center gap-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-primary shadow-xl shadow-accent/20"
                                >
                                    <CheckCircle2 size={42} />
                                </motion.div>
                                <h2 className="text-3xl font-black text-white">Enquiry Received!</h2>
                                <p className="text-base text-off-white/70 max-w-md">
                                    Thank you, <span className="text-accent font-bold">{name || 'there'}</span>. Our technical sales team will review your requirement and reach out with a detailed quote shortly.
                                </p>
                                <div className="flex items-center gap-2 text-xs text-accent font-mono bg-accent/10 px-4 py-2 rounded-xl">
                                    <Sparkles size={14} />
                                    <span>Direct WhatsApp Hotline: 07586 352447</span>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto custom-scrollbar">
                                {/* Left Visual Column */}
                                <div className="md:col-span-5 bg-gradient-to-b from-primary/90 via-graphite/60 to-primary/95 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-full bg-accent/5 pointer-events-none" />

                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-[10px] font-black uppercase tracking-widest mb-4">
                                            <Shield size={12} />
                                            Datanet Global Live Quote
                                        </div>
                                        <h3 className="text-2xl font-black text-white leading-tight">
                                            {previewTitle}
                                        </h3>
                                        <p className="text-xs text-off-white/60 mt-2 leading-relaxed">
                                            Let us know your requirement, and get tailored quotes and verified hardware from certified Datanet engineers!
                                        </p>
                                    </div>

                                    {/* Product Visual Centerpiece */}
                                    <div className="my-6 aspect-[4/3] rounded-2xl overflow-hidden bg-primary/70 border border-white/10 p-4 flex items-center justify-center relative group">
                                        <img
                                            src={previewImage}
                                            alt="Enquiry Preview"
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => { e.target.src = '/images/cctv.png'; }}
                                        />
                                    </div>

                                    {/* Guarantees Box */}
                                    <div className="space-y-2 pt-2 border-t border-white/5 text-[11px] text-off-white/70">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 size={13} className="text-accent shrink-0" />
                                            <span>UK-Wide Dispatch & Professional Installation</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 size={13} className="text-accent shrink-0" />
                                            <span>Full Warranty & Ongoing Maintenance</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Form Column */}
                                <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-center" ref={suggestionsRef}>
                                    <div className="mb-6">
                                        <h2 className="text-xl md:text-2xl font-black text-white">
                                            Quick <span className="text-gradient-gold">Enquiry</span> Form
                                        </h2>
                                        <p className="text-xs text-off-white/50 mt-1">
                                            Fill out your specs below for an instant official estimate.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Product / Service Name (with Autocomplete & Full Categorized Directory) */}
                                        <div className="relative">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <label className="block text-[10px] font-black uppercase tracking-wider text-off-white/60">
                                                    Enter Product/Service name <span className="text-red-400">*</span>
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setForceShowAll(true);
                                                        setIsSuggestionsOpen(!isSuggestionsOpen);
                                                    }}
                                                    className="text-[10px] text-accent hover:text-accent-light transition-colors font-bold uppercase tracking-wider cursor-pointer"
                                                >
                                                    {isSuggestionsOpen ? 'Close Menu' : 'Browse All Services (18)'}
                                                </button>
                                            </div>

                                            <div className="relative flex items-center">
                                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-off-white/40 pointer-events-none">
                                                    <Search size={14} />
                                                </div>

                                                <input
                                                    ref={inputRef}
                                                    required
                                                    type="text"
                                                    value={productName}
                                                    onChange={(e) => {
                                                        setProductName(e.target.value);
                                                        setForceShowAll(false);
                                                        setIsSuggestionsOpen(true);
                                                    }}
                                                    onFocus={() => setIsSuggestionsOpen(true)}
                                                    placeholder="Type or select (e.g. CCTV, HP EliteBook, Cisco...)"
                                                    className="w-full bg-primary/80 border border-white/15 focus:border-accent rounded-xl pl-10 pr-20 py-3 text-xs text-off-white placeholder:text-off-white/30 focus:outline-none transition-colors"
                                                />

                                                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                                    {/* Quick 1-click Clear Button */}
                                                    {productName && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setProductName('');
                                                                setForceShowAll(true);
                                                                setIsSuggestionsOpen(true);
                                                                inputRef.current?.focus();
                                                            }}
                                                            title="Clear text to see full list"
                                                            className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-off-white/70 hover:text-white transition-colors cursor-pointer"
                                                        >
                                                            <X size={13} />
                                                        </button>
                                                    )}

                                                    {/* Dropdown Chevron Toggle */}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setForceShowAll(true);
                                                            setIsSuggestionsOpen(!isSuggestionsOpen);
                                                        }}
                                                        className="p-1 rounded-md hover:bg-white/10 text-off-white/50 hover:text-white transition-colors cursor-pointer"
                                                    >
                                                        <ChevronDown size={15} className={`transition-transform duration-200 ${isSuggestionsOpen ? 'rotate-180 text-accent' : ''}`} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Autocomplete & Directory Dropdown */}
                                            <AnimatePresence>
                                                {isSuggestionsOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -5 }}
                                                        className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-graphite border border-white/15 rounded-2xl shadow-2xl max-h-64 overflow-y-auto custom-scrollbar p-2"
                                                    >
                                                        {/* Top quick banner */}
                                                        <div className="px-2.5 py-1.5 mb-1 text-[10px] uppercase font-black tracking-wider text-off-white/40 flex items-center justify-between border-b border-white/5">
                                                            <span>{forceShowAll ? 'All Datanet Hardware & Services' : `Matching Results (${displayedGroups.reduce((acc, g) => acc + g.items.length, 0)})`}</span>
                                                            {!forceShowAll && productName && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setForceShowAll(true)}
                                                                    className="text-accent hover:underline lowercase font-sans text-[11px]"
                                                                >
                                                                    show all
                                                                </button>
                                                            )}
                                                        </div>

                                                        {displayedGroups.length === 0 ? (
                                                            <div className="p-4 text-center">
                                                                <p className="text-xs text-off-white/60">
                                                                    No direct match for "<span className="text-accent">{productName}</span>"
                                                                </p>
                                                                <p className="text-[11px] text-off-white/40 mt-1">
                                                                    You can keep typing for a custom request, or browse all below:
                                                                </p>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setForceShowAll(true)}
                                                                    className="mt-2.5 px-3 py-1.5 bg-accent/15 border border-accent/30 text-accent text-xs font-bold rounded-lg hover:bg-accent hover:text-primary transition-colors cursor-pointer"
                                                                >
                                                                    Show All Available Services
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="space-y-3 pt-1">
                                                                {displayedGroups.map((group, gIdx) => (
                                                                    <div key={gIdx} className="space-y-1">
                                                                        <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-accent/80 flex items-center gap-1.5 bg-white/5 rounded-md">
                                                                            {group.icon}
                                                                            <span>{group.category}</span>
                                                                        </div>
                                                                        <div className="space-y-0.5 pl-1">
                                                                            {group.items.map((item, itemIdx) => {
                                                                                const isSelected = productName.toLowerCase() === item.toLowerCase();
                                                                                return (
                                                                                    <button
                                                                                        key={itemIdx}
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            setProductName(item);
                                                                                            setIsSuggestionsOpen(false);
                                                                                            setForceShowAll(false);
                                                                                        }}
                                                                                        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                                                                                            isSelected
                                                                                                ? 'bg-accent text-primary font-bold shadow-md shadow-accent/20'
                                                                                                : 'text-off-white/80 hover:text-white hover:bg-white/10'
                                                                                        }`}
                                                                                    >
                                                                                        <span className="truncate">{item}</span>
                                                                                        {isSelected && <CheckCircle2 size={13} className="shrink-0" />}
                                                                                    </button>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Email Address */}
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-wider text-off-white/60 mb-1.5">
                                                Email ID <span className="text-red-400">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-off-white/40 pointer-events-none">
                                                    <Mail size={14} />
                                                </div>
                                                <input
                                                    required
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Enter your Email"
                                                    className="w-full bg-primary/80 border border-white/15 focus:border-accent rounded-xl pl-10 pr-4 py-3 text-xs text-off-white placeholder:text-off-white/30 focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Country Selector & Full Name */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {/* Country */}
                                            <div className="relative">
                                                <label className="block text-[10px] font-black uppercase tracking-wider text-off-white/60 mb-1.5 flex items-center gap-1">
                                                    <Globe size={11} className="text-accent" />
                                                    Your Country is:
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                                    className="w-full bg-primary/80 border border-white/15 hover:border-accent/40 rounded-xl px-3.5 py-3 text-xs text-off-white flex items-center justify-between transition-colors cursor-pointer"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <span>{selectedCountry.flag}</span>
                                                        <span className="truncate">{selectedCountry.name}</span>
                                                    </span>
                                                    <ChevronDown size={14} className="text-off-white/50 shrink-0" />
                                                </button>

                                                {/* Country Dropdown */}
                                                {isCountryDropdownOpen && (
                                                    <div className="absolute left-0 right-0 top-full mt-1 z-30 bg-graphite border border-white/15 rounded-xl shadow-2xl p-1 max-h-40 overflow-y-auto custom-scrollbar">
                                                        {countries.map(c => (
                                                            <button
                                                                key={c.code}
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedCountry(c);
                                                                    setIsCountryDropdownOpen(false);
                                                                }}
                                                                className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-off-white hover:bg-accent/15 hover:text-white flex items-center gap-2 cursor-pointer"
                                                            >
                                                                <span>{c.flag}</span>
                                                                <span>{c.name}</span>
                                                                <span className="text-[10px] text-off-white/40 ml-auto font-mono">{c.prefix}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Name */}
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-wider text-off-white/60 mb-1.5">
                                                    Name <span className="text-red-400">*</span>
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-off-white/40 pointer-events-none">
                                                        <User size={14} />
                                                    </div>
                                                    <input
                                                        required
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="Your Name"
                                                        className="w-full bg-primary/80 border border-white/15 focus:border-accent rounded-xl pl-10 pr-4 py-3 text-xs text-off-white placeholder:text-off-white/30 focus:outline-none transition-colors"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Phone Number (Optional) */}
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-wider text-off-white/60 mb-1.5">
                                                Phone Number (Optional for WhatsApp dispatch)
                                            </label>
                                            <div className="relative">
                                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-off-white/40 pointer-events-none">
                                                    <Phone size={14} />
                                                </div>
                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder={`${selectedCountry.prefix} 7586 352447`}
                                                    className="w-full bg-primary/80 border border-white/15 focus:border-accent rounded-xl pl-10 pr-4 py-3 text-xs text-off-white placeholder:text-off-white/30 focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Additional Notes (Optional) */}
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-wider text-off-white/60 mb-1.5">
                                                Requirement Details (Quantity, location, or specs)
                                            </label>
                                            <textarea
                                                rows="2"
                                                value={additionalNotes}
                                                onChange={(e) => setAdditionalNotes(e.target.value)}
                                                placeholder="e.g. 4 cameras for retail store in Newcastle, or 10 Dell laptops..."
                                                className="w-full bg-primary/80 border border-white/15 focus:border-accent rounded-xl px-4 py-2.5 text-xs text-off-white placeholder:text-off-white/30 focus:outline-none resize-none transition-colors"
                                            />
                                        </div>

                                        {/* Terms Agreement */}
                                        <div className="flex items-center gap-2 pt-1">
                                            <input
                                                type="checkbox"
                                                id="agreeTerms"
                                                checked={agreedToTerms}
                                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                                className="rounded border-white/20 text-accent focus:ring-accent cursor-pointer accent-amber-500"
                                            />
                                            <label htmlFor="agreeTerms" className="text-[11px] text-off-white/60 cursor-pointer select-none">
                                                I agree to the <Link to="/terms" onClick={onClose} className="text-accent underline hover:text-accent-light">terms</Link> and <Link to="/privacy" onClick={onClose} className="text-accent underline hover:text-accent-light">privacy policy</Link>
                                            </label>
                                        </div>

                                        {/* Submit Button ("Go >") */}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer disabled:opacity-50"
                                        >
                                            {loading ? (
                                                <span>Submitting to Datanet...</span>
                                            ) : (
                                                <>
                                                    <span>Go</span>
                                                    <Send size={15} />
                                                </>
                                            )}
                                        </button>

                                        {/* OR Divider */}
                                        <div className="relative flex py-2 items-center">
                                            <div className="flex-grow border-t border-white/10"></div>
                                            <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-widest text-off-white/40">OR</span>
                                            <div className="flex-grow border-t border-white/10"></div>
                                        </div>

                                        {/* WhatsApp Direct Option */}
                                        <button
                                            type="button"
                                            onClick={handleWhatsAppSubmit}
                                            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-off-white hover:text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            <MessageCircle size={15} className="text-emerald-400" />
                                            <span>Send Enquiry Directly via WhatsApp</span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default QuoteModal;
