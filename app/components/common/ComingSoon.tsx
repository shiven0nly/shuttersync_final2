'use client';

import React from 'react';
import Header from '@/components/common/Header';
import { motion } from 'framer-motion';

interface ComingSoonProps {
  title: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Full Image Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/backgrounds/comingsoonbg.png" 
            alt="Coming Soon Background" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Minimal Text directly on background */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="inline-block">
              <span className="text-zinc-800/80 text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-bold border-b border-zinc-800/20 pb-2">
                {title} Section
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-playfair font-bold text-zinc-900 tracking-tighter leading-[0.9]">
              Coming <span className="italic font-light text-zinc-700/60 block md:inline mt-2 md:mt-0">Soon</span>
            </h1>
            
            <div className="w-16 h-px bg-zinc-800/30 mx-auto mt-12" />
            
            <p className="text-zinc-800/70 text-[11px] md:text-[13px] font-medium tracking-[0.3em] uppercase max-w-md mx-auto leading-loose">
              Syncing our creative vision. <br />
              Stay tuned for the extraordinary.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="pt-12"
            >
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                Under Development
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ComingSoon;
