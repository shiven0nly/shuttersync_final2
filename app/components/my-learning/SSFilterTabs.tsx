'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SSFilterTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const tabs = ['All', 'Workshops', 'Courses', 'Events'];

export default function SSFilterTabs({ activeTab, setActiveTab }: SSFilterTabsProps) {
    return (
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide px-1">
            {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap",
                            isActive 
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105" 
                                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                        )}
                    >
                        {tab}
                    </button>
                );
            })}
        </div>
    );
}
