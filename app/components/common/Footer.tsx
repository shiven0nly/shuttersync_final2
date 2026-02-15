'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useEffect } from 'react';
import gsap from 'gsap';

export default function Footer() {
  const currentYear = 2026;

  const footerLinks = [
    { id: 'footer_gallery', label: 'Gallery', href: '/gallery' },
    { id: 'footer_challenge', label: 'Challenge', href: '/challenge' },
    { id: 'footer_events', label: 'Events', href: '/events' },
    { id: 'footer_contact', label: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { id: 'social_whatsapp', icon: 'ChatBubbleLeftRightIcon', href: 'https://chat.whatsapp.com/DdYKdvQZZhB3FV5oSi1NcR', label: 'WhatsApp' },
    { id: 'social_instagram', icon: 'CameraIcon', href: 'https://www.instagram.com/shuttersync_official/', label: 'Instagram' },
    { id: 'social_facebook', icon: 'GlobeAltIcon', href: 'http://www.facebook.com/share/1EjenyXb1s', label: 'Facebook' },
  ];

  useEffect(() => {
    const buttons = document.querySelectorAll('.footer-btn');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'power2.out' }));
      btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' }));
    });
  }, []);

  return (
    <footer className="relative overflow-hidden">
      {/* CreateAnything2-style immersive section */}
      <div className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight">
            Capture Your
            <span className="italic block">World.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto mb-10">
            Join a community of passionate photographers who believe every frame tells a story worth sharing.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="footer-btn inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.15em] hover:bg-white/90 transition-all"
            >
              Join ShutterSync
              <Icon name="ArrowRightIcon" size={16} variant="outline" />
            </Link>
            <Link
              href="/gallery"
              className="footer-btn inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.15em] hover:bg-white/10 transition-all"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-[#0a0a0a] py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="text-xl font-serif font-semibold text-white tracking-tight">
              ShutterSync
            </Link>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] uppercase tracking-[0.2em]">
              {footerLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <Icon name={social.icon as any} size={18} variant="outline" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-zinc-600 uppercase tracking-widest">
            <span>© {currentYear} ShutterSync. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}