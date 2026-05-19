'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from './HeroSection';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Lazy load non-critical sections
const AboutSection = dynamic(() => import('./AboutSection'), {
  loading: () => <div className="h-screen" />,
});
const MembersWorkSection = dynamic(() => import('./MembersWorkSection'), {
  loading: () => <div className="h-screen" />,
});
const ServicesSection = dynamic(() => import('./ServicesSection'), {
  loading: () => <div className="h-screen" />,
});
const JoinSection = dynamic(() => import('./JoinSection'), {
  loading: () => <div className="h-screen" />,
});

export default function HomepageInteractive() {
  const pathname = usePathname();
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

    // Delay Lenis initialization to prioritize critical content
    const timer = setTimeout(initLenis, 100);

    return () => {
      clearTimeout(timer);
      if (lenis) lenis.destroy();
    };
  }, [isHydrated]);

  return (
    <>
    {/* Marquee Announcement Bar */}
        {pathname === '/' && (
          <div className="w-full h-8 bg-[#FFE500] border-b-2 z-50 border-black overflow-hidden relative flex items-center">
            <style>{`
              @keyframes headerMarquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .animate-header-marquee {
                display: flex;
                animation: headerMarquee 30s linear infinite;
              }
            `}</style>
            <Link href="/workshops/lightroom-mastery" className="w-full flex items-center hover:opacity-90">
              <div className="animate-header-marquee flex whitespace-nowrap">
                <span className="text-[10px] font-black uppercase tracking-widest text-black flex shrink-0 items-center gap-6 mr-6">
                  <span>⚡ JOIN THE LIGHTROOM MASTERY WORKSHOP NOW - LAST DAY TO REGISTER 23 MAY</span> <span>★</span>
                  <span>⚡ JOIN THE LIGHTROOM MASTERY WORKSHOP NOW - LAST DAY TO REGISTER 23 MAY</span> <span>★</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-black flex shrink-0 items-center gap-6 mr-6">
                  <span>⚡ JOIN THE LIGHTROOM MASTERY WORKSHOP NOW - LAST DAY TO REGISTER 23 MAY</span> <span>★</span>
                  <span>⚡ JOIN THE LIGHTROOM MASTERY WORKSHOP NOW - LAST DAY TO REGISTER 23 MAY</span> <span>★</span>
                </span>
              </div>
            </Link>
          </div>
        )}
    <div className="relative z-10">
      <HeroSection />
      <AboutSection />
      <MembersWorkSection />
      <ServicesSection />
      <JoinSection />
    </div>
    </>
  );
}