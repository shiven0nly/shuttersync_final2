'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import Image from 'next/image';
import { useModals } from '@/store/modal-context';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function PhotographyVisionWorkshopPage() {
    const { user, isLoaded } = useUser();
    const { dispatch } = useModals();
    
    // Page state
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        nextWorkshop: '',
        transactionId: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');

    // Convex queries & mutations
    // workshopId 10 is reserved for Sachin Sudarsanan's Photography Vision
    const register = useMutation(api.registrations.register);
    const userRegistration = useQuery(
        api.registrations.getUserRegistration,
        user ? { userId: user.id, workshopId: 10 } : 'skip'
    );

    const isRegistered = userRegistration?.status === 'active';
    const isCancelled = userRegistration?.status === 'cancelled';

    // Prefill form user details if logged in
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                fullName: user.fullName || prev.fullName,
                email: user.primaryEmailAddress?.emailAddress || prev.email
            }));
        }
    }, [user]);

    // Set registration data when fetched
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

    // Handlers
    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            dispatch({ type: 'OPEN_MODAL', payload: { type: 'LOGIN' } });
            return;
        }
        if (!formData.fullName.trim() || !formData.email.trim()) {
            setError('Please fill in your name and email address.');
            return;
        }
        setError('');
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            dispatch({ type: 'OPEN_MODAL', payload: { type: 'LOGIN' } });
            return;
        }
        if (!formData.phone.trim() || !formData.transactionId.trim()) {
            setError('Contact number and UPI Transaction ID are required.');
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
                workshopId: 10,
                nextWorkshopInterest: formData.nextWorkshop || undefined,
                transactionId: formData.transactionId
            });
            // Send confirmation email via Mailjet
            try {
                await fetch('/api/send-registration-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        toEmail: formData.email,
                        toName: formData.fullName,
                    }),
                });
            } catch (emailErr) {
                // Non-blocking: don't fail registration if email fails
                console.warn('Email notification failed:', emailErr);
            }
            setShowSuccess(true);
        } catch (err: any) {
            setError(err.message || 'An error occurred during registration. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const scrollToForm = () => {
        const element = document.getElementById('registration-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!isLoaded) {
        return (
            <div className="min-h-dvh flex items-center justify-center bg-white">
                <div className="size-8 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <main className="min-h-dvh bg-white text-zinc-900 overflow-x-hidden selection:bg-zinc-100 selection:text-zinc-900">
            <Header />

            {/* HERO SECTION */}
            <section className="pt-36 pb-20 px-6 md:px-8 max-w-5xl mx-auto flex flex-col items-center">
                <div className="flex flex-col items-center text-center gap-6 max-w-3xl">
                    <span className="inline-block py-1 px-3 border border-zinc-200 text-[10px] tracking-[0.2em] uppercase text-zinc-500 rounded-[4px] font-sans">
                        Masterclass Series
                    </span>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-pretty italic tracking-tight leading-[1.1] text-zinc-900">
                        Photography Vision
                    </h1>
                    <p className="text-sm font-sans tracking-[0.25em] uppercase text-zinc-500 font-light">
                        by Sachin Sudarsanan
                    </p>
                    <div className="w-12 h-[1px] bg-zinc-200 my-2" />
                    <p className="text-base sm:text-lg md:text-xl font-serif text-zinc-600 leading-relaxed font-light text-pretty">
                        &ldquo;Turning stories into art.&rdquo; Learn to capture unscripted street portraits, immersive cultural documentation, and cinematic landscapes without a studio setup.
                    </p>
                    <button
                        onClick={scrollToForm}
                        className="mt-4 px-8 py-3 bg-zinc-950 text-white rounded-[4px] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors duration-300"
                    >
                        Unlock Your Vision
                    </button>
                </div>
            </section>

            {/* ART GALLERY PREVIEW (VISUAL GRID) */}
            <section className="py-12 px-6 md:px-8 max-w-6xl mx-auto">
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-8 font-sans">
                    The Perspective / Selected Work
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Big Feature Card — Kelan */}
                    <a
                        href="https://www.instagram.com/p/DUdNYd4j2su/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="md:col-span-2 group relative border border-zinc-100 p-2 rounded-[8px] bg-zinc-50 overflow-hidden block"
                    >
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[6px]">
                            <Image
                                src="/sachin/kelan_DUdNYd4j2su.jpg"
                                alt="Kelan — Photography by Sachin Sudarsanan"
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 h-full"
                                sizes="(max-width: 768px), 66vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-[6px]" />
                        </div>
                        <div className="mt-4 p-2 flex flex-col gap-1">
                            <span className="text-xs font-serif text-zinc-500 italic">01 // Kelan</span>
                            <h3 className="text-lg font-serif font-light text-zinc-900">Documenting Authentic, Unscripted Moments</h3>
                        </div>
                    </a>

                    {/* Right Stacked Column */}
                    <div className="flex flex-col gap-6">
                        {/* Harbour Card */}
                        <a
                            href="https://www.instagram.com/p/DZhmrjHD4Lb/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative border border-zinc-100 p-2 rounded-[8px] bg-zinc-50 overflow-hidden flex-1 block"
                        >
                            <div className="relative aspect-[4/3] md:aspect-square w-full overflow-hidden rounded-[6px]">
                                <Image
                                    src="/sachin/harbour_DZhmrjHD4Lb.png"
                                    alt="Harbour — Photography by Sachin Sudarsanan"
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-[6px]" />
                            </div>
                            <div className="mt-3 p-1 flex flex-col gap-1">
                                <span className="text-xs font-serif text-zinc-500 italic">02 // Harbour</span>
                                <h3 className="text-sm font-serif font-light text-zinc-900 text-pretty">Cinematic Travel & Coastal Light</h3>
                            </div>
                        </a>

                        {/* Banaras Card */}
                        <a
                            href="https://www.instagram.com/p/DZZ2lyEj4Rd/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative border border-zinc-100 p-2 rounded-[8px] bg-zinc-50 overflow-hidden flex-1 block"
                        >
                            <div className="relative aspect-[4/3] md:aspect-square w-full overflow-hidden rounded-[6px]">
                                <Image
                                    src="/sachin/banaras_DZZ2lyEj4Rd.png"
                                    alt="Banaras — Photography by Sachin Sudarsanan"
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-[6px]" />
                            </div>
                            <div className="mt-3 p-1 flex flex-col gap-1">
                                <span className="text-xs font-serif text-zinc-500 italic">03 // Banaras</span>
                                <h3 className="text-sm font-serif font-light text-zinc-900 text-pretty">Raw Streets & Cultural Heritage</h3>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* VALUE PROPOSITION: WHAT YOU WILL LEARN */}
            <section className="py-20 px-6 md:px-8 border-y border-zinc-100 bg-zinc-50">
                <div className="max-w-5xl mx-auto">
                    <div className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-12 font-sans">
                        Curriculum / Key Specialties
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Pillar 1 */}
                        <div className="flex flex-col gap-4 border-l border-zinc-200 pl-6">
                            <div className="text-sm font-serif text-zinc-400 italic">01</div>
                            <h3 className="text-xl font-serif text-zinc-900 font-light">Mastering the Elements</h3>
                            <p className="text-sm text-zinc-500 font-light leading-relaxed text-pretty">
                                Learn to analyze natural light, frame cinematic outdoor compositions, and leverage atmospheric elements to tell visual travel stories.
                            </p>
                        </div>
                        {/* Pillar 2 */}
                        <div className="flex flex-col gap-4 border-l border-zinc-200 pl-6">
                            <div className="text-sm font-serif text-zinc-400 italic">02</div>
                            <h3 className="text-xl font-serif text-zinc-900 font-light">The Raw Street Moment</h3>
                            <p className="text-sm text-zinc-500 font-light leading-relaxed text-pretty">
                                Develop the confidence to shoot candid street portraits. Discover secrets of approaching subjects and capturing real human emotions.
                            </p>
                        </div>
                        {/* Pillar 3 */}
                        <div className="flex flex-col gap-4 border-l border-zinc-200 pl-6">
                            <div className="text-sm font-serif text-zinc-400 italic">03</div>
                            <h3 className="text-xl font-serif text-zinc-900 font-light">Gear Agnosticism</h3>
                            <p className="text-sm text-zinc-500 font-light leading-relaxed text-pretty">
                                Overcome gear anxiety. Train your creative eye to achieve professional, high-fidelity results with either high-end mirrorless setups or your everyday smartphone.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* MEET YOUR INSTRUCTOR & PARTNER BRANDS */}
            <section className="py-24 px-6 md:px-8 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <span className="inline-block text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-sans">
                            Instructor Profile
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-serif font-light text-zinc-900 italic">
                            Meet Sachin Sudarsanan
                        </h2>
                        <span className='flex flex-row gap-5'>
                        <img src="/sachin/sachy_profilephoto.jpg" alt="sachin profile photo" className='w-full h-auto max-w-[200px] object-cover rounded-full  ' />
                        <p className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed text-pretty">
                            Sachin is a highly influential Travel Photographer and Content Creator based in Kerala, India. He has built a dedicated, passionate community of over <strong>54.3k followers</strong> by documenting raw storytelling. Leveraging both smartphones and mirrorless cameras, his workshop breaks down the craft of photography to its conceptual and visual foundations.
                        </p>
                        </span>
                        
                        {/* Instagram Link Button */}
                        <div className="pt-2">
                            <a 
                                href="https://www.instagram.com/foto_sachy/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center gap-2 group text-xs font-semibold uppercase tracking-wider text-zinc-900 hover:text-zinc-600 transition-colors"
                            >
                                <svg className="size-5 text-zinc-900 group-hover:text-zinc-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                                <span>Follow @foto_sachy</span>
                            </a>
                        </div>
                    </div>

                    {/* Numeric and Brand Social Proof */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="border border-zinc-200 p-8 rounded-[8px] text-center space-y-2 bg-zinc-50/50 flex flex-col gap-2 justify-center items-center">
                            <span className="font-serif italic text-5xl font-semibold text-zinc-900 tracking-tight">54.3k</span>
                            <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-sans">Instagram Community Size</p>
                        </div>

                        {/* Associated Brands Grid */}
                        <div className="space-y-4">
                            <div className="text-[9px] uppercase tracking-[0.22em] text-zinc-400 font-sans text-center lg:text-left">
                                Associated Brand Interactions
                            </div>
                            <div className="grid grid-cols-2 border border-zinc-200 divide-x divide-y divide-zinc-200 text-center rounded-[8px] overflow-hidden bg-white">
                                <div className="py-4 text-xs font-bold tracking-widest text-zinc-800">FUJIFILM</div>
                                <div className="py-4 text-xs font-bold tracking-widest text-zinc-800">CANON</div>
                                <div className="py-4 text-xs font-bold tracking-widest text-zinc-800">NATGEO</div>
                                <div className="py-4 text-xs font-bold tracking-widest text-zinc-800">VIVO</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VISUAL INSTAGRAM WORKS SHOWCASE (MASONRY GALLERY) */}
            <section className="py-20 px-6 md:px-8 border-t border-zinc-100 bg-zinc-50/60">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <span className="inline-block text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-sans">
                            Portfolio Highlights
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif italic text-zinc-900 font-light">
                            Featured Masterclass Works
                        </h2>
                        <p className="text-sm text-zinc-500 font-light text-pretty leading-relaxed">
                            These benchmark concepts represent the core styling, light management, and composition we will deconstruct in detail during our training sessions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Work 1 */}
                        <div className="bg-white border border-zinc-200/60 p-4 rounded-[12px] flex flex-col justify-between shadow-sm">
                            <div className="space-y-4">
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[8px] bg-zinc-100 border border-zinc-100">
                                    <Image
                                        src="/sachin/work1Photo.png"
                                        alt="A Beginner's Guide To Apertures"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-sans">Case Study 01</span>
                                    <h4 className="text-base font-serif font-medium text-zinc-900">A Beginner&apos;s Guide to Apertures</h4>
                                    <p className="text-xs text-zinc-500 font-light leading-relaxed">
                                        Understanding focal planes and depth of field parameters to isolate street portraits and capture wide environmental landscape horizons.
                                    </p>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-zinc-100 mt-6">
                                <a
                                    href="https://www.instagram.com/p/DS98OSMD5Ay/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-zinc-900 hover:text-zinc-600 transition-colors"
                                >
                                    <span>View on Instagram</span>
                                    <Icon name="ArrowRightIcon" size={12} className="text-zinc-900" />
                                </a>
                            </div>
                        </div>

                        {/* Work 2 */}
                        <div className="bg-white border border-zinc-200/60 p-4 rounded-[12px] flex flex-col justify-between shadow-sm">
                            <div className="space-y-4">
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[8px] bg-zinc-100 border border-zinc-100">
                                    <Image
                                        src="/sachin/work2Photo.png"
                                        alt="The Art of Monochrome"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-sans">Case Study 02</span>
                                    <h4 className="text-base font-serif font-medium text-zinc-900">The Art of Monochrome</h4>
                                    <p className="text-xs text-zinc-500 font-light leading-relaxed">
                                        Tuning contrast, shadows, and clean lines. Deconstructing how street geometries form patterns when colors are stripped away.
                                    </p>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-zinc-100 mt-6">
                                <a
                                    href="https://www.instagram.com/p/DaSrK4ND_Rk/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-zinc-900 hover:text-zinc-600 transition-colors"
                                >
                                    <span>View on Instagram</span>
                                    <Icon name="ArrowRightIcon" size={12} className="text-zinc-900" />
                                </a>
                            </div>
                        </div>

                        {/* Work 3 */}
                        <div className="bg-white border border-zinc-200/60 p-4 rounded-[12px] flex flex-col justify-between shadow-sm">
                            <div className="space-y-4">
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[8px] bg-zinc-100 border border-zinc-100">
                                    <Image
                                        src="/sachin/work3Photo.png"
                                        alt="Before & After Editing"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-sans">Case Study 03</span>
                                    <h4 className="text-base font-serif font-medium text-zinc-900">Before &amp; After Editing</h4>
                                    <p className="text-xs text-zinc-500 font-light leading-relaxed">
                                        A dive into Sachin&apos;s dynamic range adjustments, color curves, light presets, and grading logic on smartphones.
                                    </p>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-zinc-100 mt-6">
                                <a
                                    href="https://www.instagram.com/p/DZ-Bq5jDP7z/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-zinc-900 hover:text-zinc-600 transition-colors"
                                >
                                    <span>View on Instagram</span>
                                    <Icon name="ArrowRightIcon" size={12} className="text-zinc-900" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* REGISTRATION FORM SECTION */}
            <section id="registration-section" className="py-24 px-6 md:px-8 max-w-4xl mx-auto">
                <div className="relative bg-zinc-50 p-8 md:p-16 border border-zinc-200/80 rounded-[16px] overflow-hidden">
                    {isCancelled ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-red-50 text-red-500 border border-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Icon name="XMarkIcon" size={28} className="text-red-500" />
                            </div>
                            <h3 className="text-2xl font-serif text-zinc-950 mb-2">Enrollment Canceled</h3>
                            <p className="text-zinc-500 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                                Your registration status has been cancelled by an administrator. Please reach out to community support for assistance.
                            </p>
                            <div className="inline-block px-4 py-2 border border-red-200 bg-red-50 rounded-[4px]">
                                <span className="text-[10px] font-bold text-red-800 tracking-wider uppercase">Status: Canceled</span>
                            </div>
                        </div>
                    ) : isRegistered && !showSuccess ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-zinc-950 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                                <Icon name="CheckIcon" size={28} className="text-white" />
                            </div>
                            <h3 className="text-3xl font-serif text-zinc-950 mb-2 italic">You&apos;re Enrolled</h3>
                            <p className="text-zinc-500 text-sm max-w-md mx-auto mb-8 leading-relaxed text-pretty">
                                Your spot in the Photography Vision Workshop has been secured. We have sent the setup guide and links to {formData.email}.
                            </p>
                            <Link
                                href="/events"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-zinc-950 text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-[4px] hover:bg-zinc-805 transition-all"
                            >
                                Back to Events
                            </Link>
                        </div>
                    ) : showSuccess ? (
                        <div className="py-8">
                            {/* Check + Title */}
                            <div className="text-center mb-10">
                                <div className="w-14 h-14 bg-zinc-950 text-white rounded-full flex items-center justify-center mx-auto mb-5">
                                    <Icon name="CheckIcon" size={24} className="text-white" />
                                </div>
                                <h3 className="text-3xl font-serif text-zinc-950 mb-2 italic">You&apos;re In.</h3>
                                <p className="text-zinc-500 text-sm max-w-md mx-auto leading-relaxed text-pretty">
                                    Registration received. We&apos;ll verify your payment within 24 hours and send you the full workshop details at <strong className="text-zinc-900">{formData.email}</strong>.
                                </p>
                            </div>

                            {/* WhatsApp Groups */}
                            <div className="bg-white border border-zinc-200 rounded-[12px] p-6 mb-6 space-y-4">
                                <div className="space-y-1 text-center">
                                    <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 font-sans">Next Step</p>
                                    <p className="text-base font-serif text-zinc-900">Join the Workshop Community</p>
                                    <p className="text-xs text-zinc-500 font-light">All session links, materials, and updates will be shared inside these groups.</p>
                                </div>

                                <a
                                    href="https://chat.whatsapp.com/CW5iLBntSka5PqP37L3F3j"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full px-5 py-4 bg-[#25D366] text-white rounded-[8px] hover:opacity-90 transition-opacity"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">📸</span>
                                        <div className="text-left">
                                            <p className="text-[10px] font-bold uppercase tracking-wider">Workshop Group</p>
                                            <p className="text-xs opacity-80 font-light">Photography Vision — Sachin Sudarsanan</p>
                                        </div>
                                    </div>
                                    <Icon name="ArrowRightIcon" size={14} className="text-white opacity-80 shrink-0" />
                                </a>

                                <a
                                    href="https://chat.whatsapp.com/DdYKdvQZZhB3FV5oSi1NcR"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full px-5 py-4 bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-[8px] hover:bg-zinc-100 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">🌐</span>
                                        <div className="text-left">
                                            <p className="text-[10px] font-bold uppercase tracking-wider">General Community Group</p>
                                            <p className="text-xs text-zinc-500 font-light">ShutterSync — All members</p>
                                        </div>
                                    </div>
                                    <Icon name="ArrowRightIcon" size={14} className="text-zinc-400 shrink-0" />
                                </a>
                            </div>

                            {/* Support & Back */}
                            <div className="text-center space-y-4">
                                <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-sans">
                                    Support &amp; Assistance &mdash; <a href="https://wa.me/919460272387" className="text-zinc-900 hover:underline">+91 94602 72387</a> &bull; <a href="https://wa.me/919455955981" className="text-zinc-900 hover:underline">+91 94559 55981</a>
                                </p>
                                <button
                                    onClick={() => { setShowSuccess(false); setStep(1); }}
                                    className="text-[10px] uppercase tracking-wider text-zinc-400 hover:text-zinc-700 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {/* Headings */}
                            <div className="text-center max-w-lg mx-auto mb-12">
                                <span className="inline-block text-[9px] tracking-[0.25em] uppercase text-zinc-400 font-sans mb-3">
                                    Step {step} of 2 &mdash; Registration
                                </span>
                                <h3 className="text-3xl font-serif text-zinc-950 italic">
                                    {step === 1 ? 'Apply for the Masterclass' : 'Finalize Registration'}
                                </h3>
                                <p className="text-xs text-zinc-900 font-bold mt-2">
                                    {step === 1 
                                        ? 'Provide your contact info to associate your ShutterSync account.' 
                                        : 'Scan the secure UPI code, transfer ₹199, and paste your Transaction ID.'}
                                </p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 border border-red-200 bg-red-50 text-red-600 text-xs rounded-[4px] leading-relaxed">
                                    {error}
                                </div>
                            )}

                            {step === 1 ? (
                                <form onSubmit={handleNextStep} className="space-y-6 max-w-md mx-auto">
                                    <div className="space-y-2">
                                        <label className="block text-[9px] uppercase tracking-[0.2em] text-zinc-400 ml-1 font-sans">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 rounded-[4px] border border-zinc-200 bg-white text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 transition-all font-sans"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[9px] uppercase tracking-[0.2em] text-zinc-400 ml-1 font-sans">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 rounded-[4px] border border-zinc-200 bg-white text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 transition-all font-sans"
                                            placeholder="you@domain.com"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-zinc-950 text-white rounded-[4px] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all mt-4 flex items-center justify-center gap-2"
                                    >
                                        <span>Proceed to Payment</span>
                                        <Icon name="ArrowRightIcon" size={12} className="text-white" />
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
                                    <div className="space-y-2">
                                        <label className="block text-[9px] uppercase tracking-[0.2em] text-zinc-400 ml-1 font-sans">Contact Phone Number</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 rounded-[4px] border border-zinc-200 bg-white text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 transition-all font-sans"
                                            placeholder="+91-XXXXX-XXXXX"
                                        />
                                    </div>

                                    {/* Scan to Pay Box */}
                                    <div className="border border-zinc-200 bg-white p-6 rounded-[8px] space-y-4">
                                        <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-900 border-b border-zinc-150 pb-2">
                                            Scan and Pay &mdash; INR 199
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                                            <div className="relative size-32 bg-white border border-zinc-100 p-1 shrink-0 rounded-[4px]">
                                                <Image
                                                    src="/qrcode/qrcode.png"
                                                    alt="UPI QR Code"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <ol className="text-[10px] text-zinc-500 font-light leading-relaxed list-decimal pl-4 space-y-1">
                                                    <li>Scan QR using any UPI app (GPay, PhonePe, Paytm).</li>
                                                    <li>Transfer the ₹199 entry fee.</li>
                                                    <li>Copy the 12-digit UPI Transaction ID below.</li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-[9px] uppercase tracking-[0.2em] text-zinc-400 ml-1 font-sans">12-Digit UPI Transaction ID</label>
                                        <input
                                            type="text"
                                            value={formData.transactionId}
                                            onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 rounded-[4px] border border-zinc-200 bg-white text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 transition-all font-sans"
                                            placeholder="ENTER TRANSACTION ID"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-[9px] uppercase tracking-[0.2em] text-zinc-400 ml-1 font-sans">What topics do you want covered? (Optional)</label>
                                        <textarea
                                            value={formData.nextWorkshop}
                                            onChange={(e) => setFormData({ ...formData, nextWorkshop: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-[4px] border border-zinc-200 bg-white text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 transition-all resize-none font-sans"
                                            placeholder="e.g. dynamic edit styling, composition rule breaks"
                                        />
                                    </div>

                                    <div className="flex gap-4 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="px-5 py-3 border border-zinc-200 text-[10px] font-bold uppercase tracking-wider rounded-[4px] hover:bg-zinc-100 transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1 py-3 bg-zinc-950 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-[4px] hover:bg-zinc-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? 'Processing...' : 'Submit Registration'}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Help Desk */}
                            <div className="mt-8 text-center text-[9px] tracking-widest uppercase text-zinc-400 font-sans leading-relaxed">
                                Support &amp; Assistance: <a href="https://wa.me/919460272387" className="text-zinc-900 hover:underline">+91 9460272387 &bull; +91 9455955981</a>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
