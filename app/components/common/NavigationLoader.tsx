'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingScreen from './LoadingScreen';

export default function NavigationLoader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const lastPathname = useRef(pathname);
    const loadingTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const exitTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        // Initial load - show briefly then hide
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsExiting(true);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Only trigger on actual route changes
        if (lastPathname.current === pathname) return;
        lastPathname.current = pathname;

        // Clear any existing timers
        if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
        if (exitTimerRef.current) clearTimeout(exitTimerRef.current);

        // OPTIMISTIC UI: Only show loader if navigation takes > 200ms
        loadingTimerRef.current = setTimeout(() => {
            setIsVisible(true);
            setIsExiting(false);
        }, 200);

        // Auto-hide after 600ms (optimistic assumption: page loaded)
        exitTimerRef.current = setTimeout(() => {
            setIsExiting(true);
        }, 800);

        return () => {
            if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
            if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
        };
    }, [pathname, searchParams]);

    if (!isVisible) return null;

    return (
        <LoadingScreen
            isExiting={isExiting}
            onExited={() => setIsVisible(false)}
        />
    );
}
