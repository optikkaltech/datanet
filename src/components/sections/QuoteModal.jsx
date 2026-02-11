import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2 } from 'lucide-react';
import Magnetic from '../utils/Magnetic';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const QuoteModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        budget: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Save data to Firestore (without file_path)
            await addDoc(collection(db, 'submissions'), {
                type: 'quote',
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                service: formData.service,
                message: formData.message,
                budget: formData.budget,
                created_at: serverTimestamp()
            });

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-primary/90 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-graphite border border-white/10 rounded-3xl overflow-hidden"
                    >
                        {success ? (
                            <div className="p-20 text-center flex flex-col items-center gap-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-primary"
                                >
                                    <CheckCircle2 size={40} />
                                </motion.div>
                                <h2 className="text-3xl font-black">Request Sent!</h2>
                                <p className="text-off-white/40">We'll get back to you with a professional quote shortly.</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-center p-8 border-b border-white/5">
                                    <h2 className="text-2xl font-black tracking-tight">Request a <span className="text-accent">Quote</span></h2>
                                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors"><X /></button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-accent">Full Name</label>
                                            <input
                                                required
                                                type="text"
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
                                                className="form-input"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-accent">Phone (Optional)</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-accent">Service</label>
                                            <select
                                                required
                                                className="form-input appearance-none bg-primary"
                                                value={formData.service}
                                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                            >
                                                <option value="">Select Service</option>
                                                <option>IT & Network Solutions</option>
                                                <option>Security & CCTV</option>
                                                <option>Managed Services</option>
                                                <option>System Repair</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-accent">Budget Range</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. $5k - $10k"
                                            className="form-input"
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-accent">Project Details</label>
                                        <textarea
                                            required
                                            rows="4"
                                            className="form-input resize-none"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <Magnetic strength={0.05}>
                                            <button
                                                disabled={loading}
                                                className="btn-primary w-full group flex items-center justify-center gap-4 py-5"
                                            >
                                                {loading ? 'Processing...' : (
                                                    <>
                                                        Submit Request
                                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </Magnetic>
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default QuoteModal;
