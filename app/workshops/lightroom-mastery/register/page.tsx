'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import { ArrowRightIcon, UserCircleIcon, CameraIcon, BeakerIcon, AdjustmentsHorizontalIcon, RectangleGroupIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

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
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [error, setError] = useState('');

    const register = useMutation(api.registrations.register);
    const userRegistration = useQuery(
        api.registrations.getUserRegistration,
        user ? { userId: user.id, workshopId: 3 } : 'skip'
    );

    const isRegistered = userRegistration?.status === 'active';
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
                workshopId: 3,
                nextWorkshopInterest: formData.nextWorkshop || undefined
            });
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

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f0f8ff]">
                <div className="w-10 h-10 border-[4px] border-black border-t-blue-500 rounded-full animate-spin shadow-[4px_4px_0_0_#000]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#f0f8ff] text-black font-sans selection:bg-blue-300">
            {/* Minimal Background Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.15]" 
                style={{ 
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
                    backgroundSize: '40px 40px' 
                }} 
            />

            {/* Neo-Brutalist Header */}
            <header className="relative z-20 pt-8 px-10 flex items-center justify-between">
                <div className="flex items-center gap-4 bg-white border-[3px] border-black p-2 px-4 shadow-[4px_4px_0_0_#000] rotate-[-1deg]">
                    {user?.imageUrl ? (
                        <img src={user.imageUrl} alt="User" className="w-8 h-8 border-2 border-black" />
                    ) : (
                        <div className="w-8 h-8 bg-blue-100 flex items-center justify-center border-2 border-black">
                            <UserCircleIcon className="w-5 h-5 text-black" />
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-tight leading-none">{user?.fullName || 'Guest'}</span>
                        <span className="text-[9px] font-bold text-slate-500 mt-0.5">ShutterSync_Member</span>
                    </div>
                </div>
                <Link href="/events" className="bg-black text-white px-6 py-2 text-[11px] font-black uppercase tracking-widest hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0_0_#3b82f6]">
                    Roadmap_
                </Link>
            </header>

            <main className="relative z-10 pt-16 lg:pt-24 px-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 min-h-[calc(100vh-100px)]">
                {/* Left Side: Content & Form */}
                <div className="lg:col-span-12 xl:col-span-6 flex flex-col justify-center">
                    <div className="mb-12">
                        <div className="inline-block bg-blue-500 text-white px-4 py-1 mb-6 text-sm font-black uppercase tracking-widest border-[3px] border-black shadow-[4px_4px_0_0_#000] rotate-[-2deg]">
                            Photography Masterclass
                        </div>
                        <h1 className="text-7xl lg:text-[120px] font-black tracking-tighter leading-[0.85] mb-8 uppercase italic selection:text-white">
                            Lightroom<br />
                            <span className="text-blue-500 drop-shadow-[4px_4px_0_#000]">Mastery</span>
                        </h1>
                        <p className="text-xl lg:text-2xl font-bold max-w-lg leading-snug border-l-[6px] border-black pl-6 py-2">
                            Master the art of post-processing. High-contrast workflows for the modern photographer.
                        </p>
                    </div>

                    {/* Neo-Brutalist Registration Card */}
                    <div className="bg-white p-10 border-[4px] border-black shadow-[12px_12px_0_0_#000] max-w-md relative overflow-hidden">
                        {/* Decorative Stripe */}
                        <div className="absolute top-0 left-0 w-full h-3 bg-blue-500 border-b-[3px] border-black" />
                        
                        {isCancelled ? (
                            <div className="text-center py-6">
                                <h3 className="text-3xl font-black uppercase mb-4">REJECTED</h3>
                                <div className="bg-red-100 p-6 border-[3px] border-black shadow-[4px_4px_0_0_#000]">
                                    <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">Status</p>
                                    <p className="text-xl font-black">CANCELLED_BY_ADMIN</p>
                                </div>
                            </div>
                        ) : isRegistered && !showSuccess ? (
                            <div className="text-center py-6">
                                <div className="w-20 h-20 bg-blue-500 text-white border-[3px] border-black flex items-center justify-center mx-auto mb-8 shadow-[6px_6px_0_0_#000] rotate-3">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-black mb-4 uppercase italic">YouAre_In</h3>
                                <p className="font-bold text-slate-500 mb-10 leading-relaxed uppercase tracking-tighter">Check your mail for the full setup guide.</p>
                                <Link
                                    href="/workshops/lightroom-mastery"
                                    className="inline-flex w-full items-center justify-center gap-2 py-5 bg-black text-white text-lg font-black uppercase tracking-widest hover:bg-blue-500 transition-colors border-[3px] border-black shadow-[8px_8px_0_0_#3b82f6] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                                >
                                    Access_Workshop
                                    <ArrowRightIcon className="w-6 h-6 border-[2px] border-white" />
                                </Link>
                            </div>
                        ) : (
                            <>
                                <header className="mb-10 flex items-end justify-between border-b-[3px] border-black pb-6">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">
                                            Stage_{step}_of_2
                                        </p>
                                        <h2 className="text-3xl font-black uppercase italic tracking-tighter">
                                            {step === 1 ? 'Join_Now' : 'The_Finish'}
                                        </h2>
                                    </div>
                                    <div className="flex gap-2 mb-1">
                                        <div className={`w-10 h-3 border-[2px] border-black ${step === 1 ? 'bg-blue-500' : 'bg-white'}`} />
                                        <div className={`w-10 h-3 border-[2px] border-black ${step === 2 ? 'bg-blue-500' : 'bg-white'}`} />
                                    </div>
                                </header>

                                {error && (
                                    <div className="mb-8 p-4 bg-red-100 border-[3px] border-black shadow-[4px_4px_0_0_#000] text-sm font-black uppercase italic">
                                        Error: {error}
                                    </div>
                                )}

                                {step === 1 ? (
                                    <form onSubmit={handleNextStep} className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black uppercase tracking-widest">Photographer_Name</label>
                                            <input
                                                type="text"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                required
                                                className="w-full px-5 py-4 bg-white border-[3px] border-black text-sm font-black uppercase tracking-tight focus:bg-blue-50 focus:shadow-[4px_4px_0_0_#3b82f6] outline-none transition-all placeholder:text-slate-300"
                                                placeholder="e.g. SHIVEN_CHAUDHARY"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black uppercase tracking-widest">Email_Address</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                className="w-full px-5 py-4 bg-white border-[3px] border-black text-sm font-black uppercase tracking-tight focus:bg-blue-50 focus:shadow-[4px_4px_0_0_#3b82f6] outline-none transition-all placeholder:text-slate-300"
                                                placeholder="YOU@SHUTTERSYNC.COM"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full py-5 bg-black text-white text-lg font-black uppercase tracking-widest hover:bg-blue-500 hover:shadow-none transition-all flex items-center justify-center gap-3 border-[3px] border-black shadow-[8px_8px_0_0_#3b82f6] hover:translate-x-1 hover:translate-y-1"
                                        >
                                            Next_Step
                                            <ArrowRightIcon className="w-6 h-6 border-[2px] border-white" />
                                        </button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black uppercase tracking-widest">Contact_No</label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                required
                                                className="w-full px-5 py-4 bg-white border-[3px] border-black text-sm font-black uppercase tracking-tight focus:bg-blue-50 focus:shadow-[4px_4px_0_0_#3b82f6] outline-none transition-all placeholder:text-slate-300"
                                                placeholder="+91-XXXXX-XXXXX"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black uppercase tracking-widest">Workshop_Needs</label>
                                            <textarea
                                                value={formData.nextWorkshop}
                                                onChange={(e) => setFormData({ ...formData, nextWorkshop: e.target.value })}
                                                rows={3}
                                                className="w-full px-5 py-4 bg-white border-[3px] border-black text-sm font-black uppercase tracking-tight focus:bg-blue-50 focus:shadow-[4px_4px_0_0_#3b82f6] outline-none transition-all placeholder:text-slate-300 resize-none"
                                                placeholder="TELL US YOUR GOALS..."
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="px-6 py-5 bg-white border-[3px] border-black font-black uppercase text-xs hover:bg-slate-100 transition-all shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex-1 py-5 bg-blue-500 text-white text-lg font-black uppercase tracking-widest hover:bg-black border-[3px] border-black shadow-[8px_8px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                                            >
                                                {isSubmitting ? 'BUSY...' : 'ENROLL'}
                                                <ArrowRightIcon className="w-6 h-6 border-[2px] border-white" />
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Right Side: Neo-Brutalist Line Art Illustration */}
                <div className="lg:col-span-12 xl:col-span-6 relative flex items-center justify-center min-h-[600px]">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Neo-Brutalist Line Art Composition */}
                        <div className="relative w-full max-w-[550px] aspect-square animate-in slide-in-from-right duration-1000">
                            {/* Main Camera Body Geometric */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-56 bg-white border-[6px] border-black shadow-[20px_20px_0_0_#3b82f6] rotate-[-2deg] flex items-center justify-center overflow-hidden group hover:rotate-2 transition-transform duration-500">
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <div className="w-4 h-4 rounded-full border-[3px] border-black" />
                                    <div className="w-12 h-3 bg-slate-100 border-[2px] border-black" />
                                </div>
                                {/* Massive Lens Ring */}
                                <div className="w-40 h-40 rounded-full border-[8px] border-black bg-blue-50 flex items-center justify-center shadow-[inset_4px_4px_0_0_#000]">
                                    <div className="w-24 h-24 rounded-full border-[6px] border-black bg-black flex items-center justify-center">
                                         <div className="w-8 h-8 rounded-full bg-blue-500 border-4 border-black animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            {/* Flash Unit */}
                            <div className="absolute top-[10%] left-[30%] w-40 h-24 bg-white border-[6px] border-black shadow-[10px_10px_0_0_#000] rotate-[8deg] z-20 flex items-center justify-center">
                                <div className="w-[80%] h-[60%] bg-blue-500 border-[3px] border-black flex items-center justify-center">
                                    <div className="w-full h-2 bg-white/30 rotate-45" />
                                </div>
                            </div>

                            {/* Abstract Floating UI Elements */}
                            <div className="absolute bottom-[15%] left-[10%] bg-blue-500 border-[4px] border-black p-4 shadow-[8px_8px_0_0_#000] rotate-[-12deg] z-30">
                                <AdjustmentsHorizontalIcon className="w-10 h-10 text-white stroke-[3px]" />
                            </div>

                            <div className="absolute top-[20%] right-[10%] bg-black border-[4px] border-black p-4 shadow-[8px_8px_0_0_#3b82f6] rotate-[15deg] z-30">
                                <CameraIcon className="w-10 h-10 text-white stroke-[3px]" />
                            </div>

                            <div className="absolute bottom-[20%] right-[5%] bg-white border-[4px] border-black p-6 shadow-[8px_8px_0_0_#000] rotate-[5deg] z-10">
                                <div className="flex flex-col gap-2">
                                    <div className="h-4 w-32 bg-slate-100 border-[2px] border-black" />
                                    <div className="h-4 w-24 bg-blue-500 border-[2px] border-black" />
                                    <div className="h-4 w-28 bg-slate-100 border-[2px] border-black" />
                                </div>
                            </div>

                            {/* Connecting Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                                <path d="M100 100 L200 150 M500 400 L600 500" stroke="black" strokeWidth="4" strokeDasharray="10 10" opacity="0.4" />
                                <circle cx="50" cy="50" r="15" fill="none" stroke="black" strokeWidth="4" />
                                <rect x="300" y="500" width="30" height="30" fill="none" stroke="black" strokeWidth="4" transform="rotate(25)" />
                            </svg>
                        </div>

                        {/* Brutalist "Join" Floating Badge */}
                        <div className="absolute top-[25%] left-[-20px] bg-white border-[3px] border-black px-4 py-2 font-black uppercase text-xs shadow-[4px_4px_0_0_#000] rotate-[-15deg] z-40">
                            LIMITED_SPOTS
                        </div>
                    </div>
                </div>
            </main>

            {/* Neo-Brutalist Login Popup */}
            {showLoginPopup && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-blue-500/20 backdrop-blur-md">
                    <div className="bg-white border-[4px] border-black p-10 max-w-sm w-full shadow-[16px_16px_0_0_#000] animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-blue-500 text-white border-[3px] border-black flex items-center justify-center mb-8 shadow-[4px_4px_0_0_#000] rotate-6">
                            <CameraIcon className="w-8 h-8 stroke-[3px]" />
                        </div>
                        <h3 className="text-3xl font-black uppercase italic mb-4">Auth_Required</h3>
                        <p className="font-bold text-slate-500 mb-10 leading-relaxed uppercase tracking-widest text-xs">Sign in to claim your spot in the mastery workshop.</p>
                        <div className="flex flex-col gap-4">
                            <Link
                                href="/sign-in"
                                className="w-full py-4 bg-blue-500 border-[3px] border-black text-center text-white text-lg font-black uppercase tracking-wider hover:bg-black transition-all shadow-[6px_6px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                            >
                                Sign_In
                            </Link>
                            <button
                                onClick={() => setShowLoginPopup(false)}
                                className="w-full py-2 text-black text-[10px] font-black uppercase tracking-widest hover:underline"
                            >
                                CLOSE_DIALOG
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Neo-Brutalist Success Dialog */}
            {showSuccess && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md">
                    <div className="bg-white border-[4px] border-black p-12 max-w-sm w-full shadow-[20px_20px_0_0_#3b82f6] animate-in zoom-in-95 duration-300 rotate-[-1deg]">
                        <div className="w-20 h-20 bg-blue-500 text-white border-[4px] border-black flex items-center justify-center mb-8 shadow-[6px_6px_0_0_#000] rotate-12">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-4xl font-black uppercase italic mb-4">SUCCESS!</h3>
                        <p className="font-bold text-slate-500 mb-10 leading-relaxed uppercase tracking-tighter">Your registration is locked in. See you in the workshop.</p>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="w-full py-5 bg-black text-white text-xl font-black uppercase tracking-widest border-[3px] border-black shadow-[8px_8px_0_0_#3b82f6] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                        >
                            AWESOME_
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
