'use client';

import { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TestimonialCardProps {
  image: string;
  alt: string;
  quote: string;
  name: string;
  role: string;
}

function TestimonialCard({ image, alt, quote, name, role }: TestimonialCardProps) {
  return (
    <div className="shrink-0 w-[350px] md:w-[450px] snap-center">
      <div className="soft-card p-8 h-full">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 shadow-md">
            <AppImage src={image} alt={alt} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-foreground mb-1">{name}</h4>
            <p className="text-xs text-foreground/40 uppercase tracking-wider">{role}</p>
          </div>
        </div>
        <blockquote className="text-base text-foreground/60 font-light leading-relaxed italic">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [isHydrated, setIsHydrated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsHydrated(true); }, []);

  useEffect(() => {
    if (!isHydrated || !sectionRef.current || !scrollContainerRef.current) return;
    const ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;
      const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      gsap.to(scrollContainer, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 20%',
          end: `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
        x: -scrollWidth,
        ease: 'none',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isHydrated]);

  const testimonials = [
    { id: 'member_elena', image: '/logo.jpeg', alt: 'Elena Martinez', quote: 'Joining ShutterSync was the best decision for my photography journey. The collective growth and shared passion here are truly inspiring.', name: 'Elena Martinez', role: 'Landscape Photographer' },
    { id: 'member_michael', image: '/logo.jpeg', alt: 'Michael Chen', quote: 'I came for the gear tips and stayed for the community. The photowalks have completely changed how I see the city through my lens.', name: 'Michael Chen', role: 'Street Photographer' },
    { id: 'member_sophia', image: '/logo.jpeg', alt: 'Sophia Rodriguez', quote: 'Being part of this collective has given me the confidence to showcase my work. The feedback sessions are invaluable.', name: 'Sophia Rodriguez', role: 'Portrait Artist' },
    { id: 'member_james', image: '/logo.jpeg', alt: 'James Wilson', quote: "ShutterSync isn't just a club—it's a family of creatives. Every meetup is an opportunity to learn something new.", name: 'James Wilson', role: 'Documentary Photographer' },
    { id: 'member_aisha', image: '/logo.jpeg', alt: 'Aisha Kumar', quote: "The collaborative energy here is unmatched. I've grown more in six months with the club than in years on my own.", name: 'Aisha Kumar', role: 'Architectural Photographer' },
  ];

  return (
    <section id="stories" ref={sectionRef} className="py-32 overflow-hidden bg-background border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-foreground/20" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/40">Member Spotlight</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif italic text-foreground">
              What our members say
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollContainerRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full soft-card flex items-center justify-center hover:bg-foreground/5 transition-all"
              aria-label="Previous"
            >
              <Icon name="ChevronLeftIcon" size={20} variant="outline" className="text-foreground" />
            </button>
            <button
              onClick={() => scrollContainerRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full soft-card flex items-center justify-center hover:bg-foreground/5 transition-all"
              aria-label="Next"
            >
              <Icon name="ChevronRightIcon" size={20} variant="outline" className="text-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 px-6 lg:px-8 overflow-x-auto no-scrollbar snap-x snap-mandatory"
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>
    </section>
  );
}