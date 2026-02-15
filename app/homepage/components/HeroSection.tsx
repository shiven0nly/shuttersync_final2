'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const heroPhotos = [
  { src: '/scenery1.jpeg', alt: 'Mountain landscape' },
  { src: '/building_minimal.jpeg', alt: 'Urban architecture' },
  { src: '/scenery2.jpeg', alt: 'Scenic vista' },
  { src: '/girl_in_pool.jpeg', alt: 'Portrait photography' },
  { src: '/building_bnw.jpeg', alt: 'Architecture black and white' },
  { src: '/swan.jpeg', alt: 'Wildlife swan' },
  { src: '/lightPhotography1.jpeg', alt: 'Abstract light' },
  { src: '/sunset.jpeg', alt: 'Sunset scenery' },
  { src: '/food.jpeg', alt: 'Food photography' },
  { src: '/cloud1.jpeg', alt: 'Nature clouds' },
  { src: '/nightsky1.jpeg', alt: 'Starry night sky' },
  { src: '/macau.jpeg', alt: 'Macau cityscape' },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Animate photos in from scattered positions
      photosRef.current.forEach((photo, i) => {
        if (!photo) return;
        gsap.from(photo, {
          opacity: 0,
          scale: 0.6,
          y: 60,
          rotation: (Math.random() - 0.5) * 30,
          duration: 1.2,
          delay: 0.08 * i,
          ease: 'power3.out',
        });

        // Add floating animation
        gsap.to(photo, {
          y: `+=${8 + Math.random() * 8}`,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
        });
      });

      // Animate center content
      gsap.from('[data-hero-content]', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Button hover animations
      const buttons = document.querySelectorAll('.hero-btn');
      buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, { scale: 1.05, y: -4, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { scale: 1, y: 0, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mousedown', () => {
          gsap.to(btn, { scale: 0.95, duration: 0.1 });
        });
        btn.addEventListener('mouseup', () => {
          gsap.to(btn, { scale: 1.05, duration: 0.1 });
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isHydrated]);

  // Calculate arc positions for photos
  const getPhotoStyle = (index: number, total: number) => {
    const centerX = 50;
    const centerY = 50; // Lowered to avoid header overlap
    const radiusX = 45;
    const radiusY = 35;
    // Arc from about 190° to 350° (rainbow arch)
    const startAngle = 190;
    const endAngle = 350;
    const angle = startAngle + (endAngle - startAngle) * (index / (total - 1));
    const rad = (angle * Math.PI) / 180;
    const x = centerX + radiusX * Math.cos(rad);
    const y = centerY + radiusY * Math.sin(rad);
    const rotation = (index - total / 2) * 3;

    return {
      left: `${x}%`,
      top: `${y}%`,
      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
    };
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fafafa] pt-20"
    >
      {/* Background Script Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <p className="text-[12vw] md:text-[10vw] font-serif italic text-black/[0.03] whitespace-nowrap leading-none">
          these are your stories
        </p>
      </div>

      {/* Floating Photos Arc */}
      <div className="absolute inset-0 pointer-events-none">
        {heroPhotos.map((photo, i) => (
          <div
            key={i}
            ref={(el) => { photosRef.current[i] = el; }}
            className="absolute w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 pointer-events-auto"
            style={getPhotoStyle(i, heroPhotos.length)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Center Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Logo Circle */}
        <div data-hero-content className="mx-auto mb-8 w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-xl">
          <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-cover rounded-full" />
        </div>

        <p data-hero-content className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-4">
          A Photography Community
        </p>

        <h1 data-hero-content className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground leading-tight mb-6">
          Sync Your Vision
          <span className="block italic text-foreground/50">with ShutterSync</span>
        </h1>

        <p data-hero-content className="text-base md:text-lg text-foreground/50 font-light max-w-xl mx-auto mb-10 leading-relaxed">
          Share your clicks, discuss techniques, participate in weekly challenges, and connect with passionate photographers.
        </p>
          <div  data-hero-content className="flex flex-wrap items-center justify-center gap-4">
         <Link
            href="/signup"
            className="hero-btn inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.15em] hover:bg-foreground/90 transition-all shadow-lg"
          >
            Join the Community
          </Link>
          <Link
            href="/workshops/register"
            className="hero-btn inline-flex items-center gap-2 border-2 border-foreground/20 text-foreground px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.15em] hover:border-foreground/40 transition-all"
          >
            Join Workshop
          </Link>
        </div>
      </div>
    </section>
  );
}
