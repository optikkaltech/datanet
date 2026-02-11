import React from 'react';
import { motion } from 'framer-motion';

const industries = [
    "Corporate organisations",
    "Educational institutions",
    "Government agencies",
    "Healthcare facilities",
    "SMEs and startups",
    "Residential clients"
];

const Industries = () => {
    return (
        <section className="py-12 bg-accent/5 border-y border-white/5 overflow-hidden">
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="flex gap-24 items-center"
                >
                    {Array(4).fill(industries).flat().map((industry, i) => (
                        <span
                            key={i}
                            className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-white/10 hover:text-accent/40 transition-colors cursor-default"
                        >
                            {industry}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Industries;
