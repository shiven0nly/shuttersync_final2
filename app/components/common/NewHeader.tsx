'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, SignOutButton } from '@clerk/nextjs';
import gsap from 'gsap';
import { ParticleButton } from '@/components/ui/particle-button';

export default function NewHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const menuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
    { label: 'Challenge', href: '/challenge' },
    { label: 'Events', href: '/events' },
    { label: 'Contact', href: '/contact' },
    { label: 'Admin', href: '/admin' },
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu animations
  useEffect(() => {
    if (!menuRef.current) return;

    const overlay = menuRef.current.querySelector('.menu-overlay');
    const menuContent = menuRef.current.querySelector('.menu-content');
    const menuLinks = menuRef.current.querySelectorAll('.menu-link');
    const authSection = menuRef.current.querySelector('.auth-section');

    if (isMenuOpen) {
      // Open animation
      gsap.set(menuRef.current, { display: 'block' });
      
      const tl = gsap.timeline();
      tl.fromTo(overlay, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3 }
      )
      .fromTo(menuContent,
        { x: '100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out' },
        '<'
      )
      .fromTo(menuLinks,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(authSection,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3 },
        '-=0.2'
      );
    } else {
      // Close animation
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(menuRef.current, { display: 'none' });
        }
      });
      
      tl.to(menuLinks, { opacity: 0, y: -20, duration: 0.2, stagger: 0.03 })
        .to(authSection, { opacity: 0, duration: 0.2 }, '<')
        .to(menuContent, { x: '100%', duration: 0.4, ease: 'power3.in' }, '<')
        .to(overlay, { opacity: 0, duration: 0.3 }, '<');
    }
  }, [isMenuOpen]);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="text-2xl font-serif font-semibold tracking-tight text-foreground hover:opacity-70 transition-opacity"
            >
              ShutterSync
            </Link>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-foreground/90 transition-colors"
              aria-label="Open menu"
            >
              <span>Menu</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[100] hidden"
        style={{ display: 'none' }}
      >
        {/* Overlay */}
        <div
          className="menu-overlay absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="menu-content absolute top-0 right-0 bottom-0 w-full max-w-md bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl overflow-y-auto">
          <div className="relative h-full flex flex-col p-8">
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col justify-center space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`menu-link group relative px-6 py-4 text-4xl font-serif italic transition-all duration-300 hover:translate-x-2 ${
                      isActive
                        ? 'text-yellow-300'
                        : 'text-white hover:text-yellow-200'
                    }`}
                  >
                    {link.label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-yellow-300 transition-all duration-300 group-hover:h-full rounded-r" />
                  </Link>
                );
              })}
            </nav>

            {/* Auth Section */}
            <div className="auth-section pt-6 border-t border-white/20">
              {isLoaded && user ? (
                <SignOutButton redirectUrl="/">
                  <ParticleButton
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full justify-center bg-white text-foreground rounded-full text-sm font-semibold uppercase tracking-wider"
                    size="lg"
                  >
                    Logout
                  </ParticleButton>
                </SignOutButton>
              ) : isLoaded ? (
                <Link
                  href="/sign-in"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ParticleButton className="w-full justify-center bg-white text-foreground rounded-full text-sm font-semibold uppercase tracking-wider" size="lg">
                    Sign In
                  </ParticleButton>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
