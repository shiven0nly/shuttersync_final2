'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import WorkshopButton from '@/components/ui/WorkshopButton';

const workshops = [
  {
    id: 'color-grading',
    title: 'Color Grading Masterclass',
    description: 'Master professional color grading techniques in DaVinci Resolve. Learn how to create cinematic looks for your photos and films.',
    status: 'Done & Registration Ended',
    href: '#',
    disabled: true,
    image: '/scenery1.jpeg',
    features: ['DaVinci Resolve', 'Cinematic Looks', 'Raw Workflow'],
    ctaLabel: 'Registration Ended'
  },
  {
    id: 'lightroom-mastery',
    title: 'Lightroom Mastery Workshop',
    description: 'Transform your editing workflow with our comprehensive Lightroom masterclass. Coming soon to elevate your digital darkroom skills.',
    status: 'Coming Soon',
    href: '/workshops/lightroom-mastery',
    image: '/heroSectionbg.jpg',
    features: ['Workflow Optimization', 'Advanced Masks', 'Color Theory'],
    ctaLabel: 'Join Priority List To Register Now'
  }
];

export default function WorkshopsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Header />
      
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header section */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Professional Training</span>
              <h1 className="text-5xl md:text-7xl font-playfair font-bold text-zinc-900 mb-6">
                ShutterSync <br /> <span className="italic font-light text-zinc-400">Workshops.</span>
              </h1>
              <p className="text-zinc-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                Level up your photography game with our hand-crafted workshops. From foundational techniques to advanced post-production.
              </p>
            </motion.div>
          </div>

          {/* Workshops Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {workshops.map((workshop, index) => (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-zinc-200/50 shadow-sm hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image 
                    src={workshop.image} 
                    alt={workshop.title} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border ${
                    workshop.status.includes('Done') 
                      ? 'bg-zinc-500/20 text-zinc-100 border-zinc-500/30' 
                      : 'bg-orange-500/20 text-orange-100 border-orange-500/30'
                  }`}>
                    {workshop.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-10 flex-1 flex flex-col">
                  <h2 className="text-3xl font-playfair font-bold text-zinc-900 mb-4">{workshop.title}</h2>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-1">
                    {workshop.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {workshop.features.map(feature => (
                      <span key={feature} className="text-[10px] uppercase tracking-widest text-zinc-400 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <WorkshopButton 
                    label={workshop.ctaLabel}
                    href={workshop.href}
                    disabled={workshop.disabled}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Simple CTA for future workshops */}
          <div className="mt-20 p-12 bg-white rounded-[3rem] border border-dashed border-zinc-300 text-center">
            <span className="text-zinc-300 text-4xl mb-4 block">📸</span>
            <h3 className="text-xl font-playfair font-bold text-zinc-400">More workshops in the pipeline...</h3>
            <p className="text-zinc-400 text-xs mt-2 uppercase tracking-widest">Lighting • Portrait • Composition</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
