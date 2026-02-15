'use client';

import { useEffect, useRef } from 'react';

interface LineArtIconProps {
    size?: number;
    className?: string;
}

/* ========== PHILOSOPHY ICONS ========== */

/** Camera with spark/starburst — Creativity */
export function CreativityIcon({ size = 48, className = '' }: LineArtIconProps) {
    const pathRef = useRef<SVGGElement>(null);
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`line-art-icon ${className}`}>
            <g ref={pathRef} className="line-art-paths">
                {/* Camera body */}
                <rect x="6" y="16" width="28" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Lens mount */}
                <circle cx="20" cy="27" r="7" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="20" cy="27" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                {/* Flash / viewfinder */}
                <rect x="14" y="12" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
                {/* Spark / starburst from lens */}
                <line x1="38" y1="14" x2="42" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="40" y1="18" x2="44" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="38" y1="22" x2="42" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="36" y1="10" x2="36" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>
        </svg>
    );
}

/** Two overlapping silhouettes forming circle — Community */
export function CommunityIcon({ size = 48, className = '' }: LineArtIconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`line-art-icon ${className}`}>
            <g className="line-art-paths">
                {/* Person 1 */}
                <circle cx="16" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 32c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Person 2 */}
                <circle cx="32" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M24 32c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Connecting arc below */}
                <path d="M12 36c0 0 6 6 12 6s12-6 12-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>
        </svg>
    );
}

/** Plant sprouting from tripod — Growth */
export function GrowthIcon({ size = 48, className = '' }: LineArtIconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`line-art-icon ${className}`}>
            <g className="line-art-paths">
                {/* Tripod legs */}
                <line x1="24" y1="26" x2="14" y2="42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="24" y1="26" x2="34" y2="42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="24" y1="26" x2="24" y2="42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Tripod head */}
                <rect x="20" y="23" width="8" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                {/* Stem growing upward */}
                <path d="M24 23V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Leaves */}
                <path d="M24 16c-3-1-6 0-7 3 2 0 5 0 7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M24 12c3-1 6 0 7 3-2 0-5 0-7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                {/* Small bud at top */}
                <circle cx="24" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
            </g>
        </svg>
    );
}

/** Target with camera aperture as bullseye — Purpose / Vision */
export function PurposeIcon({ size = 48, className = '' }: LineArtIconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`line-art-icon ${className}`}>
            <g className="line-art-paths">
                {/* Outer ring */}
                <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" />
                {/* Middle ring */}
                <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" />
                {/* Aperture blades in center */}
                <path d="M24 18l3 4h-6l3-4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M30 24l-4 3v-6l4 3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M24 30l-3-4h6l-3 4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M18 24l4-3v6l-4-3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                {/* Crosshair marks */}
                <line x1="24" y1="4" x2="24" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="24" y1="40" x2="24" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="4" y1="24" x2="8" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="40" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>
        </svg>
    );
}


/* ========== COMMUNITY ACTIVITY ICONS ========== */

/** Walking shoe with camera — Photo Walks */
export function PhotoWalksIcon({ size = 48, className = '' }: LineArtIconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`line-art-icon ${className}`}>
            <g className="line-art-paths">
                {/* Shoe outline */}
                <path d="M8 34h8l4-4h8l2 4h10c2 0 3-1 3-3v-2c0-2-1-3-3-3H30l-4-6H16l-4 4H8c-2 0-3 2-3 3v4c0 2 1 3 3 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
                {/* Camera hanging */}
                <rect x="28" y="10" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="33" cy="13.5" r="2" stroke="currentColor" strokeWidth="1.2" />
                {/* Strap */}
                <path d="M30 17c0 2-2 4-4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>
        </svg>
    );
}

/** Open book with camera on page — Workshops */
export function WorkshopsIcon({ size = 48, className = '' }: LineArtIconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`line-art-icon ${className}`}>
            <g className="line-art-paths">
                {/* Book spine */}
                <path d="M24 10v30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Left page */}
                <path d="M24 10C20 8 12 7 6 8v28c6-1 14 0 18 2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                {/* Right page */}
                <path d="M24 10C28 8 36 7 42 8v28c-6-1-14 0-18 2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                {/* Camera icon on right page */}
                <rect x="30" y="18" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="34" cy="21" r="1.5" stroke="currentColor" strokeWidth="1" />
                {/* Lines on left page */}
                <line x1="10" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <line x1="10" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <line x1="10" y1="24" x2="18" y2="24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </g>
        </svg>
    );
}

/** Trophy with aperture engraving — Challenges */
export function ChallengesIcon({ size = 48, className = '' }: LineArtIconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`line-art-icon ${className}`}>
            <g className="line-art-paths">
                {/* Cup */}
                <path d="M14 8h20v12c0 5.5-4.5 10-10 10s-10-4.5-10-10V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                {/* Left handle */}
                <path d="M14 12H10c-2 0-3 2-3 4s1 4 3 4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Right handle */}
                <path d="M34 12h4c2 0 3 2 3 4s-1 4-3 4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Stem + base */}
                <line x1="24" y1="30" x2="24" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 36h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14 40h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Aperture engraving inside */}
                <circle cx="24" cy="18" r="4" stroke="currentColor" strokeWidth="1.2" />
                <path d="M24 14l1.5 3h-3l1.5-3z" stroke="currentColor" strokeWidth="0.8" />
                <path d="M28 18l-3 1.5v-3l3 1.5z" stroke="currentColor" strokeWidth="0.8" />
                <path d="M24 22l-1.5-3h3l-1.5 3z" stroke="currentColor" strokeWidth="0.8" />
                <path d="M20 18l3-1.5v3l-3-1.5z" stroke="currentColor" strokeWidth="0.8" />
            </g>
        </svg>
    );
}

/** Speech bubble with photo frame — Critique Sessions */
export function CritiqueIcon({ size = 48, className = '' }: LineArtIconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`line-art-icon ${className}`}>
            <g className="line-art-paths">
                {/* Speech bubble */}
                <path d="M6 8h36c1 0 2 1 2 2v22c0 1-1 2-2 2H16l-6 6v-6H6c-1 0-2-1-2-2V10c0-1 1-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                {/* Photo frame inside */}
                <rect x="14" y="14" width="20" height="14" rx="1" stroke="currentColor" strokeWidth="1.2" />
                {/* Mountain scene in frame */}
                <path d="M14 24l6-5 4 3 4-3 6 5" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                {/* Sun in frame */}
                <circle cx="30" cy="18" r="1.5" stroke="currentColor" strokeWidth="1" />
            </g>
        </svg>
    );
}

/** Wrench + camera hybrid — Skill Labs / Collaborations */
export function SkillLabsIcon({ size = 48, className = '' }: LineArtIconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`line-art-icon ${className}`}>
            <g className="line-art-paths">
                {/* Wrench */}
                <path d="M10 38l14-14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 40c-1-1-1-3 0-4l2-2c1-1 3-1 4 0l0 0c1 1 1 3 0 4l-2 2c-1 1-3 1-4 0z" stroke="currentColor" strokeWidth="1.5" />
                {/* Camera at top */}
                <rect x="24" y="8" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="32" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="32" cy="14" r="1.5" stroke="currentColor" strokeWidth="1" />
                {/* Flash */}
                <rect x="29" y="5" width="6" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
                {/* Connection line */}
                <path d="M24 20l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>
        </svg>
    );
}

/** Globe with camera marker — Online Meets / Club Trips */
export function GlobalMeetsIcon({ size = 48, className = '' }: LineArtIconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`line-art-icon ${className}`}>
            <g className="line-art-paths">
                {/* Globe */}
                <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" />
                {/* Longitude lines */}
                <ellipse cx="24" cy="24" rx="8" ry="16" stroke="currentColor" strokeWidth="1" />
                {/* Latitude lines */}
                <path d="M8 18h32" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <path d="M8 30h32" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                {/* Camera pin marker */}
                <circle cx="34" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <rect x="31.5" y="12" width="5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="0.8" />
                <circle cx="34" cy="13.8" r="1" stroke="currentColor" strokeWidth="0.6" />
                {/* Pin point */}
                <path d="M34 18l0 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </g>
        </svg>
    );
}

/* ========== UTILITY: Wrapper with stroke-draw animation ========== */
interface AnimatedLineArtProps {
    children: React.ReactNode;
    className?: string;
}

export function AnimatedLineArt({ children, className = '' }: AnimatedLineArtProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        el.classList.add('line-art-visible');
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className={`line-art-container ${className}`}>
            {children}
        </div>
    );
}