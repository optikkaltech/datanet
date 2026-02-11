import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Plus } from 'lucide-react';
import ReviewModal from './ReviewModal';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Real-time listener for approved reviews from Firestore
        const q = query(
            collection(db, 'reviews'),
            where('status', '==', 'approved'),
            orderBy('created_at', 'desc')
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const reviewsData = [];
            querySnapshot.forEach((doc) => {
                reviewsData.push({ id: doc.id, ...doc.data() });
            });
            setReviews(reviewsData);
            setLoading(false);
        }, (error) => {
            console.error('Firestore Fetch Error:', error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Featured reviews for authority + dynamic approved reviews
    const featuredReviews = [
        {
            content: "Datanet Global transformed our infrastructure overnight. Their technical expertise is unparalleled in the region.",
            name: "Engr. David Okpara",
            company: "CTO, Lagos Tech Hub"
        },
        {
            content: "The level of security and peace of mind we have now is exactly what we were looking for. Highly recommended.",
            name: "Sarah Johnson",
            company: "Managing Director, Peak Solutions"
        }
    ];

    // Combine dynamic reviews with featured ones
    const displayReviews = [...reviews, ...featuredReviews].slice(0, 4);

    return (
        <section className="section-padding relative">
            <div className="absolute top-0 right-0 p-24 opacity-[0.03] select-none pointer-events-none">
                <Quote size={400} className="text-accent" />
            </div>

            <div className="container mx-auto relative z-10">
                <div className="flex justify-between items-center mb-16 px-4 md:max-w-4xl md:mx-auto">
                    <h2 className="text-3xl font-black italic">Clients <span className="text-accent">Speak</span></h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-off-white/40 hover:text-accent transition-colors"
                    >
                        <Plus size={16} /> Share Feedback
                    </button>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                        {loading ? (
                            // Skeleton Screens
                            [1, 2, 3, 4].map((n) => (
                                <div key={n} className="flex flex-col gap-8 p-8 rounded-2xl bg-white/[0.01] border border-white/5 animate-pulse">
                                    <div className="w-12 h-1 bg-white/5" />
                                    <div className="space-y-4">
                                        <div className="h-6 bg-white/5 rounded w-full" />
                                        <div className="h-6 bg-white/5 rounded w-5/6" />
                                    </div>
                                    <div className="space-y-2 pt-4">
                                        <div className="h-4 bg-white/5 rounded w-1/3" />
                                        <div className="h-3 bg-white/5 rounded w-1/4" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            displayReviews.map((t, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: i * 0.2 }}
                                    className="flex flex-col gap-8 p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500"
                                >
                                    <div className="w-12 h-1 bg-accent" />
                                    <p className="text-2xl md:text-3xl font-light italic leading-relaxed text-off-white/80">
                                        "{t.content}"
                                    </p>
                                    <div>
                                        <h4 className="text-lg font-bold text-accent tracking-wide">{t.name}</h4>
                                        <p className="text-sm text-off-white/40 uppercase tracking-widest">{t.company}</p>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                {/* Client Logos / Trust Signals */}
                <div className="mt-32 pt-16 border-t border-white/5 flex flex-wrap justify-center gap-16 md:gap-32 grayscale opacity-40 hover:grayscale-0 transition-all duration-700">
                    {['CISCO', 'SAMSUNG', 'DELL', 'DAHUA', 'HIKVISION'].map(brand => (
                        <span key={brand} className="text-xl font-black tracking-tighter">{brand}</span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
