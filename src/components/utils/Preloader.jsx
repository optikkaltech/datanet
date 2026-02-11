import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Wait for all assets to be ready
        const handleLoad = () => {
            setTimeout(() => {
                setLoading(false);
            }, 1000); // Small buffer for smooth transition
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[99999] bg-primary flex flex-col items-center justify-center gap-8"
                >
                    <div className="relative w-24 h-24">
                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full rounded-full border-2 border-accent/20 p-2"
                        >
                            <img
                                src="/images/logo.jpeg"
                                alt="Datanet Logo"
                                className="w-full h-full object-contain rounded-full"
                            />
                        </motion.div>

                        {/* Spinning Ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-t-2 border-accent rounded-full"
                        />
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-accent font-black tracking-[0.5em] text-[10px] uppercase"
                        >
                            Datanet Global
                        </motion.span>
                        <div className="h-[1px] w-32 bg-white/5 relative overflow-hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 bg-accent"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
