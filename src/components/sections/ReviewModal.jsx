import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Send, CheckCircle2 } from 'lucide-react';
import Magnetic from '../utils/Magnetic';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const ReviewModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        rating: 5,
        content: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, 'reviews'), {
                ...formData,
                status: 'pending',
                created_at: serverTimestamp()
            });

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 3000);
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Error submitting review');
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
                        className="relative w-full max-w-lg bg-graphite border border-white/10 rounded-3xl overflow-hidden"
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
                                <h2 className="text-3xl font-black">Feedback Received!</h2>
                                <p className="text-off-white/40">Your review has been submitted for moderation. Thank you!</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-center p-8 border-b border-white/5">
                                    <h2 className="text-xl font-black tracking-tight">Share Your <span className="text-accent">Experience</span></h2>
                                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors"><X /></button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-accent">Your Name</label>
                                            <input
                                                required
                                                type="text"
                                                className="form-input"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-accent">Company (Optional)</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-accent block">Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, rating: star })}
                                                    className={`p-2 transition-colors ${formData.rating >= star ? 'text-accent' : 'text-white/10'}`}
                                                >
                                                    <Star size={24} fill={formData.rating >= star ? 'currentColor' : 'none'} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-accent">Testimonial</label>
                                        <textarea
                                            required
                                            rows="4"
                                            placeholder="Write your thoughts here..."
                                            className="form-input resize-none"
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
                                                        Submit Review
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

export default ReviewModal;
