'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';

export default function ReturnPolicy() {
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
                        <h1 className="text-5xl md:text-7xl font-serif italic mb-8">Return Policy</h1>
                        <p className="text-zinc-500 text-sm uppercase tracking-widest mb-16">Last updated: March 2026</p>

                        <div className="space-y-12 prose prose-zinc max-w-none">
                            <section>
                                <h2 className="text-2xl font-serif mb-4">1. Digital Products and Services</h2>
                                <p>
                                    As ShutterSync primarily provides digital educational content and creative services, 
                                    most of our offerings are non-returnable and non-exchangeable once access is provided 
                                    or the service is initiated.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">2. Non-Returnable Items</h2>
                                <p>
                                    Certain types of products/services cannot be returned or refunded:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Digital course content once the account access is granted.</li>
                                    <li>Custom editing services after the project has started.</li>
                                    <li>Registration fees for live workshops after the cancellation deadline.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">3. Exceptional Cases</h2>
                                <p>
                                    If you believe you are entitled to a return in exceptional circumstances (e.g., duplicate charges, technical 
                                    failures preventing access), please reach out to us within 48 hours of your purchase.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">4. Contact Information</h2>
                                <p>
                                    To discuss any issues regarding your purchase, please contact us at: 
                                    <strong> support@shuttersync.in</strong>
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
