'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Icon from '@/components/ui/AppIcon';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const admins = [
    {
        id: 1,
        name: 'Rajnish',
        role: 'Founder (ShutterSync)',
        badge: 'Founder (CEO)',
        bio: 'Ensuring smooth operations and strategic growth for the ShutterSync community behind the scenes.',
        avatar: 'R',
        photo: '/r_hs.jpeg',
    },
    {
        id: 2,
        name: 'Aquib',
        role: 'Co-Founder',
        badge: '🏆 Community Lead',
        bio: 'Passionate about building creative communities and connecting photographers across all skill levels.',
        avatar: 'A',
        photo: '/aquib.jpeg',
    },
    {
        id: 3,
        name: 'Maitri',
        role: 'Creative Director',
        badge: '🎨 Creative Director',
        bio: 'Curating visual experiences and ensuring every photo challenge sparks creativity and growth.',
        avatar: 'M',
        photo: '/matri.jpeg',
    },
    {
        id: 4,
        name: 'Sampada',
        role: 'Creative Executive',
        badge: '✨ Creative Executive',
        bio: 'Organizing photo walks, workshops, and events that bring the community together in real life.',
        avatar: 'S',
        photo: '/s_hs.jpeg',
    },
    {
        id: 5,
        name: 'Shiven',
        role: 'CTO (ShutterSync)',
        badge: '⚙️ Technical Lead',
        bio: 'Blending technology and photography to create seamless digital experiences for the community.',
        avatar: 'S',
        photo: '/s2_hs.jpg',
    },
];

export default function AboutContent() {
    const [isHydrated, setIsHydrated] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => { setIsHydrated(true); }, []);

    useEffect(() => {
        if (!isHydrated) return;

        const ctx = gsap.context(() => {
            gsap.from('[data-hero]', {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.3,
            });

            gsap.from('.reveal-text', {
                scrollTrigger: {
                    trigger: '.reveal-text',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
            });
        });

        return () => ctx.revert();
    }, [isHydrated]);

    return (
        <main className="min-h-screen bg-background overflow-x-hidden">
            <Header />
            
            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url(/scenery1.jpeg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
                </div>

                <div className="relative z-10 text-center px-6 pt-28">
                    <span data-hero className="inline-block py-1.5 px-4 border border-white/20 rounded-full text-[10px] tracking-[0.2em] uppercase text-white/70 mb-6">
                        Our Story
                    </span>
                    <h1 data-hero className="text-5xl md:text-8xl font-serif italic text-white mb-6 text-balance">
                        About ShutterSync
                    </h1>
                    <p data-hero className="text-xl text-white/60 max-w-2xl mx-auto font-light text-pretty">
                        Empowering photographers to connect, create, and grow together in a unified creative ecosystem.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section ref={contentRef} className="py-24 px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-12">
                        <div className="reveal-text">
                            <h2 className="text-4xl md:text-6xl font-serif italic text-foreground mb-8">
                                Our Mission
                            </h2>
                            <p className="text-lg md:text-2xl text-foreground/80 leading-relaxed font-light">
                                ShutterSync is more than just a platform; it&apos;s a hub for photographers and videographers 
                                to sync their vision with the world. We believe every frame tells a story, and our goal 
                                is to provide the tools, community, and education to help you tell it better.
                            </p>
                        </div>
                        
                        <div className="reveal-text">
                            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed font-light">
                                From immersive workshops and weekly challenges to our gallery of shared inspiration, 
                                ShutterSync brings everything creators need into one place. We are building a hardware-enabled 
                                SaaS ecosystem where cameras, apps, and editing tools work together effortlessly.
                            </p>
                        </div>

                        <div className="reveal-text grid md:grid-cols-2 gap-12 pt-12">
                            <div className="p-8 soft-card border border-foreground/[0.03] bg-zinc-50/50">
                                <Icon name="SparklesIcon" size={32} className="text-orange-500 mb-6" variant="outline" />
                                <h3 className="text-xl font-serif mb-4">Innovation First</h3>
                                <p className="text-foreground/60 text-sm leading-relaxed">
                                    We blend advanced hardware, intelligent software, and AI to simplify workflows and spark creativity.
                                </p>
                            </div>
                            <div className="p-8 soft-card border border-foreground/[0.03] bg-zinc-50/50">
                                <Icon name="UserGroupIcon" size={32} className="text-orange-500 mb-6" variant="outline" />
                                <h3 className="text-xl font-serif mb-4">Community Driven</h3>
                                <p className="text-foreground/60 text-sm leading-relaxed">
                                    A vibrant network where beginners and professionals learn from each other every single day.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 px-6 lg:px-8 bg-zinc-50/50 border-t border-foreground/[0.03]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 reveal-text">
                        <h2 className="text-4xl font-serif text-foreground mb-4">The Team Behind the Lens</h2>
                        <div className="w-20 h-[1px] bg-orange-500 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {admins.map((admin) => (
                            <div key={admin.id} className="reveal-text p-8 bg-white soft-card hover:translate-y-[-4px] transition-all duration-300">
                                <div className="relative w-20 h-20 mx-auto mb-6">
                                    {admin.photo ? (
                                        <Image
                                            src={admin.photo}
                                            alt={admin.name}
                                            fill
                                            className="rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-serif">
                                            {admin.avatar}
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-center mb-1">{admin.name}</h3>
                                <p className="text-xs text-orange-600 uppercase tracking-widest text-center mb-4">{admin.role}</p>
                                <p className="text-sm text-foreground/50 text-center font-light leading-relaxed">
                                    {admin.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
