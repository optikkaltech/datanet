import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import Magnetic from '../utils/Magnetic';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, 'submissions'), {
                ...formData,
                type: 'contact',
                created_at: serverTimestamp()
            });

            setSuccess(true);
            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error('Error submitting message:', error);
            alert('Error submitting message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="section-padding bg-graphite/20">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-24">
                    {/* Contact Info */}
                    <div>
                        <span className="text-accent text-xs font-black tracking-[0.3em] uppercase mb-6 block">Get In Touch</span>
                        <h2 className="text-4xl md:text-6xl font-black mb-12 leading-tight">
                            Ready to <span className="text-gradient-gold">Upgrade?</span>
                        </h2>
                        <p className="text-off-white/60 text-lg font-light mb-16 max-w-md">
                            Partner with Datanet Global Limited for secure, reliable, and scalable IT and security solutions.
                        </p>

                        <div className="space-y-10">
                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 bg-graphite rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-accent transition-colors">
                                    <Mail size={24} className="text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-off-white/40 mb-1">Email Us</h4>
                                    <p className="text-xl font-medium">contact@datanetglobal.co.uk</p>
                                </div>
                            </div>

                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 bg-graphite rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-accent transition-colors">
                                    <Phone size={24} className="text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-off-white/40 mb-1">Call Us</h4>
                                    <p className="text-xl font-medium">+447586352447</p>
                                </div>
                            </div>

                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 bg-graphite rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-accent transition-colors">
                                    <MapPin size={24} className="text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-off-white/40 mb-1">Our Office</h4>
                                    <p className="text-xl font-medium">Swinley Gardens, Newcastle Upon Tyne. United Kingdom</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 md:p-12"
                    >
                        {success ? (
                            <div className="py-20 text-center">
                                <CheckCircle2 className="mx-auto text-accent mb-6" size={64} />
                                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                <p className="text-off-white/40">We will contact you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-accent">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="John Doe"
                                            className="form-input"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-accent">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="john@company.com"
                                            className="form-input"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-accent">Phone Number</label>
                                        <input
                                            required
                                            type="tel"
                                            placeholder="+44 123 456 789"
                                            className="form-input"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-accent">Service Required</label>
                                        <select
                                            required
                                            className="form-input bg-primary appearance-none"
                                            value={formData.service}
                                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                        >
                                            <option value="">Select a service</option>
                                            <option>IT & Network Solutions</option>
                                            <option>Security & CCTV</option>
                                            <option>Managed Services</option>
                                            <option>System Repair</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-accent">Message</label>
                                    <textarea
                                        required
                                        rows="4"
                                        placeholder="Tell us about your project..."
                                        className="form-input resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <Magnetic strength={0.05}>
                                    <button disabled={loading} className="btn-primary w-full group">
                                        {loading ? 'Sending...' : (
                                            <>
                                                Send Message
                                                <Send size={18} className="inline-block ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
