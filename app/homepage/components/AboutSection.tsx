'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PhilosophyCardProps {
  icon: string;
  title: string;
  description: string;
}

function PhilosophyCard({ icon, title, description }: PhilosophyCardProps) {
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
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-orange-500/5 group-hover:bg-orange-500/10 transition-colors pointer-events-none"
      />

      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center mb-6 group-hover:bg-orange-500/10 transition-colors">
          <Icon name={icon as any} size={28} variant="outline" className="text-foreground group-hover:text-orange-500 transition-colors" />
        </div>
        <h3 className="text-2xl font-serif text-foreground mb-4 group-hover:translate-x-1 transition-transform">{title}</h3>
        <p className="text-base text-foreground/50 font-light leading-relaxed">{description}</p>
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
    { id: 'phil_light', icon: 'SunIcon', title: 'Light', description: 'Mastering the interplay of light and shadow to create depth, mood, and emotion in every frame.' },
    { id: 'phil_composition', icon: 'ViewfinderCircleIcon', title: 'Composition', description: 'Crafting visual harmony through thoughtful arrangement of elements, leading the eye with intention.' },
    { id: 'phil_story', icon: 'BookOpenIcon', title: 'Story', description: 'Every photograph tells a story. We capture moments that resonate, connecting viewers to the narrative.' },
    { id: 'phil_emotion', icon: 'HeartIcon', title: 'Emotion', description: 'Evoking genuine feeling through authentic moments, preserving the raw essence of human experience.' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 lg:px-8 bg-background border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block py-1.5 px-4 border border-foreground/15 rounded-full text-[10px] tracking-[0.2em] uppercase text-foreground/60 mb-6">
            What is ShutterSync
          </span>
          <h2 className="text-4xl md:text-6xl font-serif italic text-foreground mb-6">
            Our Philosophy
          </h2>
          <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
            ShutterSync is a hub for photographers to share, learn, challenge themselves, and grow together. Four pillars guide everything we do.
          </p>
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