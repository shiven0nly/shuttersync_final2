'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

const upcomingFeatures = [
    {
        id: 1,
        icon: 'MapIcon',
        title: 'Photo Walks',
        description: 'Guided photography walks through scenic urban and nature locations. Meet fellow photographers, learn composition tips on the go.',
        status: 'Coming Soon',
        color: 'from-blue-500/10 to-cyan-500/10',
    },
    {
        id: 2,
        icon: 'AcademicCapIcon',
        title: 'Color Grading Workshop',
        description: 'Master the art of color grading in DaVinci Resolve. Learn professional techniques to elevate your films and photos.',
        status: 'Open Now',
        color: 'from-purple-500/10 to-pink-500/10',
        link: '/workshops/register',
    },
    {
        id: 5,
        icon: 'AcademicCapIcon',
        title: 'Lightroom Mastery Workshop',
        description: 'Master the industry standard photo editing software. Learn from basic adjustments to advanced professional workflows.',
        status: 'Open Now',
        color: 'from-orange-500/10 to-yellow-500/10',
        link: '/workshops/lightroom-mastery/register',
    },
    {
        id: 3,
        icon: 'BookOpenIcon',
        title: 'Courses',
        description: 'Structured multi-week online courses from beginner to advanced levels. Master specific styles of photography at your own pace.',
        status: 'Coming Soon',
        color: 'from-amber-500/10 to-orange-500/10',
    },
    {
        id: 4,
        icon: 'TrophyIcon',
        title: 'Competitions',
        description: 'Themed photo competitions with prizes, judging by industry professionals, and opportunities for portfolio exposure.',
        status: 'Coming Soon',
        color: 'from-emerald-500/10 to-teal-500/10',
    },
];

export default function EventsContent() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const { user, isLoaded } = useUser();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            setEmail('');
        }
    };

    const handleWorkshopClick = (e: React.MouseEvent, link?: string) => {
        e.preventDefault();
        if (!isLoaded) return;
        if (!user) {
            setShowLoginDialog(true);
        } else if (link) {
            router.push(link);
        }
    };

    return (
        <div className="pt-28 pb-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <span className="inline-block py-1.5 px-4 border border-foreground/15 rounded-full text-[10px] tracking-[0.2em] uppercase text-foreground/60 mb-6">
                        Coming Soon
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif italic text-foreground mb-4">
                        Events & Learning
                    </h1>
                    <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
                        We&apos;re building an incredible lineup of experiences for the ShutterSync community. Here&apos;s what&apos;s on the roadmap.
                    </p>
                </div>

                {/* Roadmap */}
                <div className="relative mb-24">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-foreground/10 hidden lg:block" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {upcomingFeatures.map((feature, index) => {
                            const isWorkshop = !!feature.link;
                            const status = isWorkshop ? 'Register Now' : feature.status;
                            const Content = (
                                <div
                                    className={`soft-card p-8 relative h-full transition-all duration-300 ${isWorkshop ? 'hover:shadow-lg hover:border-foreground/20 cursor-pointer' : ''} ${index % 2 === 1 ? 'lg:mt-16' : ''}`}
                                >
                                    {/* Status badge */}
                                    <div className="absolute top-6 right-6">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isWorkshop ? 'bg-orange-500/10 text-orange-600' : 'bg-foreground/5 text-foreground/50'} text-[10px] font-semibold uppercase tracking-wider`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${isWorkshop ? 'bg-orange-500' : 'bg-green-400'} animate-pulse`} />
                                            {status}
                                        </span>
                                    </div>

                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                                        <Icon name={feature.icon as any} size={32} variant="outline" className="text-foreground/70" />
                                    </div>

                                    <h3 className="text-2xl font-serif text-foreground mb-3">{feature.title}</h3>
                                    <p className="text-sm text-foreground/50 font-light leading-relaxed mb-6">{feature.description}</p>

                                    {isWorkshop && (
                                        <div className="mt-auto">
                                            <span className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-[10px] font-bold uppercase tracking-[0.2em] group-hover:bg-blue-600 transition-all duration-300">
                                                Register Now
                                                <Icon name="ArrowRightIcon" size={14} variant="solid" className="group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    )}
                                </div>
                            );

                            return isWorkshop ? (
                                <div key={feature.id} onClick={(e) => handleWorkshopClick(e, feature.link)}>
                                    {Content}
                                </div>
                            ) : (
                                <div key={feature.id}>{Content}</div>
                            );
                        })}
                    </div>
                </div>

                {/* Email Capture */}
                <div className="max-w-2xl mx-auto text-center">
                    <div className="soft-card p-8 md:p-12">
                        <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-6">
                            <Icon name="BellIcon" size={28} variant="outline" className="text-foreground" />
                        </div>
                        <h2 className="text-3xl font-serif text-foreground mb-3">Get Notified</h2>
                        <p className="text-foreground/50 mb-8">
                            Be the first to know when new events and features launch. No spam, just exciting updates.
                        </p>

                        {isSubmitted ? (
                            <div className="flex items-center justify-center gap-2 text-green-600">
                                <Icon name="CheckCircleIcon" size={20} variant="solid" />
                                <span className="text-sm font-medium">You&apos;re on the list! We&apos;ll keep you posted.</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="your@email.com"
                                    aria-label="Email address"
                                    className="flex-1 px-5 py-3 rounded-full border border-foreground/10 bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:border-foreground/30 transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-foreground text-background rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground/50 transition-colors"
                                >
                                    Notify Me
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Login Dialog */}
            {showLoginDialog && (
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
                                onClick={() => setShowLoginDialog(false)}
                                className="w-full py-3 text-foreground/40 text-sm font-medium hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 rounded-xl transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
