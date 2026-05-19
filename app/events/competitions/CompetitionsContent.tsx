'use client';

import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CompetitionsContent() {
    return (
        <div className="pt-32 pb-24 px-6 lg:px-8 bg-gradient-to-b from-[#fafafa] to-[#f5f5f5] min-h-[calc(100vh-120px)] flex flex-col justify-between">
            <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center">
                {/* Back Link */}
                <div className="mb-12 self-start">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40 hover:text-foreground/80 transition-colors"
                    >
                        <Icon name="ArrowLeftIcon" size={12} variant="outline" />
                        Back to Events
                    </Link>
                </div>

                {/* Main Centered Content */}
                <div className="flex-1 flex flex-col items-center justify-center text-center my-auto">
                    {/* Tiny animated badge */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white text-[10px] font-bold uppercase tracking-widest mb-8 shadow-sm"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span>Photo Competition</span>
                    </motion.div>

                    {/* Big Aesthetic Coming Soon */}
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="text-6xl sm:text-8xl lg:text-9xl font-serif italic text-foreground mb-8 tracking-tight leading-none text-center selection:bg-emerald-200"
                    >
                        Coming Soon
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-base sm:text-lg text-foreground/50 font-light max-w-xl mb-12 leading-relaxed text-pretty"
                    >
                        Gear up for our upcoming themed photography competitions! Showcase your creativity, win exclusive prizes, and get your work evaluated by industry masters.
                    </motion.p>

                    {/* Highly Aesthetic Call to Action */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="w-full max-w-md soft-card p-8 border-[3px] border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl flex flex-col items-center"
                    >
                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 mb-4">
                            <span className="text-2xl">💬</span>
                        </div>
                        <h3 className="text-base font-black uppercase tracking-wider text-black mb-2">
                            Join WhatsApp Group
                        </h3>
                        <p className="text-xs text-slate-500 mb-6 leading-relaxed max-w-xs">
                            Get immediate announcements, theme reveals, and direct notifications for all upcoming photography contests in our community.
                        </p>
                        <a
                            href="https://chat.whatsapp.com/DdYKdvQZZhB3FV5oSi1NcR"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white border-[3px] border-black font-black rounded-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all uppercase text-xs tracking-widest w-full hover:bg-[#20ba59]"
                        >
                            <span>Join WhatsApp Community</span>
                            <span className="text-sm font-sans">⚡</span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
