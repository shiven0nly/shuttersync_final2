'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import { ArrowRightIcon, UserCircleIcon, CameraIcon, BeakerIcon, AdjustmentsHorizontalIcon, RectangleGroupIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { workshopRegistrationSchema, WorkshopRegistrationData } from '@/lib/schemas';
import { useModals } from '@/store/modal-context';
import { ZodError } from 'zod';

export default function WorkshopRegisterPage() {
    const { user, isLoaded } = useUser();
    const { dispatch } = useModals();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<WorkshopRegistrationData>({
        fullName: '',
        email: '',
        phone: '',
        nextWorkshop: '',
        transactionId: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof WorkshopRegistrationData, string>>>({});

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
                nextWorkshop: userRegistration.nextWorkshopInterest || '',
                transactionId: userRegistration.transactionId || ''
            });
        }
    }, [userRegistration]);

    const validateStep = (stepNumber: number) => {
        try {
            if (stepNumber === 1) {
                // Manually validate Step 1 fields
                workshopRegistrationSchema.pick({ fullName: true, email: true }).parse(formData);
            } else {
                // Full validation
                workshopRegistrationSchema.parse(formData);
            }
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof ZodError) {
                const fieldErrors: Partial<Record<keyof WorkshopRegistrationData, string>> = {};
                error.issues.forEach((issue) => {
                    const field = issue.path[0] as keyof WorkshopRegistrationData;
                    if (field) fieldErrors[field] = issue.message;
                });
                setErrors(fieldErrors);
            }
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            dispatch({ type: 'OPEN_MODAL', payload: { type: 'LOGIN' } });
            return;
        }

        if (validateStep(2)) {
            setIsSubmitting(true);
            try {
                await register({
                    userId: user.id,
                    fullName: formData.fullName,
                    email: formData.email,
                    phoneNumber: formData.phone,
                    workshopId: 3,
                    nextWorkshopInterest: formData.nextWorkshop || undefined,
                    transactionId: formData.transactionId
                });
                setShowSuccess(true);
                dispatch({
                    type: 'OPEN_MODAL',
                    payload: {
                        type: 'SUCCESS',
                        title: 'ENROLLMENT_SECURED',
                        message: 'Welcome to Lightroom Mastery. Check your inbox for the kickoff guide.'
                    }
                });
            } catch (error: any) {
                dispatch({
                    type: 'OPEN_MODAL',
                    payload: {
                        type: 'ERROR',
                        message: error.message || 'Registration failed. Please try again.'
                    }
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            dispatch({ type: 'OPEN_MODAL', payload: { type: 'LOGIN' } });
            return;
        }
        if (validateStep(1)) {
            setStep(2);
        }
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
            <header className="relative z-20 pt-8 px-6 md:px-10 flex items-center justify-between">
                <div className="flex items-center gap-4 bg-white border-[3px] border-black p-2 px-4 shadow-[4px_4px_0_0_#000] rotate-[-1deg]">
                    {user?.imageUrl ? (
                        <Image src={user.imageUrl} width={32} height={32} alt="User" className="w-8 h-8 border-2 border-black" />
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

            <main className="relative z-10 pt-10 lg:pt-24 px-6 md:px-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 min-h-[calc(100vh-100px)]">
                {/* Left Side: Content & Form */}
                <div className="lg:col-span-12 xl:col-span-6 flex flex-col justify-center">
                    <div className="mb-8 md:mb-12">
                        <div className="inline-block bg-blue-500 text-white px-3 py-1 mb-4 md:mb-6 text-[10px] md:text-sm font-black uppercase tracking-widest border-[3px] border-black shadow-[4px_4px_0_0_#000] rotate-[-2deg]">
                            Photography Masterclass
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-[120px] font-black tracking-tight lg:tracking-tighter leading-[0.9] lg:leading-[0.85] mb-6 md:mb-8 uppercase italic selection:text-white">
                            Lightroom<br />
                            <span className="text-blue-500 drop-shadow-[4px_4px_0_#000]">Mastery</span>
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl font-bold max-w-lg leading-snug border-l-[6px] border-black pl-6 py-2">
                            Master the art of post-processing. High-contrast workflows for the modern photographer.
                        </p>
                    </div>

                    {/* Card Wrapper for Floating Urgency Elements */}
                    <div className="relative max-w-md">
                        {/* Floating "LIMITED SPOTS" Urgency Badge */}
                        <div className="absolute -top-5 -left-4 bg-rose-500 text-white border-[3px] border-black px-4 py-2 font-black uppercase text-xs shadow-[4px_4px_0_0_#000] rotate-[-6deg] z-30 animate-pulse flex items-center gap-2 hover:scale-105 transition-all">
                            <span>LIMITED_SPOTS!</span>
                            <span className="font-bold">⚡</span>
                        </div>

                        {/* Neo-Brutalist Registration Card */}
                        <div className="bg-white p-10 border-[4px] border-black shadow-[12px_12px_0_0_#000] relative overflow-hidden">
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

                                    {Object.keys(errors).length > 0 && (
                                        <div className="mb-8 p-4 bg-red-100 border-[3px] border-black shadow-[4px_4px_0_0_#000] text-[10px] font-black uppercase italic text-red-600">
                                            Fix required errors to proceed
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
                                                    className={`w-full px-5 py-4 bg-white border-[3px] outline-none transition-all placeholder:text-slate-300 text-sm font-black uppercase tracking-tight ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-black focus:bg-blue-50 focus:shadow-[4px_4px_0_0_#3b82f6]'}`}
                                                    placeholder="e.g. John Doe"
                                                />
                                                {errors.fullName && <p className="text-[9px] font-black uppercase text-red-500 mt-1">{errors.fullName}</p>}
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[11px] font-black uppercase tracking-widest">Email_Address</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className={`w-full px-5 py-4 bg-white border-[3px] outline-none transition-all placeholder:text-slate-300 text-sm font-black uppercase tracking-tight ${errors.email ? 'border-red-500 bg-red-50' : 'border-black focus:bg-blue-50 focus:shadow-[4px_4px_0_0_#3b82f6]'}`}
                                                    placeholder="YOU@SHUTTERSYNC.COM"
                                                />
                                                {errors.email && <p className="text-[9px] font-black uppercase text-red-500 mt-1">{errors.email}</p>}
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
                                                    className={`w-full px-5 py-4 bg-white border-[3px] outline-none transition-all placeholder:text-slate-300 text-sm font-black uppercase tracking-tight ${errors.phone ? 'border-red-500 bg-red-50' : 'border-black focus:bg-blue-50 focus:shadow-[4px_4px_0_0_#3b82f6]'}`}
                                                    placeholder="+91-XXXXX-XXXXX"
                                                />
                                                {errors.phone && <p className="text-[9px] font-black uppercase text-red-500 mt-1">{errors.phone}</p>}
                                            </div>

                                            {/* Neo-Brutalist UPI QR Code Payment Section */}
                                            <div className="space-y-4 border-[3px] border-black p-4 bg-yellow-100 shadow-[4px_4px_0_0_#000]">
                                                <p className="text-[11px] font-black uppercase tracking-widest text-black">Scan to Pay (INR 99)</p>
                                                <div className="flex flex-col sm:flex-row gap-4 items-center">
                                                    <div className="relative w-36 h-36 bg-white border-[3px] border-black p-1 shadow-[2px_2px_0_0_#000] shrink-0 rounded-lg">
                                                        <Image
                                                            src="/qrcode/qrcode.png"
                                                            alt="UPI Payment QR Code"
                                                            fill
                                                            className="object-contain rounded"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <ol className="text-[10px] font-bold uppercase leading-relaxed text-slate-800 list-decimal pl-4">
                                                            <li>Scan the QR code with any UPI app (GPay, PhonePe, Paytm).</li>
                                                            <li>Pay the registration fee of ₹99.</li>
                                                            <li>Copy the 12-digit UPI Transaction ID.</li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-[11px] font-black uppercase tracking-widest">UPI Transaction ID</label>
                                                <input
                                                    type="text"
                                                    value={formData.transactionId}
                                                    onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                                                    className={`w-full px-5 py-4 bg-white border-[3px] outline-none transition-all placeholder:text-slate-300 text-sm font-black uppercase tracking-tight ${errors.transactionId ? 'border-red-500 bg-red-50' : 'border-black focus:bg-blue-50 focus:shadow-[4px_4px_0_0_#3b82f6]'}`}
                                                    placeholder="ENTER 12-DIGIT TRANSACTION ID"
                                                />
                                                {errors.transactionId && <p className="text-[9px] font-black uppercase text-red-500 mt-1">{errors.transactionId}</p>}
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

                                    {/* Facing Difficulties Support Section */}
                                    <div className="mt-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        Facing difficulties? Support:{" "}
                                        <a
                                            href="https://wa.me/919460272387?text=Hi! I am facing difficulty registering for the Lightroom Mastery Workshop."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-black hover:underline inline-flex items-center gap-1 transition-colors"
                                        >
                                            +91 9460272387
                                        </a>{" "}
                                        |{" "}
                                        <a
                                            href="https://wa.me/919455955981?text=Hi! I am facing difficulty registering for the Lightroom Mastery Workshop."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-black hover:underline inline-flex items-center gap-1 transition-colors"
                                        >
                                            +91 9455955981
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side: Neo-Brutalist Line Art Illustration */}
                <div className="lg:col-span-12 xl:col-span-6 relative flex items-center justify-center min-h-[400px] lg:min-h-[600px]">
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
                            CLAIM_SPOT
                        </div>
                    </div>
                </div>
            </main>

            {/* Custom Neo-Brutalist Footer */}
            <footer className="w-full bg-[#000] border-t-[8px] border-black mt-20 relative overflow-hidden z-10">
                {/* Visual strip at top */}
                <div className="h-8 bg-[#FFE500] border-b-[4px] border-black flex items-center overflow-hidden pointer-events-none">
                    <div className="flex gap-16 font-black uppercase text-[11px] tracking-widest text-black whitespace-nowrap py-1 select-none animate-[marquee_20s_linear_infinite]">
                        <span>SHUTTERSYNC WORKSHOPS ✦ CREATIVE COMMUNITY ✦ DEVELOP YOUR EYE ✦ UNLOCK CREATIVITY ✦ JOIN TODAY ✦</span>
                        <span>SHUTTERSYNC WORKSHOPS ✦ CREATIVE COMMUNITY ✦ DEVELOP YOUR EYE ✦ UNLOCK CREATIVITY ✦ JOIN TODAY ✦</span>
                        <span>SHUTTERSYNC WORKSHOPS ✦ CREATIVE COMMUNITY ✦ DEVELOP YOUR EYE ✦ UNLOCK CREATIVITY ✦ JOIN TODAY ✦</span>
                    </div>
                </div>

                <style>{`
                    @keyframes marquee {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                        display: flex;
                        animation: marquee 20s linear infinite;
                    }
                `}</style>

                <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 flex flex-col justify-between items-start">
                        <div>
                            <Link href="/" className="inline-block bg-[#FFE500] border-[4px] border-black p-4 px-6 shadow-[8px_8px_0_0_#3b82f6] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all mb-6">
                                <span className="text-3xl font-black uppercase italic tracking-tighter text-black">ShutterSync</span>
                            </Link>
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 max-w-sm leading-relaxed mt-2">
                                A high-octane community of passionate creators, visual storytellers, and masterclass photographers. Join us and shape your perspective.
                            </p>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href="https://chat.whatsapp.com/DdYKdvQZZhB3FV5oSi1NcR" target="_blank" rel="noopener noreferrer" className="bg-[#FFE500] text-black border-[3px] border-black p-3 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0_0_#fff] font-black uppercase text-xs">
                                WHATSAPP
                            </a>
                            <a href="https://www.instagram.com/shuttersync_official/" target="_blank" rel="noopener noreferrer" className="bg-[#3b82f6] text-white border-[3px] border-black p-3 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0_0_#fff] font-black uppercase text-xs">
                                INSTAGRAM
                            </a>
                            <a href="http://www.facebook.com/share/1EjenyXb1s" target="_blank" rel="noopener noreferrer" className="bg-[#fff] text-black border-[3px] border-black p-3 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0_0_#3b82f6] font-black uppercase text-xs">
                                FACEBOOK
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-4">
                        <h4 className="text-sm font-black uppercase italic tracking-widest text-black mb-6 bg-[#3b82f6] text-white border-[3px] border-black px-4 py-2 inline-block rotate-[-2deg] shadow-[4px_4px_0_0_#000]">
                            Quick_Navigation
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'About', href: '/about' },
                                { label: 'Gallery', href: '/gallery' },
                                { label: 'Challenge', href: '/challenge' },
                                { label: 'Events', href: '/events' },
                                { label: 'Contact', href: '/contact' }
                            ].map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.href}
                                    className="bg-white hover:bg-slate-100 border-[3px] border-black p-3 text-xs font-black uppercase tracking-wider text-center hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all shadow-[4px_4px_0_0_#FFE500]"
                                >
                                    {link.label}_
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Legal Links */}
                    <div className="lg:col-span-4 flex flex-col justify-between">
                        <div>
                            <h4 className="text-sm font-black uppercase italic tracking-widest text-black mb-6 bg-rose-500 text-white border-[3px] border-black px-4 py-2 inline-block rotate-[1deg] shadow-[4px_4px_0_0_#000]">
                                Legal_Stuff
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { label: 'Privacy Policy', href: '/privacy-policy' },
                                    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
                                    { label: 'Refund Policy', href: '/refund-policy' },
                                    { label: 'Return Policy', href: '/return-policy' },
                                    { label: 'Disclaimer', href: '/disclaimer' }
                                ].map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.href}
                                        className="bg-white hover:bg-slate-100 border-[2px] border-black px-3 py-1.5 text-[9px] font-black uppercase tracking-wider hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all shadow-[3px_3px_0_0_#3b82f6]"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t-[3px] border-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-500 flex justify-between items-center">
                            <span>© 2026 SHUTTERSYNC. ALL RIGHTS RESERVED.</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}