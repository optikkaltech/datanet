import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield,
    Camera,
    Laptop,
    Wrench,
    Server,
    Wifi,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Phone,
    MessageSquare,
    MapPin,
    Cpu,
    HardDrive,
    Sparkles,
    Eye,
    ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Magnetic from '../utils/Magnetic';

const heroSlides = [
    {
        id: 'cctv-solutions',
        badge: 'SMART TECHNOLOGY • SECURE SYSTEMS',
        tagline: 'Your Security, Our Priority',
        title: 'Professional CCTV Camera Solutions',
        subtitle: 'For Homes & Businesses across Newcastle, the North East & Nationwide.',
        description: 'Keep what matters safe with our high-definition 4K CCTV systems, AI motion detection, and 24/7 smartphone remote viewing.',
        highlights: [
            { icon: <ShieldCheck size={16} className="text-accent" />, title: 'Prevent Theft', desc: 'Active deterrent before crime happens' },
            { icon: <Eye size={16} className="text-accent" />, title: 'Monitor Remotely', desc: 'Live HD feed on your phone 24/7' },
            { icon: <Camera size={16} className="text-accent" />, title: '4K Color & Night Vision', desc: 'Crisp identification day & night' },
            { icon: <HardDrive size={16} className="text-accent" />, title: 'DVR & NVR Recording', desc: 'Up to 30+ days continuous storage' }
        ],
        primaryCta: {
            text: 'Get Free CCTV Quote',
            link: 'https://wa.me/447586352447?text=Hello%20Datanet%20Global,%20I%20would%20like%20a%20free%20CCTV%20installation/security%20quote.',
            isExternal: true
        },
        secondaryAction: 'quote', // opens quote modal
        locationBadge: 'Newcastle • North East • UK-Wide',
        image: '/images/cctv.png',
        accentColor: 'from-amber-500/20 via-primary to-primary'
    },
    {
        id: 'laptop-fleet',
        badge: 'TRUSTED • TESTED • DELIVERED',
        tagline: 'Quality Laptops You Can Rely On',
        title: 'Need a Reliable Business Laptop?',
        subtitle: 'Professionally tested Dell & HP fleets for work, study, or enterprise deployment.',
        description: 'Every laptop is professionally checked, prepared, and upgraded with fast SSD storage, clean Windows 11, and full warranty coverage.',
        highlights: [
            { icon: <HardDrive size={16} className="text-accent" />, title: 'Blazing Fast SSD', desc: 'High-speed boot & reliability' },
            { icon: <Cpu size={16} className="text-accent" />, title: 'Windows 11 Pro', desc: 'Latest, secure & pre-configured' },
            { icon: <CheckCircle2 size={16} className="text-accent" />, title: 'Tested & Cleaned', desc: '100% hardware certified' },
            { icon: <Shield size={16} className="text-accent" />, title: 'Warranty Available', desc: 'Complete peace of mind' }
        ],
        specialNotice: 'Message "LAPTOP" on WhatsApp for personalized recommendation & best budget match.',
        primaryCta: {
            text: 'Browse 60+ Laptops',
            route: '/sales'
        },
        secondaryCta: {
            text: 'Message "LAPTOP"',
            link: 'https://wa.me/447586352447?text=LAPTOP',
            isExternal: true
        },
        locationBadge: 'Collection & Delivery Available',
        image: '/images/laptops/dell_latitude_7420.jpg',
        accentColor: 'from-blue-500/15 via-primary to-primary'
    },
    {
        id: 'cctv-installation',
        badge: 'EXPERT ENGINEERS • MAINTENANCE & REPAIR',
        tagline: 'Securing What Matters Most',
        title: 'CCTV Installation & Ongoing Maintenance',
        subtitle: 'Certified engineers providing clean, discreet, reliable installations.',
        description: 'From single-camera home systems to 32-channel commercial NVR networks, we handle site surveys, cable routing, cloud setup, and emergency support.',
        highlights: [
            { icon: <Wrench size={16} className="text-accent" />, title: 'High-Quality Installation', desc: 'Neat, concealed cabling & mounting' },
            { icon: <ShieldCheck size={16} className="text-accent" />, title: 'Expert Engineers', desc: 'Certified security technicians' },
            { icon: <CheckCircle2 size={16} className="text-accent" />, title: 'Servicing & Support', desc: 'Routine health audits & maintenance' },
            { icon: <MapPin size={16} className="text-accent" />, title: 'Full UK Coverage', desc: 'Rapid response in Newcastle & North East' }
        ],
        primaryCta: {
            text: 'Book Site Survey / Call',
            link: 'https://wa.me/447586352447?text=Hello%20Datanet,%20I%20want%20to%20book%20a%20CCTV%20Installation/Maintenance%20site%20survey.',
            isExternal: true
        },
        secondaryAction: 'quote',
        locationBadge: 'Call: 07586 352447',
        image: '/images/cctv_cameras.png',
        accentColor: 'from-emerald-500/15 via-primary to-primary'
    },
    {
        id: 'hp-elitebook-deals',
        badge: 'LIMITED FLEET STOCK • HIGH VALUE',
        tagline: 'Built for Business. Ready for You.',
        title: 'HP EliteBook G6 & x360 Series',
        subtitle: 'Powerful, dependable, and professionally refurbished for everyday productivity.',
        description: 'Featuring Intel Core i5/i7 8th to 12th Gen processors, 16GB/32GB RAM, Full HD IPS displays, and robust CNC aluminum chassis.',
        highlights: [
            { icon: <Cpu size={16} className="text-accent" />, title: 'Core i5 / i7 Power', desc: 'Fast multitasking for modern work' },
            { icon: <Laptop size={16} className="text-accent" />, title: '14" FHD / Touch', desc: 'Crisp anti-glare display with backlit keys' },
            { icon: <Shield size={16} className="text-accent" />, title: 'Enterprise Refurbished', desc: 'Rigorous 25-point hardware audit' },
            { icon: <Sparkles size={16} className="text-accent" />, title: 'Best Value Deals', desc: 'Unbeatable price-to-performance ratio' }
        ],
        primaryCta: {
            text: 'View HP EliteBook Stock',
            route: '/sales'
        },
        secondaryCta: {
            text: 'Order on WhatsApp',
            link: 'https://wa.me/447586352447?text=Hello%20Datanet,%20I%20would%20like%20to%20order/inquire%20about%20the%20HP%20EliteBook%20G6/x360.',
            isExternal: true
        },
        locationBadge: 'Limited Stock — Fast Dispatch',
        image: '/images/laptops/hp_elitebook_1040_x360.jpg',
        accentColor: 'from-accent/20 via-primary to-primary'
    },
    {
        id: 'managed-it-services',
        badge: 'END-TO-END IT & INFRASTRUCTURE',
        tagline: 'Smart Technology. Reliable Support. Secure Systems.',
        title: 'Integrated IT Support & Cloud Solutions',
        subtitle: 'Trusted technology partner for businesses, remote offices, and organizations.',
        description: 'Comprehensive IT managed services, Cisco network architecture, firewall protection, server administration, and rapid PC repair.',
        highlights: [
            { icon: <Server size={16} className="text-accent" />, title: 'Managed IT & Servers', desc: 'Proactive monitoring & maintenance' },
            { icon: <Wifi size={16} className="text-accent" />, title: 'Network & Cloud', desc: 'WiFi 6 mesh, SD-WAN & Office 365' },
            { icon: <ShieldCheck size={16} className="text-accent" />, title: 'Cybersecurity & Firewalls', desc: 'Zero-trust enterprise defense' },
            { icon: <Wrench size={16} className="text-accent" />, title: 'PC & Hardware Repair', desc: 'Fast component-level diagnostics' }
        ],
        primaryCta: {
            text: 'Explore IT Services',
            scrollId: 'services'
        },
        secondaryAction: 'quote',
        locationBadge: 'Trusted IT Partner',
        image: '/images/smart.png',
        accentColor: 'from-sky-500/15 via-primary to-primary'
    }
];

const Hero = ({ onOpenQuote }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(1);
    const navigate = useNavigate();

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }, []);

    const goToSlide = (index) => {
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
    };

    // Auto-advance timer (3.8 seconds for brisk, engaging pacing)
    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(() => {
            nextSlide();
        }, 3800);
        return () => clearInterval(timer);
    }, [isAutoPlaying, nextSlide]);

    const activeSlide = heroSlides[currentSlide];

    const handleAction = (action) => {
        if (action.route) {
            navigate(action.route);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (action.scrollId) {
            const el = document.getElementById(action.scrollId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else if (action.isExternal && action.link) {
            window.open(action.link, '_blank');
        }
    };

    return (
        <section
            className="relative min-h-[92vh] flex flex-col justify-between pt-28 md:pt-32 pb-12 overflow-hidden bg-primary"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* Dynamic Background Glow according to active slide */}
            <div className={`absolute inset-0 bg-gradient-to-b ${activeSlide.accentColor} opacity-50 transition-colors duration-1000 z-0 pointer-events-none`} />
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />
            
            {/* Subtle Grid Noise */}
            <div
                className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Main Content Area */}
            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 my-auto">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={activeSlide.id}
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -40 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                    >
                        {/* Left Text / Proposition Column */}
                        <div className="lg:col-span-7 flex flex-col justify-center">
                            {/* Top Badges */}
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-black tracking-[0.2em] uppercase">
                                    <Sparkles size={13} className="animate-pulse" />
                                    {activeSlide.badge}
                                </span>
                                {activeSlide.locationBadge && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-off-white/70 text-xs font-bold uppercase tracking-wider">
                                        <MapPin size={13} className="text-accent" />
                                        {activeSlide.locationBadge}
                                    </span>
                                )}
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-[1.1] tracking-tight text-white">
                                {activeSlide.title.split(' ').map((word, i) => {
                                    if (['CCTV', 'Laptop?', 'HP', 'Solutions', 'Support'].includes(word)) {
                                        return (
                                            <span key={i} className="text-gradient-gold"> {word} </span>
                                        );
                                    }
                                    return word + ' ';
                                })}
                            </h1>

                            <p className="text-accent text-base md:text-lg font-bold tracking-wide uppercase mb-3">
                                {activeSlide.tagline}
                            </p>

                            <p className="text-off-white/70 text-sm md:text-base leading-relaxed font-light mb-8 max-w-2xl">
                                {activeSlide.description}
                            </p>

                            {/* 4 Feature Highlights Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                {activeSlide.highlights.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 p-3.5 rounded-2xl bg-graphite/40 border border-white/5 backdrop-blur-md hover:border-accent/30 transition-colors"
                                    >
                                        <div className="p-2 rounded-xl bg-accent/10 shrink-0 mt-0.5">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</h4>
                                            <p className="text-[11px] text-off-white/60 leading-tight mt-0.5">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Optional Special Notice / Message "LAPTOP" */}
                            {activeSlide.specialNotice && (
                                <div className="p-3.5 mb-8 rounded-xl bg-accent/10 border border-accent/30 flex items-center gap-3 text-xs text-accent">
                                    <MessageSquare size={16} className="shrink-0" />
                                    <span>{activeSlide.specialNotice}</span>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                {activeSlide.primaryCta && (
                                    <Magnetic strength={0.1}>
                                        <button
                                            onClick={() => handleAction(activeSlide.primaryCta)}
                                            className="btn-primary rounded-xl flex items-center justify-center gap-3 group shadow-xl shadow-accent/15 cursor-pointer"
                                        >
                                            <span>{activeSlide.primaryCta.text}</span>
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </Magnetic>
                                )}

                                {activeSlide.secondaryAction === 'quote' && (
                                    <Magnetic strength={0.1}>
                                        <button
                                            onClick={onOpenQuote}
                                            className="btn-secondary rounded-xl cursor-pointer text-center"
                                        >
                                            Request Free Quote
                                        </button>
                                    </Magnetic>
                                )}

                                {activeSlide.secondaryCta && (
                                    <Magnetic strength={0.1}>
                                        <button
                                            onClick={() => handleAction(activeSlide.secondaryCta)}
                                            className="btn-secondary rounded-xl cursor-pointer text-center"
                                        >
                                            {activeSlide.secondaryCta.text}
                                        </button>
                                    </Magnetic>
                                )}
                            </div>
                        </div>

                        {/* Right Showcase Card / Visual Column */}
                        <div className="lg:col-span-5 relative flex items-center justify-center">
                            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden bg-graphite/40 border border-white/10 p-6 flex items-center justify-center shadow-2xl backdrop-blur-xl group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary via-transparent to-accent/10 opacity-70 z-10 pointer-events-none" />

                                <img
                                    src={activeSlide.image}
                                    alt={activeSlide.title}
                                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 relative z-0"
                                    onError={(e) => { e.target.src = '/images/laptop_products.png'; }}
                                />

                                {/* Floating Guarantee Tag */}
                                <div className="absolute bottom-6 left-6 right-6 z-20 p-4 rounded-2xl bg-primary/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent shrink-0">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-black uppercase tracking-wider text-white">Datanet Certified</div>
                                            <div className="text-[11px] text-off-white/60">Quality Checked & Guaranteed</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] uppercase font-bold text-accent tracking-widest">Support</div>
                                        <div className="text-xs font-mono font-bold text-white">07586 352447</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Slider Navigation & Slide Indicators */}
            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-20 mt-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
                    {/* Slide Selector Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0 custom-scrollbar">
                        {heroSlides.map((slide, idx) => {
                            const isActive = currentSlide === idx;
                            return (
                                <button
                                    key={slide.id}
                                    onClick={() => goToSlide(idx)}
                                    className={`relative overflow-hidden px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                                        isActive
                                            ? 'bg-accent text-primary shadow-lg shadow-accent/20 scale-105'
                                            : 'bg-white/5 text-off-white/60 hover:text-white hover:bg-white/10 border border-white/5'
                                    }`}
                                >
                                    <span className="font-mono text-[10px] opacity-75">0{idx + 1}</span>
                                    <span>{slide.title.split(' ')[0]} {slide.title.split(' ')[1]}</span>

                                    {/* Active Slide Timer Line */}
                                    {isActive && (
                                        <motion.div
                                            key={`progress-${currentSlide}`}
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 3.8, ease: 'linear' }}
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Prev / Next & AutoPlay Controls */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={prevSlide}
                            aria-label="Previous Slide"
                            className="p-3 rounded-xl bg-white/5 hover:bg-accent hover:text-primary text-off-white transition-all border border-white/10 cursor-pointer"
                        >
                            <ArrowLeft size={16} />
                        </button>
                        
                        {/* Slide Counter */}
                        <span className="text-xs font-mono font-bold text-off-white/60 px-2">
                            0{currentSlide + 1} / 0{heroSlides.length}
                        </span>

                        <button
                            onClick={nextSlide}
                            aria-label="Next Slide"
                            className="p-3 rounded-xl bg-white/5 hover:bg-accent hover:text-primary text-off-white transition-all border border-white/10 cursor-pointer"
                        >
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
