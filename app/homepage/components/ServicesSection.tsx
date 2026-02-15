'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  PhotoWalksIcon,
  WorkshopsIcon,
  ChallengesIcon,
  SkillLabsIcon,
  CritiqueIcon,
  GlobalMeetsIcon,
  AnimatedLineArt,
} from '@/components/ui/LineArtIcons';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  accent: 'amber' | 'orange';
  href: string;
  lineArt: React.ReactNode;
}

function ServiceCard({ title, description, features, accent, href, lineArt }: ServiceCardProps) {
  const accentColor = accent === 'amber' ? '#C4783E' : '#E67E22';
  const stripClass = accent === 'amber' ? 'accent-strip-amber' : 'accent-strip-orange';

  return (
    <div className={`group relative soft-card p-8 ${stripClass} hover:translate-y-[-4px] transition-all duration-300 flex flex-col`}>
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Icon name="ArrowUpRightIcon" size={20} variant="outline" className="text-foreground/40" />
      </div>

      {/* Line Art Icon */}
      <div className="mb-6">
        <AnimatedLineArt>
          {lineArt}
        </AnimatedLineArt>
      </div>

      <h3 className="text-2xl font-serif text-foreground mb-3 text-balance">{title}</h3>
      <p className="text-sm text-foreground/50 font-light leading-relaxed mb-6 text-pretty">{description}</p>

      <ul className="space-y-2 mb-8">
        {features.map((feature, index) => (
          <li key={`feature_${index}`} className="flex items-center gap-2 text-xs text-foreground/40">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor, opacity: 0.5 }} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-200 group-hover:translate-x-1"
          style={{ color: accentColor }}
        >
          Join
          <Icon name="ArrowRightIcon" size={14} variant="outline" className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [isHydrated, setIsHydrated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsHydrated(true); }, []);

  useEffect(() => {
    if (!isHydrated || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isHydrated]);

  const services = [
    { lineArt: <PhotoWalksIcon size={48} />, title: 'Photowalks', description: 'Explore hidden gems through our guided street photography walks across the city.', features: ['Urban Exploration', 'Guided Routes', 'Social Mixers'], href: '/events' },
    { lineArt: <WorkshopsIcon size={48} />, title: 'Workshops', description: 'Master your craft with peer-led technical workshops and hands-on sessions.', features: ['Lighting Masterclass', 'Post-processing', 'Gear Reviews'], href: '/workshops/register' },
    { lineArt: <ChallengesIcon size={48} />, title: 'Challenges', description: 'Compete in weekly themed challenges and showcase your best work to the community.', features: ['Weekly Themes', 'Community Voting', 'Hall of Fame'], href: '/challenge' },
    { lineArt: <SkillLabsIcon size={48} />, title: 'Collaborations', description: 'Find partners for creative projects and experimental photography shoots.', features: ['Model Networking', 'Studio Access', 'Creative Swaps'], href: '/contact' },
    { lineArt: <CritiqueIcon size={48} />, title: 'Feedback', description: 'Grow through constructive peer reviews and expert portfolio critiques.', features: ['Portfolio Review', 'Editing Advice', 'Career Guidance'], href: '/contact' },
    { lineArt: <GlobalMeetsIcon size={48} />, title: 'Club Trips', description: 'Join landscape and nature expeditions outside the city with fellow photographers.', features: ['Nature Trekking', 'Overnight Stays', 'Travel Diary'], href: '/events' },
  ];

  const accentPattern: ('amber' | 'orange')[] = ['amber', 'orange', 'orange', 'amber', 'amber', 'orange'];

  return (
    <section id="services" ref={sectionRef} className="py-36 px-6 lg:px-8 bg-[#f5f5f5] border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block py-1.5 px-4 border border-foreground/15 rounded-full text-[10px] tracking-[0.2em] uppercase text-foreground/60 mb-6">
            What We Do
          </span>
          <h2 className="text-4xl md:text-6xl font-serif italic text-foreground mb-6 text-balance">
            Community Activities
          </h2>
          <p className="text-lg text-foreground/50 max-w-2xl mx-auto text-pretty">
            A diverse range of activities designed to inspire, educate, and connect photographers of all levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div key={`activity_${i}`} className="service-card">
              <ServiceCard {...service} accent={accentPattern[i]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}