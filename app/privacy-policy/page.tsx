'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
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
                        <h1 className="text-5xl md:text-7xl font-serif italic mb-8">Privacy Policy</h1>
                        <p className="text-zinc-500 text-sm uppercase tracking-widest mb-16">Last updated: March 2026</p>

                        <div className="space-y-12 prose prose-zinc max-w-none">
                            <section>
                                <h2 className="text-2xl font-serif mb-4">1. Introduction</h2>
                                <p>
                                    Welcome to ShutterSync. We respect your privacy and are committed to protecting your personal data. 
                                    This privacy policy will inform you about how we look after your personal data when you visit our website 
                                    and tell you about your privacy rights and how the law protects you.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">2. The Data We Collect</h2>
                                <p>
                                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                                    <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                                    <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                                    <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">3. How We Use Your Data</h2>
                                <p>
                                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>To register you as a new customer.</li>
                                    <li>To process and deliver your order including: (a) Manage payments, fees and charges; (b) Collect and recover money owed to us.</li>
                                    <li>To manage our relationship with you which will include: (a) Notifying you about changes to our terms or privacy policy; (b) Asking you to leave a review or take a survey.</li>
                                    <li>To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">4. Payment Processing</h2>
                                <p>
                                    We use third-party payment processors (such as Razorpay) to process payments made through the website. 
                                    In connection with the processing of such payments, we do not retain any personally identifiable information 
                                    or any financial information such as credit card numbers. Rather, all such information is provided directly 
                                    to our third-party processor, whose use of your personal information is governed by their privacy policy.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">5. Contact Us</h2>
                                <p>
                                    If you have any questions about this privacy policy or our privacy practices, please contact us at: 
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
