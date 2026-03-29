'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';

export default function Disclaimer() {
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
                        <h1 className="text-5xl md:text-7xl font-serif italic mb-8">Disclaimer</h1>
                        <p className="text-zinc-500 text-sm uppercase tracking-widest mb-16">Last updated: March 2026</p>

                        <div className="space-y-12 prose prose-zinc max-w-none">
                            <section>
                                <h2 className="text-2xl font-serif mb-4">1. General Information</h2>
                                <p>
                                    The information provided by ShutterSync on our website and through our workshops is for general 
                                    informational purposes only. All information is provided in good faith; however, we make no 
                                    representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, 
                                    validity, reliability, availability, or completeness of any information on the site.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">2. Creative Results</h2>
                                <p>
                                    Your results in photography, videography, and creative projects may vary. Any tutorials or 
                                    advice shared through ShutterSync are based on personal and professional experiences and do 
                                    not guarantee specific artistic or financial outcomes.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">3. External Links</h2>
                                <p>
                                    Our website may contain links to external websites that are not provided or maintained by or in 
                                    any way affiliated with ShutterSync. Please note that we do not guarantee the accuracy, 
                                    relevance, timeliness, or completeness of any information on these external websites.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">4. Limitation of Liability</h2>
                                <p>
                                    Under no circumstance shall ShutterSync have any liability to you for any loss or damage of any kind incurred 
                                    as a result of the use of the site or reliance on any information provided on the site. Your use 
                                    of the site and your reliance on any information on the site is solely at your own risk.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif mb-4">5. Contact Us</h2>
                                <p>
                                    For any questions regarding this disclaimer, please contact us at: 
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
