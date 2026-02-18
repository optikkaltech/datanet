import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/utils/SEO';

const LegalPrivacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-primary min-h-screen">
            <SEO title="Privacy Policy" description="Datanet Global Limited Privacy Policy - How we handle your data in compliance with UK regulations." />
            <Navbar />

            <main className="pt-40 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <span className="text-accent text-xs font-black tracking-[0.3em] uppercase mb-4 block">Legal Documentation</span>
                        <h1 className="text-5xl md:text-7xl font-black mb-6">Privacy <span className="text-gradient-gold">Policy</span></h1>
                        <p className="text-off-white/40 text-sm">Last Updated: February 2026</p>
                    </motion.div>

                    <div className="space-y-12 text-off-white/70 font-light leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-off-white mb-4 italic">1. Introduction</h2>
                            <p>
                                At Datanet Global Limited, we are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-off-white mb-4 italic">2. Information We Collect</h2>
                            <p className="mb-4">We collect information that you provide directly to us, including:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Contact information (Name, email address, phone number)</li>
                                <li>Project details and service requirements</li>
                                <li>Communications and correspondence with us</li>
                                <li>Uploaded files for quote requests</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-off-white mb-4 italic">3. How We Use Your Information</h2>
                            <p className="mb-4">We use the collected data for various purposes:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>To provide and maintain our services</li>
                                <li>To notify you about changes to our services</li>
                                <li>To provide customer support</li>
                                <li>To gather analysis or valuable information so that we can improve our services</li>
                                <li>To process quote requests and contact form submissions</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-off-white mb-4 italic">4. Data Security</h2>
                            <p>
                                The security of your data is important to us. We implement industry-standard security measures, including encryption and secure server protocols (SSL), to protect your personal information from unauthorized access, alteration, or disclosure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-off-white mb-4 italic">5. Your Rights (GDPR Compliance)</h2>
                            <p className="mb-4">As a UK-based entity, we comply with GDPR regulations. You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access, update, or delete the information we have on you</li>
                                <li>Object to our processing of your personal data</li>
                                <li>Data portability</li>
                                <li>Withdraw consent</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-off-white mb-4 italic">6. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at:<br />
                                <span className="text-accent mt-2 block">contact@datanetglobal.co.uk</span>
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LegalPrivacy;
