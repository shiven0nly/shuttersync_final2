'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const admins = [
    {
        id: 1,
        name: 'Aquib',
        role: 'Community Lead',
        badge: '🏆 Community Lead',
        mobile: '8758675845',
        email: 'aquib@shuttersync.in',
        instagram: 'aquib_ss',
        bio: 'Passionate about building creative communities and connecting photographers across all skill levels.',
        avatar: 'A',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    {
        id: 2,
        name: 'Rajnish',
        role: 'Management',
        badge: '📋 Management',
        mobile: '9455955981',
        email: 'rajnish@shuttersync.in',
        instagram: 'rajnish_ss',
        bio: 'Ensuring smooth operations and strategic growth for the ShutterSync community behind the scenes.',
        avatar: 'R',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
    {
        id: 3,
        name: 'Maitri',
        role: 'Creative Director',
        badge: '🎨 Creative Director',
        mobile: '8200052219',
        email: 'maitri@shuttersync.in',
        instagram: 'maitri_ss',
        bio: 'Curating visual experiences and ensuring every photo challenge sparks creativity and growth.',
        avatar: 'M',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    },
    {
        id: 4,
        name: 'Sampada',
        role: 'Creative Executive',
        badge: '✨ Creative Executive',
        mobile: '8849299142',
        email: 'sampada@shuttersync.in',
        instagram: 'sampada_ss',
        bio: 'Organizing photo walks, workshops, and events that bring the community together in real life.',
        avatar: 'S',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
    },
    {
        id: 5,
        name: 'Shiven',
        role: 'Technical Lead',
        badge: '⚙️ Technical Lead',
        mobile: '9460272387',
        email: 'shiven@shuttersync.in',
        instagram: 'shiven_ss',
        bio: 'Blending technology and photography to create seamless digital experiences for the community.',
        avatar: 'S',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    },
];

export default function ContactContent() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => { setIsHydrated(true); }, []);

    useEffect(() => {
        if (!isHydrated) return;

        const ctx = gsap.context(() => {
            // Hero fade-in
            gsap.from('[data-hero]', {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.3,
            });

            // Admin cards stagger
            if (cardsRef.current) {
                gsap.from('.admin-card', {
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                    y: 50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.7,
                    ease: 'power3.out',
                });
            }

            // Form section
            if (formRef.current) {
                gsap.from(formRef.current, {
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                });
            }
        });

        return () => ctx.revert();
    }, [isHydrated]);

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!formData.name.trim()) errs.name = 'Name is required';
        if (!formData.email.trim()) errs.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email';
        if (!formData.subject.trim()) errs.subject = 'Subject is required';
        if (!formData.message.trim()) errs.message = 'Message is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    return (
        <div>
            {/* ========== Hero Section ========== */}
            <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
                {/* Background image */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=2000&q=80)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(2px)',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background" />
                </div>

                <div className="relative z-10 text-center px-6 pt-28 pb-16">
                    <span data-hero className="inline-block py-1.5 px-4 border border-white/20 rounded-full text-[10px] tracking-[0.2em] uppercase text-white/70 mb-6">
                        Get in Touch
                    </span>
                    <h1 data-hero className="text-5xl md:text-7xl font-serif italic text-white mb-4 text-balance">
                        Meet the Admins
                    </h1>
                    <p data-hero className="text-lg text-white/60 max-w-2xl mx-auto font-light text-pretty">
                        The team behind ShutterSync — here to help you grow and connect.
                    </p>
                </div>
            </section>

            {/* ========== Admin Cards ========== */}
            <section ref={cardsRef} className="py-20 px-6 lg:px-8 bg-background">
                <div className="max-w-6xl mx-auto">
                    {/* Section heading */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3">Our Team</h2>
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-12 h-[1px] bg-foreground/10" />
                            <div className="w-2 h-2 rounded-full" style={{ background: '#C4783E' }} />
                            <div className="w-12 h-[1px] bg-foreground/10" />
                        </div>
                    </div>

                    {/* Cards grid — 5 cards: 3 top + 2 centered bottom */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                        {admins.slice(0, 3).map((admin) => (
                            <AdminCard key={admin.id} admin={admin} />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[calc(66.666%+1rem)] mx-auto">
                        {admins.slice(3).map((admin) => (
                            <AdminCard key={admin.id} admin={admin} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== Section Divider ========== */}
            <div className="max-w-4xl mx-auto px-6">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
            </div>

            {/* ========== Contact Form ========== */}
            <section className="py-20 px-6 lg:px-8 bg-background">
                <div className="max-w-5xl mx-auto">
                    <div ref={formRef} className="grid lg:grid-cols-5 gap-12 items-start">

                        {/* Left: Illustration + info */}
                        <div className="lg:col-span-2 hidden lg:block">
                            <div className="sticky top-32">
                                {/* Line art camera illustration */}
                                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="line-art-icon mx-auto mb-8 opacity-20">
                                    <rect x="30" y="60" width="140" height="100" rx="12" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="100" cy="110" r="30" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="100" cy="110" r="15" stroke="currentColor" strokeWidth="1.5" />
                                    <rect x="70" y="45" width="60" height="20" rx="6" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="145" cy="75" r="5" stroke="currentColor" strokeWidth="1.5" />
                                </svg>

                                <h3 className="text-2xl font-serif text-foreground mb-4 text-center">Drop us a message</h3>
                                <p className="text-sm text-foreground/40 text-center leading-relaxed mb-8">
                                    Have a question, suggestion, or just want to say hello? We&apos;d love to hear from you.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-foreground/50">
                                        <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] flex items-center justify-center">
                                            <Icon name="EnvelopeIcon" size={18} variant="outline" />
                                        </div>
                                        <span>contact@shuttersync.in</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-foreground/50">
                                        <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] flex items-center justify-center">
                                            <Icon name="MapPinIcon" size={18} variant="outline" />
                                        </div>
                                        <span>Gujarat, India</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="lg:col-span-3">
                            {/* Mobile heading */}
                            <div className="text-center mb-10 lg:hidden">
                                <h2 className="text-3xl font-serif text-foreground mb-3">Drop us a message</h2>
                                <p className="text-foreground/50 text-sm">Have a question or suggestion? We&apos;d love to hear from you.</p>
                            </div>

                            <div className="soft-card p-8 md:p-10 shadow-lg">
                                {isSubmitted ? (
                                    <div className="animate-success text-center py-12">
                                        <div className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'rgba(196, 120, 62, 0.1)' }}>
                                            <Icon name="CheckCircleIcon" size={48} variant="solid" style={{ color: '#C4783E' }} />
                                        </div>
                                        <h3 className="text-2xl font-serif text-foreground mb-2">Message Sent!</h3>
                                        <p className="text-sm text-foreground/50 max-w-sm mx-auto mb-6">
                                            Thank you for reaching out. We&apos;ll get back to you soon.
                                        </p>
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:translate-x-1"
                                            style={{ color: '#C4783E' }}
                                            type="button"
                                        >
                                            Send another message
                                            <Icon name="ArrowRightIcon" size={14} variant="outline" />
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Name */}
                                            <div>
                                                <label htmlFor="contact-name" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Full Name</label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/25">
                                                        <Icon name="UserIcon" size={16} variant="outline" />
                                                    </div>
                                                    <input
                                                        id="contact-name"
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        aria-invalid={!!errors.name}
                                                        aria-describedby={errors.name ? 'name-err' : undefined}
                                                        className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-sm text-foreground focus:outline-none transition-colors ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-foreground/10 focus:border-foreground/30'}`}
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                {errors.name && <p id="name-err" className="text-xs text-red-500 mt-1.5" role="alert">{errors.name}</p>}
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label htmlFor="contact-email" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Email Address</label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/25">
                                                        <Icon name="EnvelopeIcon" size={16} variant="outline" />
                                                    </div>
                                                    <input
                                                        id="contact-email"
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        aria-invalid={!!errors.email}
                                                        aria-describedby={errors.email ? 'email-err' : undefined}
                                                        className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-sm text-foreground focus:outline-none transition-colors ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-foreground/10 focus:border-foreground/30'}`}
                                                        placeholder="you@example.com"
                                                    />
                                                </div>
                                                {errors.email && <p id="email-err" className="text-xs text-red-500 mt-1.5" role="alert">{errors.email}</p>}
                                            </div>
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label htmlFor="contact-subject" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Subject</label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/25">
                                                    <Icon name="TagIcon" size={16} variant="outline" />
                                                </div>
                                                <input
                                                    id="contact-subject"
                                                    type="text"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    aria-invalid={!!errors.subject}
                                                    aria-describedby={errors.subject ? 'subject-err' : undefined}
                                                    className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-sm text-foreground focus:outline-none transition-colors ${errors.subject ? 'border-red-400 focus:border-red-500' : 'border-foreground/10 focus:border-foreground/30'}`}
                                                    placeholder="What's this about?"
                                                />
                                            </div>
                                            {errors.subject && <p id="subject-err" className="text-xs text-red-500 mt-1.5" role="alert">{errors.subject}</p>}
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label htmlFor="contact-message" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Message</label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-4 text-foreground/25">
                                                    <Icon name="ChatBubbleLeftIcon" size={16} variant="outline" />
                                                </div>
                                                <textarea
                                                    id="contact-message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    rows={5}
                                                    aria-invalid={!!errors.message}
                                                    aria-describedby={errors.message ? 'msg-err' : undefined}
                                                    className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-sm text-foreground focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-400 focus:border-red-500' : 'border-foreground/10 focus:border-foreground/30'}`}
                                                    placeholder="Tell us what's on your mind..."
                                                />
                                            </div>
                                            {errors.message && <p id="msg-err" className="text-xs text-red-500 mt-1.5" role="alert">{errors.message}</p>}
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-foreground text-background rounded-full text-sm font-semibold uppercase tracking-[0.15em] hover:bg-foreground/90 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 flex items-center justify-center gap-3 group"
                                        >
                                            Send Message
                                            <Icon name="PaperAirplaneIcon" size={16} variant="outline" className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

/* ========== Admin Card Component ========== */
interface AdminCardProps {
    admin: (typeof admins)[number];
}

function AdminCard({ admin }: AdminCardProps) {
    return (
        <div className="admin-card soft-card p-8 text-center group hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-300">
            {/* Portrait */}
            <div className="relative mx-auto mb-5 w-24 h-24">
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg ring-2 ring-foreground/5 group-hover:ring-foreground/10 transition-all duration-200">
                    <img
                        src={admin.photo}
                        alt={admin.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>

            {/* Name */}
            <h3 className="text-xl font-semibold text-foreground mb-1" style={{ fontFamily: 'var(--font-inter)' }}>
                {admin.name}
            </h3>

            {/* Role Badge */}
            <span
                className="inline-block py-1 px-3 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] mb-4"
                style={{ background: 'rgba(196, 120, 62, 0.1)', color: '#C4783E' }}
            >
                {admin.role}
            </span>

            {/* Bio */}
            <p className="text-sm text-foreground/45 font-light leading-relaxed mb-5 text-pretty">
                {admin.bio}
            </p>

            {/* Contact Icons */}
            <div className="flex items-center justify-center gap-3">
                {admin.mobile && (
                    <a
                        href={`tel:${admin.mobile}`}
                        aria-label={`Call ${admin.name}`}
                        className="w-9 h-9 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/40 hover:text-foreground hover:border-foreground/30 hover:shadow-md transition-all duration-200"
                    >
                        <Icon name="PhoneIcon" size={15} variant="outline" />
                    </a>
                )}
                <a
                    href={`mailto:${admin.email}`}
                    aria-label={`Email ${admin.name}`}
                    className="w-9 h-9 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/40 hover:text-foreground hover:border-foreground/30 hover:shadow-md transition-all duration-200"
                >
                    <Icon name="EnvelopeIcon" size={15} variant="outline" />
                </a>
                <a
                    href={`https://instagram.com/${admin.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${admin.name} on Instagram`}
                    className="w-9 h-9 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/40 hover:text-foreground hover:border-foreground/30 hover:shadow-md transition-all duration-200"
                >
                    <Icon name="CameraIcon" size={15} variant="outline" />
                </a>
            </div>
        </div>
    );
}