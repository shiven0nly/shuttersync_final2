'use client';

import { motion } from 'framer-motion';

interface SSTokenBadgeProps {
    tokens: number;
}

export default function SSTokenBadge({ tokens }: SSTokenBadgeProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="token-glow bg-amber-50 px-4 py-2 rounded-full border border-amber-200/50 flex items-center gap-2 group cursor-pointer"
        >
            <span className="text-xl">🔥</span>
            <span className="font-bold text-amber-900 tracking-tight">
                {tokens} <span className="text-amber-700/70 font-medium">S² Cash</span>
            </span>
        </motion.div>
    );
}
