'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface GsapFillButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'light' | 'dark';
}

export default function GsapFillButton({
    children,
    onClick,
    className = '',
    variant = 'light',
}: GsapFillButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!buttonRef.current || !fillRef.current) return;

        const button = buttonRef.current;
        const fill = fillRef.current;

        const handleMouseEnter = () => {
            gsap.to(fill, {
                y: '0%',
                duration: 0.4,
                ease: 'power2.out',
            });
            gsap.to(button, {
                color: variant === 'light' ? '#000' : '#fff',
                duration: 0.4,
            });
        };

        const handleMouseLeave = () => {
            gsap.to(fill, {
                y: '100%',
                duration: 0.4,
                ease: 'power2.in',
            });
            gsap.to(button, {
                color: variant === 'light' ? '#fff' : '#fff', // Adjust based on contrast
                duration: 0.4,
            });
        };

        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mouseenter', handleMouseEnter);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [variant]);

    const baseStyles = variant === 'light'
        ? 'bg-transparent border border-white/20 text-white'
        : 'bg-white/10 border border-white/10 text-white';

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            className={`relative overflow-hidden transition-colors ${baseStyles} rounded-full py-2 px-6 ${className}`}
        >
            <div
                ref={fillRef}
                className="absolute inset-0 bg-white translate-y-full z-0"
            />
            <span className="relative z-10">{children}</span>
        </button>
    );
}
