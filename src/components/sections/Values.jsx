import React from 'react';
import { motion } from 'framer-motion';

const values = [
    { title: "Reliability", desc: "Unyielding uptime and consistency in every deployment." },
    { title: "Innovation", desc: "Pushing boundaries with cutting-edge tech integration." },
    { title: "Customer-Centric", desc: "Tailored solutions built around your specific needs." },
    { title: "Technical Excellence", desc: "Certified expertise meeting global industry standards." }
];

const Values = () => {
    return (
        <section className="section-padding bg-black">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-4 gap-12">
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center md:text-left group"
                        >
                            <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4 block group-hover:tracking-[0.6em] transition-all duration-500">
                                0{i + 1}
                            </span>
                            <h3 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors">{v.title}</h3>
                            <p className="text-sm text-off-white/40 leading-relaxed max-w-[200px] mx-auto md:mx-0">
                                {v.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Values;
