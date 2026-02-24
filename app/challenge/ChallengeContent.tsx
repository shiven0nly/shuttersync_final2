'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import gsap from 'gsap';
import Link from 'next/link';

// No longer using individual submissions for voting

  const pastWinners = [
    { id: 1, image: '/flower1.jpeg', photographer: '', theme: 'Floral Photography', week: '' },
    { id: 2, image: '/abstract1.jpeg', photographer: '', theme: 'Different Perspective', week: '' },
    { id: 3, image: '/building_minimal.jpeg', photographer: '', theme: 'Buildings', week: '' },
    { id: 4, image: '/low-key1.jpeg', photographer: '', theme: 'Low-Key', week: '' },
    { id: 5, image: '/building_bnw.jpeg', photographer: '', theme: 'Black and White', week: '' },
    { id: 6, image: '/cloud1.jpeg', photographer: '', theme: 'Cloud', week: '' },
];

function getNextSunday() {
    const now = new Date();
    const sunday = new Date(now);
    sunday.setDate(now.getDate() + (7 - now.getDay()) % 7);
    sunday.setHours(18, 0, 0, 0);
    if (sunday <= now) sunday.setDate(sunday.getDate() + 7);
    return sunday;
}

export default function ChallengeContent() {
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const target = getNextSunday();
        const tick = () => {
            const diff = target.getTime() - Date.now();
            if (diff <= 0) return;
            setCountdown({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                minutes: Math.floor((diff % 3600000) / 60000),
                seconds: Math.floor((diff % 60000) / 1000),
            });
        };
        tick();
        const interval = setInterval(tick, 1000);

        // Animation for buttons
        const buttons = document.querySelectorAll('.challenge-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'power2.out' }));
            btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' }));
        });

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="pt-28 pb-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Current Challenge */}
                <div className="text-center mb-20">
                    <span className="inline-block py-1.5 px-4 border border-foreground/15 rounded-full text-[10px] tracking-[0.2em] uppercase text-foreground/60 mb-6">
                        Challenge of the Week
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif italic text-foreground mb-4 text-balance">
                        &ldquo;Abstract Photography&rdquo;
                    </h1>
                    <p className="text-lg text-foreground/50 max-w-2xl mx-auto mb-8 text-pretty">
                        what if a photograph didn't need to look real? Blur the lines. Break the forms.<br/><em>Play With Color, Light,Motion and perspective.</em>
                    </p>
                    <div className="flex flex-col items-center gap-6">
                        <div className="inline-flex items-center gap-2 bg-foreground/5 rounded-full px-6 py-3 text-sm text-foreground/60">
                            <Icon name="CalendarIcon" size={16} variant="outline" />
                            <span>Feb 16 — Feb 21, 2026</span>
                        </div>
                        <Link
                            href="https://chat.whatsapp.com/DdYKdvQZZhB3FV5oSi1NcR"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="challenge-btn inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-full text-sm font-semibold tracking-wide hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 transition-all shadow-md"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.78.943 3.185 1.448 4.615 1.449 5.408 0 9.811-4.403 9.813-9.812.001-2.618-1.02-5.08-2.876-6.937-1.856-1.856-4.318-2.877-6.935-2.877-5.41 0-9.813 4.403-9.813 9.813 0 1.848.511 3.141 1.482 4.814l-.982 3.586 3.696-.97zm11.233-8.084c-.3-.15-1.776-.877-2.051-.976-.275-.1-.475-.15-.675.15s-.775.976-.95 1.176-.35.225-.65.075-1.266-.467-2.411-1.485c-.893-.795-1.495-1.778-1.671-2.078s-.019-.463.131-.612c.135-.134.3-.35.45-.525s.2-.3.3-.5.05-.375-.025-.525-.775-1.875-1.063-2.564c-.28-.674-.56-.582-.768-.592-.19-.01-.41-.011-.629-.011s-.574.082-.874.407c-.3.325-1.15 1.125-1.15 2.74c0 1.615 1.175 3.177 1.338 3.397s2.31 3.527 5.594 4.945c.781.339 1.391.541 1.866.692.784.248 1.498.213 2.062.129.629-.094 1.776-.726 2.026-1.426.25-.7.25-1.3.175-1.426-.075-.125-.275-.2-.575-.35z" />
                            </svg>
                            Join WhatsApp Group
                        </Link>
                    </div>
                </div>

                {/* Previous Challenges Showcase */}
                <div className="mb-24">
                    <h2 className="text-3xl font-serif text-foreground mb-4">Previously Conducted Challenges</h2>
                    <p className="text-foreground/50 mb-10">Explore the themes that pushed our community&apos;s creativity to new heights.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pastWinners.map((winner) => (
                            <div key={winner.id} className="soft-card overflow-hidden group border border-black/5">
                                <div className="aspect-[4/3] relative overflow-hidden bg-zinc-100">
                                    <AppImage src={winner.image} alt={winner.theme}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white font-serif italic text-lg">{winner.theme}</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-serif text-foreground mb-2">{winner.theme}</h3>
                                    <p className="text-sm text-foreground/40">Photographed by Our Member</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* WhatsApp Community CTA */}
                <div className="mb-24">
                    <div className="soft-card p-8 md:p-16 text-center bg-zinc-50 border border-black/5">
                        <h2 className="text-4xl font-serif italic text-foreground mb-4">Want to participate?</h2>
                        <p className="text-foreground/50 max-w-xl mx-auto mb-10 leading-relaxed">
                            New challenges are announced and submissions are shared exclusively on our official WhatsApp community. Join the group to stay updated and showcase your work.
                        </p>

                        <Link
                            href="https://chat.whatsapp.com/DdYKdvQZZhB3FV5oSi1NcR"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="challenge-btn inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-full text-base font-semibold tracking-wide hover:brightness-110 transition-all shadow-xl"
                        >
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.78.943 3.185 1.448 4.615 1.449 5.408 0 9.811-4.403 9.813-9.812.001-2.618-1.02-5.08-2.876-6.937-1.856-1.856-4.318-2.877-6.935-2.877-5.41 0-9.813 4.403-9.813 9.813 0 1.848.511 3.141 1.482 4.814l-.982 3.586 3.696-.97zm11.233-8.084c-.3-.15-1.776-.877-2.051-.976-.275-.1-.475-.15-.675.15s-.775.976-.95 1.176-.35.225-.65.075-1.266-.467-2.411-1.485c-.893-.795-1.495-1.778-1.671-2.078s-.019-.463.131-.612c.135-.134.3-.35.45-.525s.2-.3.3-.5.05-.375-.025-.525-.775-1.875-1.063-2.564c-.28-.674-.56-.582-.768-.592-.19-.01-.41-.011-.629-.011s-.574.082-.874.407c-.3.325-1.15 1.125-1.15 2.74c0 1.615 1.175 3.177 1.338 3.397s2.31 3.527 5.594 4.945c.781.339 1.391.541 1.866.692.784.248 1.498.213 2.062.129.629-.094 1.776-.726 2.026-1.426.25-.7.25-1.3.175-1.426-.075-.125-.275-.2-.575-.35z" />
                            </svg>
                            Join the Community
                        </Link>
                    </div>
                </div>

                {/* Hall of Fame - Keep as requested */}
                <div>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-serif italic text-foreground mb-4">Past Winners</h2>
                        <p className="text-foreground/50">Celebrating those who captured the essence of previous themes.</p><br/>
                         <p   className="challenge-btn inline-flex items-center bg-[#563454] text-white px-10 py-3 rounded-full text-base font-semibold font-serif tracking-wide hover:brightness-110 transition-all shadow-xl">
                            <i>This Section Is Coming Soon</i>
                         </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
