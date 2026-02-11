import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/utils/SEO';

const LegalTerms = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-primary min-h-screen">
            <SEO title="Terms of Service" description="Datanet Global Limited Terms of Service - The agreement governing the use of our IT and security services." />
            <Navbar />

            <main className="pt-40 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <span className="text-accent text-xs font-black tracking-[0.3em] uppercase mb-4 block">Legal Documentation</span>
                        <h1 className="text-5xl md:text-7xl font-black mb-6">Terms of <span className="text-gradient-gold">Service</span></h1>
                        <p className="text-off-white/40 text-sm">Last Updated: February 2026</p>
                    </motion.div>

                    <div className="space-y-12 text-off-white/70 font-light leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-off-white mb-4 italic">1. Agreement to Terms</h2>
                            <p>
                                By accessing or using the services provided by Datanet Global Limited ("Company", "we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree to all these terms, then you may not access the website or use any services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-off-white mb-4 italic">2. Use of Services</h2>
                            <p className="mb-4">Our services include but are not limited to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>IT Infrastructure and Networking</li>
                                <li>Security and CCTV Surveillance Systems</li>
                                <li>Managed IT Support and Maintenance</li>
                                <li>Hardware Sales and Repairs</li>
                            </ul>
                            <p className="mt-4">
                                You agree to use these services only for lawful purposes and in accordance with these Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-off-white mb-4 italic">3. Intellectual Property</h2>
                            <p>
                                All content, features, and functionality on this website, including but not limited to text, graphics, logos, images, and software, are the property of Datanet Global Limited and are protected by international copyright, trademark, and other intellectual property laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-off-white mb-4 italic">4. Service Quotes and Contracts</h2>
                            <p>
                                Any quotes provided through the website are estimates only and do not constitute a binding contract. A formal service agreement will be provided and must be signed by both parties before the commencement of any project.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-off-white mb-4 italic">5. Limitation of Liability</h2>
                            <p>
                                In no event shall Datanet Global Limited, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-off-white mb-4 italic">6. Governing Law</h2>
                            <p>
                                These Terms shall be governed and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-off-white mb-4 italic">7. Changes to Terms</h2>
                            <p>
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LegalTerms;
