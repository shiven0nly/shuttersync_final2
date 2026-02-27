'use client';

import { Home, Image, BookOpen, Trophy, Calendar, Mail, Shield } from 'lucide-react';
import { NavBar } from '@/components/ui/tubelight-navbar';

export default function TubelightHeader() {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Gallery', url: '/gallery', icon: Image },
    { name: 'Blog', url: '/blog', icon: BookOpen },
    { name: 'Challenge', url: '/challenge', icon: Trophy },
    { name: 'Events', url: '/events', icon: Calendar },
    { name: 'Contact', url: '/contact', icon: Mail },
    { name: 'Admin', url: '/admin', icon: Shield },
  ];

  return <NavBar items={navItems} className="sm:mt-0" />;
}
