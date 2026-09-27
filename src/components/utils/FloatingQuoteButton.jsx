import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText } from 'lucide-react';

const FloatingQuoteButton = ({ onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="fixed bottom-6 right-6 z-40 hidden sm:block"
        >
            <button
                onClick={onClick}
                className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-accent text-primary font-black text-xs uppercase tracking-widest shadow-2xl shadow-accent/40 hover:bg-accent-light hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 cursor-pointer"
            >
                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <FileText size={16} className="shrink-0" />
                <span>Request a Quote</span>
                <span className="p-1 rounded-full bg-primary/10 text-primary group-hover:rotate-12 transition-transform">
                    <Sparkles size={13} />
                </span>
            </button>
        </motion.div>
    );
};

export default FloatingQuoteButton;
