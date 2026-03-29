'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';

export default function RefundPolicy() {
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
                        <h1 className="text-5xl md:text-7xl font-serif italic mb-8">Refund Policy</h1>
                        <p className="text-zinc-500 text-sm uppercase tracking-widest mb-16">Last updated: March 2026</p>

                        <div className="space-y-12 prose prose-zinc max-w-none">
                            <section>
                                <h2 className="text-2xl font-serif mb-4">1. Digital Products and Courses</h2>
                                <p>
                                    At ShutterSync, we strive to provide high-quality educational content. 
                                    Once access to a digital product, course, or downloadable resource is granted, 
                                    we generally do not offer refunds, as the content is immediately accessible.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">2. Workshop and Event Cancellations</h2>
                                <p>
                                    For live workshops and physical events, our cancellation policy is as follows:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li><strong>Cancellations made more than 7 days </strong> before the event: Full refund minus a processed transaction fee.</li>
                                    <li><strong>Cancellations made between 2-7 days </strong> before the event: 50% refund.</li>
                                    <li><strong>Cancellations made less than 48 hours </strong> before the event: No refund will be issued.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">3. Refund Processing</h2>
                                <p>
                                    If a refund is approved, it will be processed and automatically applied to your original method 
                                    of payment within 5-7 business days, depending on your bank or payment gateway (Razorpay).
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">4. Contact Information</h2>
                                <p>
                                    For any questions regarding our refund and cancellation policies, please reach out to: 
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
