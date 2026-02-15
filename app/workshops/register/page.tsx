'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import { ShareIcon, ClockIcon, CalendarIcon, CheckCircleIcon, ExclamationCircleIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function WorkshopRegisterPage() {
    const { user, isLoaded } = useUser();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [error, setError] = useState('');

    const register = useMutation(api.registrations.register);
    const userRegistration = useQuery(
        api.registrations.getUserRegistration,
        user ? { userId: user.id, workshopId: 2 } : 'skip'
    );

    const isRegistered = userRegistration?.status === 'active';
    const isCancelled = userRegistration?.status === 'cancelled';

    useEffect(() => {
        if (userRegistration && userRegistration.status === 'active') {
            setFormData({
                fullName: userRegistration.fullName,
                email: userRegistration.email,
                phone: userRegistration.phoneNumber
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
                workshopId: 2
            });
            setShowSuccess(true);
        } catch (error: any) {
            setError(error.message || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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
        <div className="min-h-screen pt-32 pb-20 px-6 bg-[#fafafa]">
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-20">
                    {/* Left Side: Info */}
                    <div>
                        <Link href="/events" className="text-xs uppercase tracking-[0.2em] text-foreground/40 hover:text-foreground transition-colors mb-8 inline-block">
                            ← Back to Events
                        </Link>

                        <div className="bg-white p-8 rounded-[2rem] border border-blue-100 shadow-sm mb-8">
                            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                                <AcademicCapIcon className="w-6 h-6" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-serif italic text-foreground mb-4">
                                Color Grading <br />Workshops
                            </h1>
                            <p className="text-foreground/50 text-sm leading-relaxed">
                                Master the art of color storytelling. Learn how to use professional tools to create cinematic moods, consistent aesthetics, and breathtaking visuals that define your unique style.
                            </p>
                        </div>

                        <div className="space-y-4 px-4">
                            <div className="flex items-center gap-4 text-foreground/70">
                                <CalendarIcon className="w-5 h-5 text-blue-500" />
                                <span className="text-sm font-medium">Next Session: Coming Soon</span>
                            </div>
                            <div className="flex items-center gap-4 text-foreground/70">
                                <ClockIcon className="w-5 h-5 text-blue-500" />
                                <span className="text-sm">Schedule: Updated Soon</span>
                            </div>
                        </div>

                        {isRegistered && (
                            <button
                                onClick={handleShare}
                                className="mt-10 flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all text-sm font-medium"
                            >
                                <ShareIcon className="w-4 h-4" />
                                Share with friends
                            </button>
                        )}
                    </div>

                    {/* Right Side: Form Card */}
                    <div className="relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500 -z-0 opacity-50" />

                        <div className="relative z-10 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                            {isCancelled ? (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <ExclamationCircleIcon className="w-8 h-8" />
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
                                    <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <CheckCircleIcon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-foreground mb-2">You're Registered!</h3>
                                    <p className="text-sm text-foreground/50 mb-6">We'll send the workshop details to {formData.email} soon.</p>
                                    <div className="bg-[#fafafa] p-4 rounded-xl text-left border border-black/5">
                                        <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1">Details</p>
                                        <p className="text-sm font-medium text-foreground">Workshop: Color Grading</p>
                                        <p className="text-sm font-medium text-foreground">Status: Priority List</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-serif text-foreground mb-2">Join Color Grading</h2>
                                    <p className="text-sm text-foreground/50 mb-8">Secure your priority registration.</p>

                                    {error && (
                                        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-white text-sm text-foreground focus:outline-none focus:border-blue-500/30 transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-white text-sm text-foreground focus:outline-none focus:border-blue-500/30 transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-white text-sm text-foreground focus:outline-none focus:border-blue-500/30 transition-colors"
                                                placeholder="+1-234-567-890"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 bg-foreground text-background rounded-xl text-sm font-semibold uppercase tracking-[0.15em] hover:bg-foreground/90 transition-all disabled:opacity-50 mt-4"
                                        >
                                            {isSubmitting ? 'Registering...' : 'Complete Registration'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Coming Soon */}
                <div className="border-t border-foreground/5 pt-16">
                    <div className="bg-slate-900 rounded-[2.5rem] p-12 text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl group-hover:bg-purple-500/20 transition-all duration-700" />

                        <div className="relative z-10">
                            <span className="inline-block py-1 px-3 bg-white/10 text-white/60 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">Roadmap</span>
                            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 italic">More Workshops are Coming Soon</h2>
                            <p className="text-white/40 max-w-lg mx-auto mb-10 leading-relaxed">
                                We're curating a series of specialized masterclasses covering Lighting, Portrait Photography, and Post-Production workflows.
                            </p>
                            <Link href="/events" className="inline-flex items-center gap-2 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:gap-4 transition-all">
                                Explore the Roadmap →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Error Popup */}
            {showLoginPopup && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-black/5 animate-in zoom-in-95 duration-300">
                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                            <ExclamationCircleIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-serif text-foreground mb-2">Sign in Required</h3>
                        <p className="text-sm text-foreground/50 mb-8 leading-relaxed">Please sign in to your ShutterSync account to register for workshops.</p>
                        <div className="flex flex-col gap-3">
                            <Link
                                href="/sign-in"
                                className="w-full py-3 bg-foreground text-center text-background rounded-xl text-sm font-semibold uppercase tracking-wider"
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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-black/5 animate-in zoom-in-95 duration-300">
                        <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6">
                            <CheckCircleIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-serif text-foreground mb-2">Registration Completed</h3>
                        <p className="text-sm text-foreground/50 mb-8 leading-relaxed">Your spot has been secured! Check your email for further instructions and the workshop schedule.</p>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="w-full py-3 bg-foreground text-background rounded-xl text-sm font-semibold uppercase tracking-wider"
                        >
                            Awesome
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
