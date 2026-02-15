'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { usePathname } from 'next/navigation';
import { useUser, SignOutButton } from '@clerk/nextjs';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen, isHydrated]);

  const navLinks = [
    { id: 'nav_home', label: 'Home', href: '/' },
    { id: 'nav_gallery', label: 'Gallery', href: '/gallery' },
    { id: 'nav_challenge', label: 'Challenge', href: '/challenge' },
    { id: 'nav_events', label: 'Events', href: '/events' },
    { id: 'nav_contact', label: 'Contact', href: '/contact' },
    { id: 'nav_admin', label: 'Admin', href: '/admin' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/70 backdrop-blur-md shadow-sm border-b border-black/[0.04]'
          : pathname === '/gallery' ? 'bg-black/20 backdrop-blur-sm' : 'bg-transparent'
          }`}
      >
        {/* Patterned blur overlay */}
        {isScrolled && (
          <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '4px 4px' }} />
        )}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <span className={`text-2xl font-serif font-semibold tracking-tight group-hover:opacity-70 transition-opacity ${pathname === '/gallery' && !isScrolled ? 'text-white' : 'text-foreground'
                }`}>
                ShutterSync
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 relative group ${isActive
                      ? 'text-orange-500 font-bold'
                      : (pathname === '/gallery' && !isScrolled ? 'text-white/60 hover:text-white' : 'text-foreground/60 hover:text-foreground')
                      }`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-[1px] bg-current transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button */}
            {isLoaded && user ? (
              <SignOutButton redirectUrl="/">
                <button className="hidden lg:inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] bg-foreground text-background px-6 py-3 rounded-full hover:bg-foreground/90 transition-all">
                  Logout
                </button>
              </SignOutButton>
            ) : isLoaded ? (
              <Link
                href="/sign-in"
                className="hidden lg:inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] bg-foreground text-background px-6 py-3 rounded-full hover:bg-foreground/90 transition-all"
              >
                Sign In
              </Link>
            ) : (
              <div className="hidden lg:block w-24 h-10 bg-foreground/10 rounded-full animate-pulse" />
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 text-foreground"
              aria-label="Toggle menu"
            >
              <Icon
                name={isMenuOpen ? 'XMarkIcon' : 'Bars3Icon'}
                size={20}
                variant="outline"
              />
              <span className="text-xs uppercase tracking-wider">
                {isMenuOpen ? 'Close' : 'Menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isHydrated && (
        <div
          className={`lg:hidden fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
        >
          <div className="flex flex-col h-full pt-28 pb-8 px-6">
            <nav className="flex-1">
              <div className="space-y-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-3xl font-serif transition-colors ${isActive ? 'text-orange-500' : 'text-foreground/80 hover:text-foreground'
                        }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-black/10">
                {isLoaded && user ? (
                  <SignOutButton redirectUrl="/">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.2em]"
                    >
                      Logout
                    </button>
                  </SignOutButton>
                ) : isLoaded ? (
                  <Link
                    href="/sign-in"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.2em]"
                  >
                    Sign In
                  </Link>
                ) : (
                  <div className="w-full h-12 bg-foreground/10 rounded-full animate-pulse" />
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
