'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CreativityIcon,
  CommunityIcon,
  GrowthIcon,
  PurposeIcon,
  AnimatedLineArt,
} from '@/components/ui/LineArtIcons';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PhilosophyCardProps {
  title: string;
  description: string;
  lineArt: React.ReactNode;
}

function PhilosophyCard({ title, description, lineArt }: PhilosophyCardProps) {
  const circleRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(circleRef.current, { scale: 5, duration: 0.6, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(circleRef.current, { scale: 1, duration: 0.4, ease: 'power2.in' });
  };

  return (
    <div
      className="relative soft-card p-10 overflow-hidden group transition-all duration-500 hover:shadow-2xl border border-black/[0.03]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive Scaling Circle */}
      <div
        ref={circleRef}
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full transition-colors pointer-events-none"
        style={{ background: 'rgba(196, 120, 62, 0.05)' }}
      />

      <div className="relative z-10">
        {/* Line Art Icon */}
        <div className="mb-8">
          <AnimatedLineArt>
            {lineArt}
          </AnimatedLineArt>
        </div>

        <h3 className="text-2xl font-serif text-foreground mb-4 group-hover:translate-x-1 transition-transform">{title}</h3>
        <p className="text-base text-foreground/50 font-light leading-relaxed text-pretty">{description}</p>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [isHydrated, setIsHydrated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsHydrated(true); }, []);

  useEffect(() => {
    if (!isHydrated || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.principle-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isHydrated]);

  const philosophy = [
    { id: 'phil_creativity', lineArt: <CreativityIcon size={48} />, title: 'Creativity', description: 'Mastering the interplay of light and shadow to create depth, mood, and emotion in every frame.' },
    { id: 'phil_community', lineArt: <CommunityIcon size={48} />, title: 'Community', description: 'Crafting visual harmony through collaboration, sharing perspectives, and growing together.' },
    { id: 'phil_growth', lineArt: <GrowthIcon size={48} />, title: 'Growth', description: 'Every photograph tells a story of progress. We nurture skills from beginner to professional.' },
    { id: 'phil_purpose', lineArt: <PurposeIcon size={48} />, title: 'Purpose', description: 'Evoking genuine feeling through authentic moments, preserving the raw essence of human experience.' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-36 px-6 lg:px-8 bg-background border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block py-1.5 px-4 border border-foreground/15 rounded-full text-[10px] tracking-[0.2em] uppercase text-foreground/60 mb-6">
            What is ShutterSync
          </span>
          <h2 className="text-4xl md:text-6xl font-serif italic text-foreground mb-6 text-balance">
            Our Philosophy
          </h2>
          <p className="text-lg text-foreground/50 max-w-2xl mx-auto mb-8 text-pretty">
            ShutterSync is a hub for photographers to share, learn, challenge themselves, and grow together. Four pillars guide everything we do.
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-[1px] bg-foreground/10" />
            <div className="w-2 h-2 rounded-full" style={{ background: '#C4783E' }} />
            <div className="w-16 h-[1px] bg-foreground/10" />
          </div>

          {/* Learn More Link */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:translate-x-1"
            style={{ color: '#C4783E' }}
          >
            Learn More About Us
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {philosophy.map((item) => (
            <div key={item.id} className="principle-card">
              <PhilosophyCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}