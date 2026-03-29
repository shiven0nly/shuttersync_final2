'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';

export default function TermsAndConditions() {
    return (
        <main className="min-h-screen bg-background text-foreground/90 font-light leading-relaxed">
            <Header />
            
            <section className="relative pt-32 pb-20 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-serif italic mb-8">Terms & Conditions</h1>
                        <p className="text-zinc-500 text-sm uppercase tracking-widest mb-16">Last updated: March 2026</p>

                        <div className="space-y-12 prose prose-zinc max-w-none">
                            <section>
                                <h2 className="text-2xl font-serif mb-4">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing and using ShutterSync, you agree to comply with and be bound by the following terms and conditions 
                                    of use, which together with our privacy policy govern ShutterSync&apos;s relationship with you in relation 
                                    to this website and services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">2. Use of Site</h2>
                                <p>
                                    The content of the pages of this website is for your general information and use only. It is subject to change 
                                    without notice. Your use of any information or materials on this website is entirely at your own risk, 
                                    for which we shall not be liable.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">3. User Conduct</h2>
                                <p>
                                    As a member of the ShutterSync community, you agree not to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Post content that is offensive, harmful, or violates any third-party rights.</li>
                                    <li>Attempt to gain unauthorized access to our system or data.</li>
                                    <li>Use our platform for any illegal activities.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">4. Intellectual Property</h2>
                                <p>
                                    This website contains material which is owned by or licensed to us. This material includes, but is not 
                                    limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in 
                                    accordance with the copyright notice, which forms part of these terms and conditions.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">5. Governing Law</h2>
                                <p>
                                    Your use of this website and any dispute arising out of such use of the website is subject to the laws 
                                    of India.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">6. Contact Information</h2>
                                <p>
                                    For any questions regarding these Terms & Conditions, please contact us at: 
                                    <strong> contact@shuttersync.in</strong>
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
