import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart3,
    MessageSquare,
    FileText,
    User,
    Check,
    X,
    Download,
    LogOut,
    ChevronRight,
    Filter,
    Calendar,
    Menu
} from 'lucide-react';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import SEO from '../components/utils/SEO';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('submissions');
    const [submissions, setSubmissions] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true);
                const subUnsubscribe = startSubmissionsListener();
                const revUnsubscribe = startReviewsListener();
                setLoading(false);
                return () => {
                    subUnsubscribe();
                    revUnsubscribe();
                };
            } else {
                setIsAuth(false);
                setLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    const startSubmissionsListener = () => {
        const q = query(collection(db, 'submissions'), orderBy('created_at', 'desc'));
        return onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSubmissions(data);
        });
    };

    const startReviewsListener = () => {
        const q = query(collection(db, 'reviews'), orderBy('created_at', 'desc'));
        return onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setReviews(data);
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
        } catch (error) {
            console.error('Login Error:', error);
            alert('Invalid credentials or Firebase Auth not configured properly.');
        }
    };

    const handleReviewAction = async (id, status) => {
        try {
            const reviewRef = doc(db, 'reviews', id);
            await updateDoc(reviewRef, { status });
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    if (loading) return <div className="min-h-screen bg-primary flex items-center justify-center text-accent">Loading...</div>;

    if (!isAuth) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-graphite border border-white/5 rounded-3xl p-10"
                >
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black mb-2">Admin <span className="text-accent">Portal</span></h1>
                        <p className="text-off-white/40 text-sm italic">Protected management interface</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-accent">Email Address</label>
                            <input
                                required
                                type="email"
                                className="form-input"
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-accent">Password</label>
                            <input
                                required
                                type="password"
                                className="form-input"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            />
                        </div>
                        <button className="btn-primary w-full py-5">Login to Dashboard</button>
                    </form>
                </motion.div>
            </div>
        );
    }

    const NavItems = () => (
        <>
            <div className="flex items-center gap-3 mb-10 md:mb-16">
                <div className="w-10 h-10">
                    <img
                        src="/images/logo.jpeg"
                        alt="Datanet Logo"
                        className="w-full h-full object-contain rounded-full border border-accent/20"
                    />
                </div>
                <span className="font-bold tracking-tighter text-lg uppercase">Datanet <span className="text-accent">Admin</span></span>
            </div>

            <nav className="space-y-4 flex-1">
                {[
                    { id: 'submissions', icon: BarChart3, label: 'Submissions' },
                    { id: 'reviews', icon: MessageSquare, label: 'Review Moderation' },
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                            setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${activeTab === item.id ? 'bg-accent text-primary' : 'hover:bg-white/5 text-off-white/40'
                            }`}
                    >
                        <item.icon size={20} />
                        <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                    </button>
                ))}
            </nav>

            <button onClick={handleLogout} className="mt-auto flex items-center gap-4 px-4 py-4 text-off-white/20 hover:text-red-500 transition-colors uppercase text-[10px] font-black tracking-widest">
                <LogOut size={16} /> Logout Session
            </button>
        </>
    );

    return (
        <div className="min-h-screen bg-primary flex flex-col md:flex-row">
            <SEO title="Admin Console" robots="noindex, nofollow" />

            {/* Desktop Sidebar */}
            <div className="hidden md:flex w-72 border-r border-white/5 p-8 flex-col sticky top-0 h-screen">
                <NavItems />
            </div>

            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-primary/80 backdrop-blur-md z-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8">
                        <img src="/images/logo.jpeg" alt="Logo" className="w-full h-full rounded-full" />
                    </div>
                    <span className="font-black text-sm uppercase tracking-tighter">Datanet <span className="text-accent">Admin</span></span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-accent"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 1 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="fixed inset-0 z-40 bg-primary p-8 flex flex-col md:hidden"
                    >
                        <NavItems />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 p-6 md:p-12 overflow-y-auto">
                <header className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black capitalize mb-2">{activeTab.replace('-', ' ')}</h2>
                        <p className="text-off-white/40 text-xs md:text-sm">Real-time data from datanetglobal.com.uk</p>
                    </div>
                    <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-50 whitespace-nowrap"><Calendar size={14} /> Last 30 Days</button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-50 whitespace-nowrap"><Filter size={14} /> Filter</button>
                    </div>
                </header>

                {activeTab === 'submissions' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
                            {[
                                { label: 'Total Requests', val: submissions.length },
                                { label: 'Quotes', val: submissions.filter(s => s.type === 'quote').length },
                                { label: 'General', val: submissions.filter(s => s.type === 'contact').length }
                            ].map(stat => (
                                <div key={stat.label} className="bg-graphite p-6 rounded-2xl border border-white/5">
                                    <p className="text-[10px] uppercase font-black tracking-widest text-accent mb-2">{stat.label}</p>
                                    <p className="text-2xl md:text-3xl font-black">{stat.val}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-graphite rounded-3xl border border-white/5 overflow-hidden">
                            <div className="overflow-x-auto scrollbar-hide">
                                <table className="w-full text-left min-w-[800px]">
                                    <thead className="bg-black/20 text-[10px] font-black uppercase tracking-[0.2em] text-off-white/30">
                                        <tr>
                                            <th className="p-6">Type</th>
                                            <th className="p-6">Name</th>
                                            <th className="p-6">Email / Phone</th>
                                            <th className="p-6">Service / Budget</th>
                                            <th className="p-6">Project Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {submissions.map(sub => (
                                            <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="p-6">
                                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${sub.type === 'quote' ? 'bg-accent/20 text-accent' : 'bg-blue-500/20 text-blue-400'
                                                        }`}>
                                                        {sub.type}
                                                    </span>
                                                </td>
                                                <td className="p-6 font-bold">{sub.name}</td>
                                                <td className="p-6">
                                                    <div className="text-sm">{sub.email}</div>
                                                    <div className="text-xs text-off-white/20">{sub.phone || 'N/A'}</div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="text-sm text-accent font-medium">{sub.service || 'General Inquiry'}</div>
                                                    <div className="text-[10px] text-off-white/40">{sub.budget || '-'}</div>
                                                </td>
                                                <td className="p-6">
                                                    <p className="text-xs text-off-white/60 max-w-xs line-clamp-2 hover:line-clamp-none transition-all cursor-pointer">
                                                        {sub.message}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="grid gap-6">
                        {reviews.map(review => (
                            <div key={review.id} className="bg-graphite p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row items-start justify-between gap-6">
                                <div className="max-w-2xl w-full">
                                    <div className="flex items-center justify-between md:justify-start gap-4 mb-4">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${review.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                            review.status === 'rejected' ? 'bg-red-500/20 text-red-500' : 'bg-orange-500/20 text-orange-400'
                                            }`}>
                                            {review.status}
                                        </span>
                                        <div className="flex text-accent">
                                            {[...Array(review.rating)].map((_, i) => <Check key={i} size={14} fill="currentColor" />)}
                                        </div>
                                    </div>
                                    <p className="text-lg md:text-xl font-light italic mb-6">"{review.content}"</p>
                                    <div>
                                        <h4 className="font-bold">{review.name}</h4>
                                        <p className="text-[10px] md:text-xs text-off-white/40 uppercase tracking-widest">{review.company || 'Private User'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 w-full md:w-auto">
                                    {review.status !== 'approved' && (
                                        <button
                                            onClick={() => handleReviewAction(review.id, 'approved')}
                                            className="flex-1 md:w-12 md:h-12 py-3 md:py-0 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center hover:bg-green-500 hover:text-white transition-all"
                                        >
                                            <Check size={20} />
                                        </button>
                                    )}
                                    {review.status !== 'rejected' && (
                                        <button
                                            onClick={() => handleReviewAction(review.id, 'rejected')}
                                            className="flex-1 md:w-12 md:h-12 py-3 md:py-0 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
