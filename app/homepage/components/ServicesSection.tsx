'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

function ServiceCard({ icon, title, description, features }: ServiceCardProps) {
  return (
    <div className="group relative soft-card p-8 hover:scale-[1.02] transition-all duration-500">
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Icon name="ArrowUpRightIcon" size={20} variant="outline" className="text-foreground/40" />
      </div>

      <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center mb-6 group-hover:bg-foreground/10 transition-colors">
        <Icon name={icon as any} size={28} variant="outline" className="text-foreground" />
      </div>

      <h3 className="text-2xl font-serif text-foreground mb-3">{title}</h3>
      <p className="text-sm text-foreground/50 font-light leading-relaxed mb-6">{description}</p>

      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={`feature_${index}`} className="flex items-center gap-2 text-xs text-foreground/40">
            <div className="w-1 h-1 rounded-full bg-foreground/30" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
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
    { id: 'activity_photowalks', icon: 'MapIcon', title: 'Photowalks', description: 'Explore hidden gems through our guided street photography walks.', features: ['Urban Exploration', 'Guided Routes', 'Social Mixers'] },
    { id: 'activity_workshops', icon: 'AcademicCapIcon', title: 'Workshops', description: 'Master your craft with peer-led technical workshops.', features: ['Lighting Masterclass', 'Post-processing', 'Gear Reviews'] },
    { id: 'activity_exhibitions', icon: 'TrophyIcon', title: 'Challenges', description: 'Compete in weekly themed challenges and showcase your best work.', features: ['Weekly Themes', 'Community Voting', 'Hall of Fame'] },
    { id: 'activity_collaborations', icon: 'UserGroupIcon', title: 'Collaborations', description: 'Find partners for creative projects and experimental shoots.', features: ['Model Networking', 'Studio Access', 'Creative Swaps'] },
    { id: 'activity_critiques', icon: 'ChatBubbleLeftRightIcon', title: 'Feedback', description: 'Grow through constructive peer reviews and portfolio critiques.', features: ['Portfolio Review', 'Editing Advice', 'Career Guidance'] },
    { id: 'activity_trips', icon: 'GlobeAltIcon', title: 'Club Trips', description: 'Join landscape and nature expeditions outside the city.', features: ['Nature Trekking', 'Overnight Stays', 'Travel Diary'] },
  ];

  return (
    <section id="services" ref={sectionRef} className="py-32 px-6 lg:px-8 bg-[#f5f5f5] border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block py-1.5 px-4 border border-foreground/15 rounded-full text-[10px] tracking-[0.2em] uppercase text-foreground/60 mb-6">
            What We Do
          </span>
          <h2 className="text-4xl md:text-6xl font-serif italic text-foreground mb-6">
            Community Activities
          </h2>
          <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
            A diverse range of activities designed to inspire, educate, and connect photographers of all levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}