'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import { ShareIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import { WorkshopsIcon, ChallengesIcon } from '@/components/ui/LineArtIcons';

export default function WorkshopRegisterPage() {
    const { user, isLoaded } = useUser();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        nextWorkshop: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLocallyRegistered, setIsLocallyRegistered] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [error, setError] = useState('');

    const register = useMutation(api.registrations.register);
    const userRegistration = useQuery(
        api.registrations.getUserRegistration,
        user ? { userId: user.id, workshopId: 2 } : 'skip'
    );

    const isRegistered = userRegistration?.status === 'active' || isLocallyRegistered;
    const isCancelled = userRegistration?.status === 'cancelled';

    useEffect(() => {
        if (userRegistration && userRegistration.status === 'active') {
            setFormData({
                fullName: userRegistration.fullName,
                email: userRegistration.email,
                phone: userRegistration.phoneNumber,
                nextWorkshop: userRegistration.nextWorkshopInterest || ''
            });
        }
    }, [userRegistration]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setShowLoginPopup(true);
            return;
        }

        setIsSubmitting(true);
        setError('');
        try {
            await register({
                userId: user.id,
                fullName: formData.fullName,
                email: formData.email,
                phoneNumber: formData.phone,
                workshopId: 2,
                nextWorkshopInterest: formData.nextWorkshop || undefined
            });
            setIsLocallyRegistered(true);
            setShowSuccess(true);
        } catch (error: any) {
            setError(error.message || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setShowLoginPopup(true);
            return;
        }
        setStep(2);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'ShutterSync Workshop',
                text: 'I just registered for the ShutterSync Photography Workshop! Join me!',
                url: window.location.href
            });
        } else {
            alert('Copy this link to share: ' + window.location.href);
        }
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
                <div className="w-8 h-8 border-4 border-foreground border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-orange-50">
            {/* Ocean Wave Background */}
            <div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
            </div>

            {/* Minimal Line Art Doodles Background - More Visible */}
            <div className="absolute inset-0 opacity-[0.08] text-foreground">
                {/* Top Left - Camera */}
                <svg className="absolute top-20 left-10 w-64 h-64" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="40" y="60" width="120" height="80" rx="8" />
                    <circle cx="100" cy="100" r="25" />
                    <circle cx="100" cy="100" r="15" />
                    <rect x="130" y="70" width="15" height="10" rx="2" />
                    <path d="M70 60 L80 45 L120 45 L130 60" />
                    <circle cx="145" cy="75" r="3" fill="currentColor" />
                </svg>
                
                {/* Top Center - Lens */}
                <svg className="absolute top-10 left-1/3 w-48 h-48" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="100" cy="100" r="50" />
                    <circle cx="100" cy="100" r="35" />
                    <circle cx="100" cy="100" r="20" />
                    <path d="M100 50 L100 65" />
                    <path d="M100 135 L100 150" />
                    <path d="M50 100 L65 100" />
                    <path d="M135 100 L150 100" />
                </svg>

                {/* Top Right - Film Strip */}
                <svg className="absolute top-40 right-20 w-56 h-56" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="50" y="40" width="100" height="120" rx="4" />
                    <line x1="50" y1="60" x2="150" y2="60" />
                    <line x1="50" y1="90" x2="150" y2="90" />
                    <line x1="50" y1="120" x2="150" y2="120" />
                    <rect x="55" y="45" width="8" height="8" />
                    <rect x="137" y="45" width="8" height="8" />
                    <rect x="55" y="152" width="8" height="8" />
                    <rect x="137" y="152" width="8" height="8" />
                </svg>

                {/* Middle Left - Aperture */}
                <svg className="absolute top-1/3 left-20 w-60 h-60" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="100" cy="100" r="50" />
                    <path d="M100 50 L120 85 L100 100 L80 85 Z" />
                    <path d="M150 100 L115 120 L100 100 L115 80 Z" />
                    <path d="M100 150 L80 115 L100 100 L120 115 Z" />
                    <path d="M50 100 L85 80 L100 100 L85 120 Z" />
                    <circle cx="100" cy="100" r="15" />
                </svg>

                {/* Middle Center - Tripod */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 w-44 h-44" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="100" y1="50" x2="100" y2="120" />
                    <line x1="100" y1="120" x2="60" y2="160" />
                    <line x1="100" y1="120" x2="140" y2="160" />
                    <line x1="100" y1="120" x2="100" y2="165" />
                    <circle cx="100" cy="50" r="8" />
                    <rect x="95" y="60" width="10" height="15" rx="2" />
                </svg>

                {/* Middle Right - Color Wheel */}
                <svg className="absolute top-1/3 right-10 w-64 h-64" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="100" cy="100" r="50" />
                    <circle cx="100" cy="100" r="20" />
                    <line x1="100" y1="50" x2="100" y2="70" />
                    <line x1="100" y1="130" x2="100" y2="150" />
                    <line x1="50" y1="100" x2="70" y2="100" />
                    <line x1="130" y1="100" x2="150" y2="100" />
                    <line x1="64.6" y1="64.6" x2="78.8" y2="78.8" />
                    <line x1="121.2" y1="121.2" x2="135.4" y2="135.4" />
                    <line x1="135.4" y1="64.6" x2="121.2" y2="78.8" />
                    <line x1="78.8" y1="121.2" x2="64.6" y2="135.4" />
                </svg>

                {/* Bottom Left - Light Bulb */}
                <svg className="absolute bottom-32 left-16 w-48 h-48" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="100" cy="80" r="30" />
                    <path d="M85 105 L85 125 L115 125 L115 105" />
                    <line x1="90" y1="130" x2="110" y2="130" />
                    <line x1="92" y1="135" x2="108" y2="135" />
                    <line x1="100" y1="50" x2="100" y2="35" />
                    <line x1="130" y1="65" x2="142" y2="53" />
                    <line x1="70" y1="65" x2="58" y2="53" />
                    <line x1="135" y1="95" x2="147" y2="95" />
                    <line x1="65" y1="95" x2="53" y2="95" />
                </svg>

                {/* Bottom Center - Flash */}
                <svg className="absolute bottom-20 left-1/3 w-40 h-40" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M100 40 L80 100 L110 100 L90 160 L130 90 L100 90 Z" />
                    <circle cx="100" cy="40" r="5" />
                </svg>

                {/* Bottom Right - SD Card */}
                <svg className="absolute bottom-40 right-24 w-52 h-52" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M70 50 L70 70 L60 80 L60 150 L140 150 L140 50 Z" />
                    <line x1="80" y1="50" x2="80" y2="70" />
                    <line x1="95" y1="50" x2="95" y2="70" />
                    <line x1="110" y1="50" x2="110" y2="70" />
                    <line x1="125" y1="50" x2="125" y2="70" />
                    <rect x="75" y="90" width="50" height="40" rx="2" />
                </svg>

                {/* Top Far Right - Shutter */}
                <svg className="absolute top-24 right-1/4 w-44 h-44" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="100" cy="100" r="45" />
                    <path d="M100 55 L115 85 L100 100 Z" />
                    <path d="M145 100 L115 115 L100 100 Z" />
                    <path d="M100 145 L85 115 L100 100 Z" />
                    <path d="M55 100 L85 85 L100 100 Z" />
                    <path d="M115 85 L130 100 L115 115 Z" />
                    <path d="M85 115 L70 100 L85 85 Z" />
                </svg>

                {/* Middle Far Left - Photo Frame */}
                <svg className="absolute top-1/2 left-5 w-36 h-36" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="50" y="60" width="100" height="80" rx="4" />
                    <rect x="60" y="70" width="80" height="60" rx="2" />
                    <circle cx="80" cy="90" r="8" />
                    <path d="M60 130 L85 110 L105 125 L140 95 L140 130 Z" />
                </svg>

                {/* Top Far Left - Star/Sparkle */}
                <svg className="absolute top-16 left-1/4 w-32 h-32" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M100 60 L105 90 L115 95 L105 100 L100 130 L95 100 L85 95 L95 90 Z" />
                    <path d="M140 80 L143 95 L148 98 L143 101 L140 116 L137 101 L132 98 L137 95 Z" />
                    <path d="M60 110 L63 120 L68 123 L63 126 L60 136 L57 126 L52 123 L57 120 Z" />
                </svg>

                {/* Bottom Far Right - Histogram */}
                <svg className="absolute bottom-16 right-10 w-48 h-48" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="50" y="50" width="100" height="100" />
                    <line x1="60" y1="140" x2="60" y2="120" />
                    <line x1="70" y1="140" x2="70" y2="100" />
                    <line x1="80" y1="140" x2="80" y2="80" />
                    <line x1="90" y1="140" x2="90" y2="90" />
                    <line x1="100" y1="140" x2="100" y2="70" />
                    <line x1="110" y1="140" x2="110" y2="85" />
                    <line x1="120" y1="140" x2="120" y2="95" />
                    <line x1="130" y1="140" x2="130" y2="110" />
                    <line x1="140" y1="140" x2="140" y2="125" />
                </svg>

                {/* Middle Top - Viewfinder */}
                <svg className="absolute top-28 left-1/2 w-40 h-40" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="60" y="60" width="80" height="80" rx="4" />
                    <line x1="100" y1="60" x2="100" y2="140" />
                    <line x1="60" y1="100" x2="140" y2="100" />
                    <circle cx="100" cy="100" r="20" />
                    <path d="M60 60 L70 70" />
                    <path d="M140 60 L130 70" />
                    <path d="M60 140 L70 130" />
                    <path d="M140 140 L130 130" />
                </svg>

                {/* Bottom Middle Left - Slider/Adjustment */}
                <svg className="absolute bottom-28 left-1/4 w-36 h-36" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="60" y1="80" x2="140" y2="80" />
                    <circle cx="90" cy="80" r="8" fill="currentColor" />
                    <line x1="60" y1="100" x2="140" y2="100" />
                    <circle cx="110" cy="100" r="8" fill="currentColor" />
                    <line x1="60" y1="120" x2="140" y2="120" />
                    <circle cx="80" cy="120" r="8" fill="currentColor" />
                </svg>

                {/* Top Middle Right - Brush/Edit Tool */}
                <svg className="absolute top-36 right-1/3 w-40 h-40" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M80 120 L120 80 L130 90 L90 130 Z" />
                    <circle cx="125" cy="75" r="15" />
                    <path d="M80 120 L70 150 L85 135 Z" />
                    <line x1="135" y1="65" x2="145" y2="55" />
                </svg>
            </div>

            <div className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <Link href="/events" className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-12 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Events
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Left Side: Info */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full">
                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
                                </svg>
                                <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Limited Seats</span>
                            </div>

                            <div>
                                <h1 className="text-5xl md:text-6xl font-serif italic text-foreground mb-4 leading-tight">
                                    Color Grading<br />Workshop
                                </h1>
                                <div className="w-20 h-1 bg-orange-500 rounded-full mb-6" />
                                <p className="text-lg text-foreground/70 leading-relaxed text-pretty">
                                    Master the art of color grading in DaVinci Resolve. Learn professional techniques to elevate your films and photos.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-foreground/80">
                                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round"/>
                                            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round"/>
                                            <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-foreground/50 uppercase tracking-wider">Next Session</p>
                                        <p className="text-sm font-medium">Coming Soon</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-foreground/80">
                                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                                            <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-foreground/50 uppercase tracking-wider">Duration</p>
                                        <p className="text-sm font-medium">Updated Soon</p>
                                    </div>
                                </div>
                            </div>

                            {/* QR Code */}
                            <div className="hidden lg:block">
                                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm inline-block">
                                    <p className="text-xs text-foreground/40 uppercase tracking-wider mb-3 text-center">Share Workshop</p>
                                    <QRCodeSVG 
                                        value="https://shuttersync-photography.netlify.app/workshops/register"
                                        size={160}
                                        level="H"
                                        includeMargin={true}
                                    />
                                    <p className="text-xs text-foreground/60 mt-3 text-center">Scan to share</p>
                                </div>
                            </div>

                            {isRegistered && (
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleShare}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-colors text-sm font-medium"
                                    >
                                        <ShareIcon className="w-4 h-4" />
                                        Share with friends
                                    </button>
                                    <Link
                                        href="/workshops/color-grading"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium text-sm hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground/50 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                        <span>Access Workshop</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Right Side: Form Card */}
                        <div className="relative">
                            <div className="absolute -inset-1 bg-orange-500 rounded-[2.5rem] blur-xl opacity-10" />
                            
                            <div className="relative bg-white p-10 rounded-[2.5rem] shadow-xl border border-black/5">
                                {isCancelled ? (
                                    <div className="text-center py-10">
                                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-serif text-foreground mb-2">Registration Cancelled</h3>
                                        <p className="text-sm text-foreground/50 mb-6">Your registration has been cancelled by an administrator.</p>
                                        <div className="bg-red-50 p-4 rounded-xl text-left border border-red-100">
                                            <p className="text-[10px] uppercase tracking-wider text-red-600 mb-1">Status</p>
                                            <p className="text-sm font-medium text-red-700">Cancelled</p>
                                            {userRegistration?.cancelledBy && (
                                                <p className="text-xs text-red-600 mt-2">By: {userRegistration.cancelledBy}</p>
                                            )}
                                        </div>
                                    </div>
                                ) : isRegistered && !showSuccess ? (
                                    <div className="text-center py-10">
                                        <div className="w-16 h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-serif text-foreground mb-2">You're Registered!</h3>
                                        <p className="text-sm text-foreground/50 mb-6 text-pretty">We'll send the workshop details to {formData.email} soon.</p>
                                        <div className="bg-orange-50 p-6 rounded-2xl text-left border border-orange-100">
                                            <p className="text-[10px] uppercase tracking-wider text-orange-600 mb-2">Workshop Details</p>
                                            <p className="text-sm font-medium text-foreground">Color Grading Masterclass</p>
                                            <p className="text-sm text-foreground/60 mt-1">Status: Priority List</p>
                                            {formData.nextWorkshop && (
                                                <p className="text-xs text-orange-600 mt-3">Next interest: {formData.nextWorkshop}</p>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center justify-center gap-2 mb-8">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                                1
                                            </div>
                                            <div className="w-12 h-0.5 bg-gray-200" />
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                                2
                                            </div>
                                        </div>

                                        <div className="text-center mb-8">
                                            <div className="w-12 h-12 bg-white border-2 border-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <WorkshopsIcon size={28} className="text-orange-500" />
                                            </div>
                                            <h2 className="text-2xl font-serif text-foreground mb-1">
                                                {step === 1 ? 'Join Color Grading Masterclass' : "What's Next?"}
                                            </h2>
                                            <p className="text-sm text-foreground/50">
                                                {step === 1 ? 'Step 1 of 2 — Registration' : 'Step 2 of 2 — Your Interests'}
                                            </p>
                                        </div>

                                        {error && (
                                            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                                                {error}
                                            </div>
                                        )}

                                        {step === 1 ? (
                                            <form onSubmit={handleNextStep} className="space-y-4">
                                                <div>
                                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2 ml-1">Full Name</label>
                                                    <input
                                                        type="text"
                                                        value={formData.fullName}
                                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                        required
                                                        className="w-full px-5 py-4 rounded-2xl border border-foreground/10 bg-white text-sm text-foreground focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2 ml-1">Email Address</label>
                                                    <input
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        required
                                                        className="w-full px-5 py-4 rounded-2xl border border-foreground/10 bg-white text-sm text-foreground focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2 ml-1">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        required
                                                        className="w-full px-5 py-4 rounded-2xl border border-foreground/10 bg-white text-sm text-foreground focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                                        placeholder="+1-234-567-890"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="w-full py-4 bg-orange-500 text-white rounded-2xl text-sm font-semibold uppercase tracking-[0.15em] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-colors mt-4 flex items-center justify-center gap-2"
                                                >
                                                    Next Step
                                                    <ArrowRightIcon className="w-4 h-4" />
                                                </button>
                                            </form>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2 ml-1">What workshop would you like next?</label>
                                                    <textarea
                                                        value={formData.nextWorkshop}
                                                        onChange={(e) => setFormData({ ...formData, nextWorkshop: e.target.value })}
                                                        rows={4}
                                                        className="w-full px-5 py-4 rounded-2xl border border-foreground/10 bg-white text-sm text-foreground focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
                                                        placeholder="Tell us what workshop topics interest you... (Optional)"
                                                    />
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setStep(1)}
                                                        className="flex-1 py-4 bg-gray-100 text-foreground rounded-2xl text-sm font-semibold uppercase tracking-[0.15em] hover:bg-gray-200 transition-all"
                                                    >
                                                        Back
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="flex-1 py-4 bg-orange-500 text-white rounded-2xl text-sm font-semibold uppercase tracking-[0.15em] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                    >
                                                        {isSubmitting ? 'Registering...' : 'Complete Registration'}
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section with Line Art */}
                <div className="max-w-6xl mx-auto mt-20">
                    <div className="relative overflow-hidden rounded-[2.5rem] p-12 text-center bg-white border border-black/5 shadow-sm">
                        {/* Decorative Line Art Icons */}
                        <div className="absolute top-8 left-8 opacity-10">
                            <WorkshopsIcon size={80} className="text-orange-500" />
                        </div>
                        <div className="absolute bottom-8 right-8 opacity-10">
                            <ChallengesIcon size={80} className="text-orange-500" />
                        </div>
                        
                        <div className="relative z-10">
                            <span className="inline-block py-1 px-3 bg-orange-50 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">Roadmap</span>
                            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4 italic">More Workshops Coming Soon</h2>
                            <p className="text-foreground/40 max-w-lg mx-auto mb-10 leading-relaxed">
                                We're curating a series of specialized masterclasses covering Lighting, Portrait Photography, and Post-Production workflows.
                            </p>
                            <Link href="/events" className="inline-flex items-center gap-2 text-orange-600 text-[10px] uppercase tracking-[0.2em] font-bold hover:gap-4 transition-all">
                                Explore the Roadmap →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Popup */}
            {showLoginPopup && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-black/5 animate-in zoom-in-95 duration-300">
                        <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-serif text-foreground mb-2">Login First</h3>
                        <p className="text-sm text-foreground/50 mb-8 leading-relaxed">Please login first, then register for the workshop.</p>
                        <div className="flex flex-col gap-3">
                            <Link
                                href="/sign-in"
                                className="w-full py-3 bg-orange-500 text-center text-white rounded-xl text-sm font-semibold uppercase tracking-wider hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-colors"
                            >
                                Sign In
                            </Link>
                            <button
                                onClick={() => setShowLoginPopup(false)}
                                className="w-full py-3 text-foreground/40 text-sm font-medium hover:text-foreground transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Dialog */}
            {showSuccess && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="success-title">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-black/5">
                        <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-6">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 id="success-title" className="text-xl font-serif text-foreground mb-2">Registration Completed</h3>
                        <p className="text-sm text-foreground/50 mb-8 leading-relaxed text-pretty">Your spot has been secured! Check your email for further instructions and the workshop schedule.</p>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="w-full py-3 bg-orange-500 text-white rounded-xl text-sm font-semibold uppercase tracking-wider hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-colors"
                        >
                            Awesome
                        </button>
                    </div>
                </div>
            )}

            {/* Ocean Wave Styles */}
            <style jsx>{`
                .ocean {
                    height: 8%;
                    width: 100%;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    background: linear-gradient(180deg, #ff6b35 0%, #f7931e 100%);
                    z-index: 1;
                }

                .wave {
                    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 198"><path fill="%23ff8c42" d="M0,100 Q400,150 800,100 T1600,100 L1600,198 L0,198 Z" /></svg>') repeat-x;
                    position: absolute;
                    top: -198px;
                    width: 6400px;
                    height: 198px;
                    animation: wave 12s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
                    transform: translate3d(0, 0, 0);
                }

                .wave:nth-of-type(2) {
                    top: -175px;
                    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 198"><path fill="%23ffa45c" d="M0,80 Q400,120 800,80 T1600,80 L1600,198 L0,198 Z" /></svg>') repeat-x;
                    animation: wave 10s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite,
                               swell 8s ease -1.25s infinite;
                    opacity: 0.9;
                }

                @keyframes wave {
                    0% {
                        margin-left: 0;
                    }
                    100% {
                        margin-left: -1600px;
                    }
                }

                @keyframes swell {
                    0%, 100% {
                        transform: translate3d(0, -25px, 0);
                    }
                    50% {
                        transform: translate3d(0, 5px, 0);
                    }
                }
            `}</style>
        </div>
    );
}
