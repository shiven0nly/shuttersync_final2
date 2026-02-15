'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
    isExiting?: boolean;
    onExited?: () => void;
}

export default function LoadingScreen({ isExiting, onExited }: LoadingScreenProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cameraRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance animation for the container
            gsap.fromTo(containerRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: "power2.out" }
            );

            // Camera flip/rotate animation
            gsap.to(cameraRef.current, {
                rotateY: 360,
                duration: 1.5,
                repeat: -1,
                ease: "power2.inOut"
            });

            // Pulse effect
            gsap.to(cameraRef.current, {
                scale: 1.2,
                duration: 0.75,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (isExiting) {
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                    if (onExited) onExited();
                }
            });
        }
    }, [isExiting, onExited]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center pointer-events-none"
        >
            <div ref={cameraRef} className="relative w-24 h-24 text-orange-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
            </div>
            <p className="mt-8 text-[10px] tracking-[0.4em] uppercase text-foreground/40 animate-pulse">
                Syncing Vision...
            </p>
        </div>
    );
}
