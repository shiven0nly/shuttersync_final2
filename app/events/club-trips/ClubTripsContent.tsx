'use client';

import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function ClubTripsContent() {
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white text-[10px] font-bold uppercase tracking-widest mb-8 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                        <span>Club Trips & Expeditions</span>
                    </div>

                    {/* Big Aesthetic Coming Soon */}
                    <h1 className="text-6xl sm:text-8xl lg:text-9xl font-serif italic text-foreground mb-8 tracking-tight leading-none text-center selection:bg-orange-200">
                        Coming Soon
                    </h1>

                    <p className="text-base sm:text-lg text-foreground/50 font-light max-w-xl mb-12 leading-relaxed text-pretty">
                        We are scouting breathtaking wilderness spots, planning cozy overnight stays, and preparing guided astrophotography workshops. Get ready for an unforgettable journey.
                    </p>

                    {/* Highly Aesthetic Call to Action */}
                    <div className="w-full max-w-md soft-card p-8 border-[3px] border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 mb-4">
                            <span className="text-2xl">💬</span>
                        </div>
                        <h3 className="text-base font-black uppercase tracking-wider text-black mb-2">
                            Join WhatsApp Group
                        </h3>
                        <p className="text-xs text-slate-500 mb-6 leading-relaxed max-w-xs">
                            Get immediate updates, adventure alerts, and launch announcements directly in our group chat.
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
                    </div>
                </div>
            </div>
        </div>
    );
}
