'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { RippleButton } from '@/components/ui/ripple-button';
import { RevealText } from '@/components/ui/reveal-text';

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
  const { user, isLoaded } = useUser();
  const router = useRouter();

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
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, 120px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Center Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Logo Circle */}
        <div data-hero-content className="mx-auto mb-8 w-24 h-24 relative rounded-full bg-orange-500 flex items-center justify-center shadow-xl overflow-hidden">
          <Image src="/logo.jpeg" alt="ShutterSync Logo" fill sizes="96px" className="object-cover" />
        </div>

        <p data-hero-content className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-4">
          A Photography Community
        </p>

        <div data-hero-content className="mb-6">
          <RevealText
            text="SHUTTERSYNC"
            textColor="text-foreground"
            overlayColor="text-orange-500"
            fontSize="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px]"
            letterDelay={0.08}
            overlayDelay={0.05}
            overlayDuration={0.4}
            springDuration={600}
            letterImages={[
              '/scenery1.jpeg',
              '/building_minimal.jpeg',
              '/scenery2.jpeg',
              '/girl_in_pool.jpeg',
              '/building_bnw.jpeg',
              '/swan.jpeg',
              '/lightPhotography1.jpeg',
              '/sunset.jpeg',
              '/food.jpeg',
              '/cloud1.jpeg',
              '/nightsky1.jpeg',
            ]}
          />
        </div>

        <p data-hero-content className="text-base md:text-lg text-foreground/50 font-light max-w-xl mx-auto mb-10 leading-relaxed text-pretty">
          Share your clicks, discuss techniques, participate in weekly challenges, and connect with passionate photographers.
        </p>
        <div data-hero-content className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/gallery">
            <RippleButton className="min-w-[200px] px-10 py-4 text-[15px] font-medium rounded-full text-white bg-orange-600 border-none hover:bg-orange-700 shadow-lg shadow-orange-600/30">
              Start Exploring
            </RippleButton>
          </Link>
          <Link href="/workshops/lightroom-mastery">
            <RippleButton className="min-w-[200px] px-10 py-4 text-[15px] font-medium rounded-full bg-white text-black border border-black/5 shadow-sm hover:bg-black/5 hover:text-black transition-colors">
              Join Workshop
            </RippleButton>
          </Link>
        </div>
      </div>


    </section>
  );
}
