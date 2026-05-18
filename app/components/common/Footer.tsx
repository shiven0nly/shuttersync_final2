'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import React, { useEffect } from 'react';
import gsap from 'gsap';

const renderSocialIcon = (id: string) => {
  const className = "w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110";
  switch (id) {
    case 'social_whatsapp':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.825 0 00-3.48-8.413Z" />
        </svg>
      );
    case 'social_instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'social_facebook':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    default:
      return null;
  }
};

const Footer = React.memo(function Footer() {
  const currentYear = 2026;

  const footerLinks = [
    { id: 'footer_about', label: 'About', href: '/about' },
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
              'url(/scenery1.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight text-balance">
            Capture Your
            <span className="italic block">World.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto mb-10 text-pretty">
            Join a community of passionate photographers who believe every frame tells a story worth sharing.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="footer-btn inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.15em] hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
            >
              Join ShutterSync
              <Icon name="ArrowRightIcon" size={16} variant="outline" />
            </Link>
            <Link
              href="/gallery"
              className="footer-btn inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.15em] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] text-white/50 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300"
                >
                  {renderSocialIcon(social.id)}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-zinc-600 uppercase tracking-widest">
            <span>© {currentYear} ShutterSync. All rights reserved.</span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
              <Link href="/return-policy" className="hover:text-white transition-colors">Return Policy</Link>
              <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;