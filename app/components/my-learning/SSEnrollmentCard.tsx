'use client';

import { motion } from 'framer-motion';
import { CalendarIcon, UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SSEnrollmentCardProps {
    title: string;
    description: string;
    instructor: string;
    date: string;
    thumbnail: string;
    status: 'Enrolled' | 'Coming Soon' | 'Live Now' | 'Completed';
    href: string;
    type: 'workshops' | 'courses' | 'events';
}

export default function SSEnrollmentCard({
    title,
    description,
    instructor,
    date,
    thumbnail,
    status,
    href,
    type
}: SSEnrollmentCardProps) {
    const statusStyles = {
        'Enrolled': 'bg-emerald-50 text-emerald-700 border-emerald-100',
        'Coming Soon': 'bg-amber-50 text-amber-700 border-amber-100',
        'Live Now': 'bg-rose-50 text-rose-700 border-rose-100 animate-pulse',
        'Completed': 'bg-slate-50 text-slate-700 border-slate-100'
    };

    const ctaText = {
        'workshops': 'Go to Workshop',
        'courses': 'Continue Course',
        'events': 'View Event'
    };

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="clay-card group overflow-hidden flex flex-col h-full bg-white p-4"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 bg-slate-100 border border-black/5">
                <img 
                    src={thumbnail} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className={cn(
                    "absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border",
                    statusStyles[status]
                )}>
                    {status}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3 px-1">
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                    {title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-1 font-medium">
                    {description}
                </p>

                <div className="flex flex-wrap gap-4 py-2 border-y border-slate-50">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                        <CalendarIcon className="w-4 h-4 text-slate-400" />
                        {date}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        {instructor}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="mt-6 pt-2">
                {status === 'Coming Soon' ? (
                    <div className="w-full py-4 rounded-2xl bg-slate-50 text-slate-400 text-center text-sm font-bold border border-slate-100 cursor-not-allowed">
                        Starts Soon
                    </div>
                ) : (
                    <Link 
                        href={href}
                        className={cn(
                            "tactile-button tactile-button-primary w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold tracking-tight",
                            status === 'Completed' && "tactile-button bg-white text-slate-900 shadow-slate-200"
                        )}
                    >
                        {status === 'Completed' ? 'Revisit' : ctaText[type]}
                        <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                )}
            </div>
        </motion.div>
    );
}
