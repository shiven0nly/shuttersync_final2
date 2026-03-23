'use client';

import { motion } from 'framer-motion';
import { CameraIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function SSEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <motion.div 
                animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="w-32 h-32 bg-indigo-50 rounded-[40px] flex items-center justify-center mb-8 shadow-[0_20px_40px_rgba(99,102,241,0.1)] border border-indigo-100"
            >
                <CameraIcon className="w-16 h-16 text-indigo-400 stroke-[1.5]" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
                You haven’t joined anything yet.
            </h2>
            <p className="text-slate-500 max-w-xs mb-10 font-medium">
                Your creative journey starts here. Explore our curated workshops and courses.
            </p>

            <Link 
                href="/events"
                className="tactile-button tactile-button-primary px-10 py-4 rounded-2xl font-bold tracking-tight text-lg"
            >
                Explore Workshops
            </Link>
        </div>
    );
}
