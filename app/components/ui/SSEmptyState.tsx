'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { CheckCircleIcon as SolidCheckIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface Step {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    link: string;
    linkText: string;
    icon: any;
}

interface SSEmptyStateProps {
    title: string;
    description: string;
    icon: any;
    steps: Step[];
    className?: string;
}

export default function SSEmptyState({ 
    title, 
    description, 
    icon: Icon, 
    steps,
    className 
}: SSEmptyStateProps) {
    const completedCount = steps.filter(s => s.completed).length;
    const progressPercent = (completedCount / steps.length) * 100;

    return (
        <div className={cn("w-full max-w-4xl mx-auto mt-8", className)}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
                {/* Visual / Illustration Side */}
                <div className="md:w-2/5 p-8 bg-slate-50 border-r border-slate-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Icon className="w-48 h-48 text-slate-400" />
                    </div>
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 w-24 h-24 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-6"
                    >
                        <Icon className="w-10 h-10 text-indigo-500" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 relative z-10 leading-tight">
                        {title}
                    </h2>
                    <p className="text-slate-500 font-medium relative z-10 text-sm">
                        {description}
                    </p>
                </div>

                {/* Progress / Checklist Side */}
                <div className="md:w-3/5 p-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">Next Steps</h3>
                        <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                            {completedCount} / {steps.length} Completed
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full bg-indigo-500"
                        />
                    </div>

                    {/* Checklist */}
                    <div className="space-y-4">
                        {steps.map((step) => {
                            const StepIcon = step.icon;
                            return (
                                <div 
                                    key={step.id} 
                                    className={cn(
                                        "flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200",
                                        step.completed 
                                            ? "bg-slate-50 border-slate-200" 
                                            : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm"
                                    )}
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        {step.completed ? (
                                            <SolidCheckIcon className="w-6 h-6 text-green-500" />
                                        ) : (
                                            <div className="w-6 h-6 rounded-full border-2 border-slate-300" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={cn(
                                            "font-bold text-slate-900 text-sm",
                                            step.completed && "line-through text-slate-400"
                                        )}>
                                            {step.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {step.description}
                                        </p>
                                    </div>
                                    {!step.completed && (
                                        <Link 
                                            href={step.link}
                                            className="whitespace-nowrap px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition shadow-sm"
                                        >
                                            {step.linkText}
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
