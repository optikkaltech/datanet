import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    CheckCircle2,
    Building2,
    Layers,
    Clock,
    Shield,
    MessageCircle
} from 'lucide-react';
import Magnetic from '../utils/Magnetic';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Link } from 'react-router-dom';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        scope: '',
        location: 'Newcastle / North East England',
        timeline: 'Within 1-2 Weeks',
        message: '',
        agreedToTerms: true
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.agreedToTerms) {
            alert('Please accept terms and privacy policy.');
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, 'submissions'), {
                type: 'contact',
                name: formData.name,
                company: formData.company || 'Individual / Residential',
                email: formData.email,
                phone: formData.phone,
                service: formData.service,
                scope: formData.scope,
                location: formData.location,
                timeline: formData.timeline,
                message: formData.message,
                status: 'new',
                created_at: serverTimestamp()
            });

            setSuccess(true);
            setFormData({
                name: '',
                company: '',
                email: '',
                phone: '',
                service: '',
                scope: '',
                location: 'Newcastle / North East England',
                timeline: 'Within 1-2 Weeks',
                message: '',
                agreedToTerms: true
            });
            setTimeout(() => setSuccess(false), 6000);
        } catch (error) {
            console.error('Error submitting message:', error);
            alert('Error submitting message. Please try again or chat via WhatsApp.');
        } finally {
            setLoading(false);
        }
    };

    const handleWhatsAppQuickChat = () => {
        let msg = `Hello Datanet Global, I would like to get in touch regarding: *${formData.service || 'IT & Security Services'}*`;
        if (formData.name) msg += `\n- *Name:* ${formData.name}`;
        if (formData.company) msg += `\n- *Company:* ${formData.company}`;
        if (formData.scope) msg += `\n- *Scope/Units:* ${formData.scope}`;
        if (formData.location) msg += `\n- *Location:* ${formData.location}`;
        if (formData.message) msg += `\n- *Message:* ${formData.message}`;
        window.open(`https://wa.me/447586352447?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <section id="contact" className="section-padding bg-graphite/20 relative overflow-hidden border-t border-white/5">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="container mx-auto relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Contact Info Column */}
                    <div className="lg:col-span-5">
                        <span className="text-accent text-xs font-black tracking-[0.3em] uppercase mb-4 block">
                            Enterprise Support & Inquiries
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            Ready to <span className="text-gradient-gold">Upgrade</span> Your Systems?
                        </h2>
                        <p className="text-off-white/60 text-base font-light mb-12 leading-relaxed">
                            Partner with Datanet Global Limited for certified CCTV surveillance, business laptop fleets, enterprise networking, and 24/7 technical support.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-5 group">
                                <div className="w-13 h-13 bg-graphite rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-accent transition-colors shrink-0">
                                    <Mail size={22} className="text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest text-off-white/40 mb-1 font-bold">Email Us</h4>
                                    <p className="text-base font-medium text-white">contact@datanetglobal.co.uk</p>
                                </div>
                            </div>

                            <div className="flex gap-5 group">
                                <div className="w-13 h-13 bg-graphite rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-accent transition-colors shrink-0">
                                    <Phone size={22} className="text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest text-off-white/40 mb-1 font-bold">Call / WhatsApp</h4>
                                    <p className="text-base font-medium text-white">+44 7586 352447</p>
                                </div>
                            </div>

                            <div className="flex gap-5 group">
                                <div className="w-13 h-13 bg-graphite rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-accent transition-colors shrink-0">
                                    <MapPin size={22} className="text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest text-off-white/40 mb-1 font-bold">Headquarters & Service Center</h4>
                                    <p className="text-base font-medium text-white">Swinley Gardens, Newcastle Upon Tyne, United Kingdom</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick WhatsApp Card */}
                        <div className="mt-12 p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between gap-4">
                            <div>
                                <div className="text-xs font-black uppercase tracking-wider text-emerald-400">Need Immediate Help?</div>
                                <div className="text-[11px] text-off-white/60 mt-0.5">Chat directly with our on-duty technician</div>
                            </div>
                            <button
                                onClick={handleWhatsAppQuickChat}
                                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
                            >
                                <MessageCircle size={14} />
                                <span>WhatsApp</span>
                            </button>
                        </div>
                    </div>

                    {/* Expanded Contact Form Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 glass-card p-8 md:p-12 border border-white/10 rounded-3xl"
                    >
                        {success ? (
                            <div className="py-16 text-center flex flex-col items-center justify-center gap-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-primary shadow-xl shadow-accent/20"
                                >
                                    <CheckCircle2 size={36} />
                                </motion.div>
                                <h3 className="text-2xl font-black text-white">Message & Requirement Sent!</h3>
                                <p className="text-off-white/60 text-sm max-w-md">
                                    Thank you. Our technical engineering and sales team has received your project details and will be in touch with you shortly.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-black text-white">Project & Service Inquiry</h3>
                                    <p className="text-xs text-off-white/50 mt-1">
                                        Tell us about your requirements and we will prepare a bespoke solution.
                                    </p>
                                </div>

                                {/* Row 1: Full Name & Company */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-accent">
                                            Full Name <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="John Doe"
                                            className="form-input"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-accent">
                                            Company / Organization (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Acme Ltd / Residential"
                                            className="form-input"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Email & Phone Number */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-accent">
                                            Email Address <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="john@company.com"
                                            className="form-input"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-accent">
                                            Phone Number <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            required
                                            type="tel"
                                            placeholder="+44 7586 352447"
                                            className="form-input"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Row 3: Service Required & Project Scope / Fleet Size */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-accent">
                                            Service Required <span className="text-red-400">*</span>
                                        </label>
                                        <select
                                            required
                                            className="form-input bg-primary appearance-none cursor-pointer"
                                            value={formData.service}
                                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                        >
                                            <option value="">Select a service</option>
                                            <option>CCTV Installation & Maintenance</option>
                                            <option>Business Laptop Fleet Procurement (Dell/HP)</option>
                                            <option>Network Infrastructure & WiFi 6 Setup</option>
                                            <option>Managed IT Services & Cloud Support</option>
                                            <option>Access Control & Biometric Security</option>
                                            <option>Hardware Diagnostics & Component Repair</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-accent">
                                            Project Scope / Units
                                        </label>
                                        <select
                                            className="form-input bg-primary appearance-none cursor-pointer"
                                            value={formData.scope}
                                            onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                                        >
                                            <option value="">Select scope</option>
                                            <option>Residential / Home (1-4 Cameras / Single PC)</option>
                                            <option>Small Business / Office (4-8 Units)</option>
                                            <option>Commercial / Warehouse (8-24 Cameras/Laptops)</option>
                                            <option>Enterprise Fleet (25+ Units)</option>
                                            <option>Custom IT Overhaul / Consultation</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Row 4: Location & Timeline */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-accent">
                                            Location / Region
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Newcastle, Sunderland, London, etc."
                                            className="form-input"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-accent">
                                            Target Timeline
                                        </label>
                                        <select
                                            className="form-input bg-primary appearance-none cursor-pointer"
                                            value={formData.timeline}
                                            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                        >
                                            <option>Urgent / Immediate (Within 48h)</option>
                                            <option>Within 1-2 Weeks</option>
                                            <option>Within 1 Month</option>
                                            <option>Planning / Budgeting Phase</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-accent">
                                        Specific Requirements & Project Details <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        required
                                        rows="3"
                                        placeholder="Describe your site details, specific laptop models needed, camera counts, or network requirements..."
                                        className="form-input resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                {/* Terms agreement */}
                                <div className="flex items-center gap-2 pt-1">
                                    <input
                                        type="checkbox"
                                        id="contactTerms"
                                        checked={formData.agreedToTerms}
                                        onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                                        className="rounded border-white/20 text-accent focus:ring-accent cursor-pointer accent-amber-500"
                                    />
                                    <label htmlFor="contactTerms" className="text-[11px] text-off-white/60 cursor-pointer select-none">
                                        I agree to the <Link to="/terms" className="text-accent underline hover:text-accent-light">terms of service</Link> and <Link to="/privacy" className="text-accent underline hover:text-accent-light">privacy policy</Link>
                                    </label>
                                </div>

                                <Magnetic strength={0.05}>
                                    <button
                                        disabled={loading}
                                        className="btn-primary w-full group rounded-xl py-4 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <span>Submitting Project Details...</span>
                                        ) : (
                                            <>
                                                <span>Send Comprehensive Request</span>
                                                <Send size={16} className="inline-block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </Magnetic>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
