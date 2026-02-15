'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingScreen from './LoadingScreen';

export default function NavigationLoader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isVisible, setIsVisible] = useState(false); // Controls mounting
    const [isExiting, setIsExiting] = useState(false); // Triggers fade-out
    const lastPathname = useRef(pathname);

    useEffect(() => {
        // Initial load hydration
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsExiting(true);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Only trigger on actual route changes
        if (lastPathname.current === pathname) return;
        lastPathname.current = pathname;

        setIsVisible(true);
        setIsExiting(false);

        const timer = setTimeout(() => {
            setIsExiting(true);
        }, 800);

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    if (!isVisible) return null;

    return (
        <LoadingScreen
            isExiting={isExiting}
            onExited={() => setIsVisible(false)}
        />
    );
}
