'use client';

import { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import MembersWorkSection from './MembersWorkSection';
import ServicesSection from './ServicesSection';
import JoinSection from './JoinSection';

export default function HomepageInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    let lenis: any;
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, [isHydrated]);

  return (
    <div className="relative z-10">
      <HeroSection />
      <AboutSection />
      <MembersWorkSection />
      <ServicesSection />
      <JoinSection />
    </div>
  );
}