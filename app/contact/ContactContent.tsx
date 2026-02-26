'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const admins = [
    {
        id: 1,
        name: 'Rajnish',
        role: 'Founder (ShutterSync)',
        badge: 'Founder (CEO)',
        mobile: '9455955981',
        email: 'rajnish@shuttersync.in',
        instagram: 'quanta_01_',
        bio: 'Ensuring smooth operations and strategic growth for the ShutterSync community behind the scenes.',
        avatar: 'R',
        photo: '/r_hs.jpeg',
    },
    {
        id: 2,
        name: 'Aquib',
        role: 'Co-Founder',
        badge: '🏆 Community Lead',
        mobile: '8758675845',
        email: 'aquib@shuttersync.in',
        instagram: 'aakib11.3',
        bio: 'Passionate about building creative communities and connecting photographers across all skill levels.',
        avatar: 'A',
        photo: '/logo.jpeg',
    },
    {
        id: 3,
        name: 'Maitri',
        role: 'Creative Director',
        badge: '🎨 Creative Director',
        mobile: '8200052219',
        email: 'maitri@shuttersync.in',
        instagram: 'maitri_.1203',
        bio: 'Curating visual experiences and ensuring every photo challenge sparks creativity and growth.',
        avatar: 'M',
        photo: '/logo.jpeg',
    },
    {
        id: 4,
        name: 'Sampada',
        role: 'Creative Executive',
        badge: '✨ Creative Executive',
        mobile: '8849299142',
        email: 'sampada@shuttersync.in',
        instagram: 'sam_kindaaaa',
        bio: 'Organizing photo walks, workshops, and events that bring the community together in real life.',
        avatar: 'S',
        photo: '/s_hs.jpeg',
    },
    {
        id: 5,
        name: 'Shiven',
        role: 'CTO (ShutterSync)',
        badge: '⚙️ Technical Lead',
        mobile: '9460272387',
        email: 'shiven@shuttersync.in',
        instagram: 'notshivenn',
        bio: 'Blending technology and photography to create seamless digital experiences for the community.',
        avatar: 'S',
        photo: '/s2_hs.jpg',
    },
];

export default function ContactContent() {
    const [formData, setFormData] = useState({
        organizationType: '',
        organizationName: '',
        contactPersonName: '',
        email: '',
        phoneNumber: '',
        website: '',
        collaborationType: '',
        projectDetails: '',
        budget: '',
        timeline: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    const submitInquiry = useMutation(api.collaborationInquiries.submitInquiry);

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
        if (!formData.organizationType) errs.organizationType = 'Organization type is required';
        if (!formData.organizationName.trim()) errs.organizationName = 'Organization name is required';
        if (!formData.contactPersonName.trim()) errs.contactPersonName = 'Contact person name is required';
        if (!formData.email.trim()) errs.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email';
        if (!formData.phoneNumber.trim()) errs.phoneNumber = 'Phone number is required';
        if (!formData.collaborationType) errs.collaborationType = 'Collaboration type is required';
        if (!formData.projectDetails.trim()) errs.projectDetails = 'Project details are required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            try {
                await submitInquiry({
                    organizationType: formData.organizationType,
                    organizationName: formData.organizationName,
                    contactPersonName: formData.contactPersonName,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    website: formData.website || undefined,
                    collaborationType: formData.collaborationType,
                    projectDetails: formData.projectDetails,
                    budget: formData.budget || undefined,
                    timeline: formData.timeline || undefined,
                });
                setIsSubmitted(true);
                setFormData({
                    organizationType: '',
                    organizationName: '',
                    contactPersonName: '',
                    email: '',
                    phoneNumber: '',
                    website: '',
                    collaborationType: '',
                    projectDetails: '',
                    budget: '',
                    timeline: '',
                });
            } catch (error) {
                alert('Failed to submit inquiry. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
                        backgroundImage: 'url(/sunset.jpeg)',
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

                                <h3 className="text-2xl font-serif text-foreground mb-4 text-center">Let&apos;s Collaborate</h3>
                                <p className="text-sm text-foreground/40 text-center leading-relaxed mb-8">
                                    Partner with ShutterSync for workshops, events, sponsorships, and more.
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
                                <h2 className="text-3xl font-serif text-foreground mb-3">Collaboration Inquiry</h2>
                                <p className="text-foreground/50 text-sm">Partner with us for workshops, events, and creative projects.</p>
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
                                        {/* Organization Type */}
                                        <div>
                                            <label htmlFor="organization-type" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Organization Type</label>
                                            <select
                                                id="organization-type"
                                                name="organizationType"
                                                value={formData.organizationType}
                                                onChange={handleChange}
                                                required
                                                aria-invalid={!!errors.organizationType}
                                                aria-describedby={errors.organizationType ? 'org-type-err' : undefined}
                                                className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-foreground focus:outline-none transition-colors ${errors.organizationType ? 'border-red-400 focus:border-red-500' : 'border-foreground/10 focus:border-foreground/30'}`}
                                            >
                                                <option value="">Select type</option>
                                                <option value="company">Company</option>
                                                <option value="organization">Organization</option>
                                                <option value="professional">Working Professional</option>
                                            </select>
                                            {errors.organizationType && <p id="org-type-err" className="text-xs text-red-500 mt-1.5" role="alert">{errors.organizationType}</p>}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Organization Name */}
                                            <div>
                                                <label htmlFor="organization-name" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Organization Name</label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/25">
                                                        <Icon name="BuildingOfficeIcon" size={16} variant="outline" />
                                                    </div>
                                                    <input
                                                        id="organization-name"
                                                        type="text"
                                                        name="organizationName"
                                                        value={formData.organizationName}
                                                        onChange={handleChange}
                                                        required
                                                        aria-invalid={!!errors.organizationName}
                                                        aria-describedby={errors.organizationName ? 'org-name-err' : undefined}
                                                        className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-sm text-foreground focus:outline-none transition-colors ${errors.organizationName ? 'border-red-400 focus:border-red-500' : 'border-foreground/10 focus:border-foreground/30'}`}
                                                        placeholder="Your company/organization"
                                                    />
                                                </div>
                                                {errors.organizationName && <p id="org-name-err" className="text-xs text-red-500 mt-1.5" role="alert">{errors.organizationName}</p>}
                                            </div>

                                            {/* Contact Person Name */}
                                            <div>
                                                <label htmlFor="contact-person" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Contact Person</label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/25">
                                                        <Icon name="UserIcon" size={16} variant="outline" />
                                                    </div>
                                                    <input
                                                        id="contact-person"
                                                        type="text"
                                                        name="contactPersonName"
                                                        value={formData.contactPersonName}
                                                        onChange={handleChange}
                                                        required
                                                        aria-invalid={!!errors.contactPersonName}
                                                        aria-describedby={errors.contactPersonName ? 'contact-person-err' : undefined}
                                                        className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-sm text-foreground focus:outline-none transition-colors ${errors.contactPersonName ? 'border-red-400 focus:border-red-500' : 'border-foreground/10 focus:border-foreground/30'}`}
                                                        placeholder="Your full name"
                                                    />
                                                </div>
                                                {errors.contactPersonName && <p id="contact-person-err" className="text-xs text-red-500 mt-1.5" role="alert">{errors.contactPersonName}</p>}
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
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
                                                        placeholder="you@company.com"
                                                    />
                                                </div>
                                                {errors.email && <p id="email-err" className="text-xs text-red-500 mt-1.5" role="alert">{errors.email}</p>}
                                            </div>

                                            {/* Phone Number */}
                                            <div>
                                                <label htmlFor="phone-number" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Phone Number</label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/25">
                                                        <Icon name="PhoneIcon" size={16} variant="outline" />
                                                    </div>
                                                    <input
                                                        id="phone-number"
                                                        type="tel"
                                                        name="phoneNumber"
                                                        value={formData.phoneNumber}
                                                        onChange={handleChange}
                                                        required
                                                        aria-invalid={!!errors.phoneNumber}
                                                        aria-describedby={errors.phoneNumber ? 'phone-err' : undefined}
                                                        className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-sm text-foreground focus:outline-none transition-colors ${errors.phoneNumber ? 'border-red-400 focus:border-red-500' : 'border-foreground/10 focus:border-foreground/30'}`}
                                                        placeholder="+91 98765 43210"
                                                    />
                                                </div>
                                                {errors.phoneNumber && <p id="phone-err" className="text-xs text-red-500 mt-1.5" role="alert">{errors.phoneNumber}</p>}
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Website (Optional) */}
                                            <div>
                                                <label htmlFor="website" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Website <span className="text-foreground/25">(Optional)</span></label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/25">
                                                        <Icon name="GlobeAltIcon" size={16} variant="outline" />
                                                    </div>
                                                    <input
                                                        id="website"
                                                        type="url"
                                                        name="website"
                                                        value={formData.website}
                                                        onChange={handleChange}
                                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-foreground/10 bg-white text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                                                        placeholder="https://yourcompany.com"
                                                    />
                                                </div>
                                            </div>

                                            {/* Collaboration Type */}
                                            <div>
                                                <label htmlFor="collaboration-type" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Collaboration Type</label>
                                                <select
                                                    id="collaboration-type"
                                                    name="collaborationType"
                                                    value={formData.collaborationType}
                                                    onChange={handleChange}
                                                    required
                                                    aria-invalid={!!errors.collaborationType}
                                                    aria-describedby={errors.collaborationType ? 'collab-type-err' : undefined}
                                                    className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-foreground focus:outline-none transition-colors ${errors.collaborationType ? 'border-red-400 focus:border-red-500' : 'border-foreground/10 focus:border-foreground/30'}`}
                                                >
                                                    <option value="">Select type</option>
                                                    <option value="workshop">Workshop</option>
                                                    <option value="event">Event Partnership</option>
                                                    <option value="partnership">Strategic Partnership</option>
                                                    <option value="sponsorship">Sponsorship</option>
                                                    <option value="other">Other</option>
                                                </select>
                                                {errors.collaborationType && <p id="collab-type-err" className="text-xs text-red-500 mt-1.5" role="alert">{errors.collaborationType}</p>}
                                            </div>
                                        </div>

                                        {/* Project Details */}
                                        <div>
                                            <label htmlFor="project-details" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Project Details</label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-4 text-foreground/25">
                                                    <Icon name="ChatBubbleLeftIcon" size={16} variant="outline" />
                                                </div>
                                                <textarea
                                                    id="project-details"
                                                    name="projectDetails"
                                                    value={formData.projectDetails}
                                                    onChange={handleChange}
                                                    required
                                                    rows={5}
                                                    aria-invalid={!!errors.projectDetails}
                                                    aria-describedby={errors.projectDetails ? 'project-err' : undefined}
                                                    className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-sm text-foreground focus:outline-none transition-colors resize-none ${errors.projectDetails ? 'border-red-400 focus:border-red-500' : 'border-foreground/10 focus:border-foreground/30'}`}
                                                    placeholder="Tell us about your collaboration idea, goals, and what you're looking for..."
                                                />
                                            </div>
                                            {errors.projectDetails && <p id="project-err" className="text-xs text-red-500 mt-1.5" role="alert">{errors.projectDetails}</p>}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Budget (Optional) */}
                                            <div>
                                                <label htmlFor="budget" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Budget Range <span className="text-foreground/25">(Optional)</span></label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/25">
                                                        <Icon name="CurrencyRupeeIcon" size={16} variant="outline" />
                                                    </div>
                                                    <input
                                                        id="budget"
                                                        type="text"
                                                        name="budget"
                                                        value={formData.budget}
                                                        onChange={handleChange}
                                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-foreground/10 bg-white text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                                                        placeholder="e.g., ₹50,000 - ₹1,00,000"
                                                    />
                                                </div>
                                            </div>

                                            {/* Timeline (Optional) */}
                                            <div>
                                                <label htmlFor="timeline" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Timeline <span className="text-foreground/25">(Optional)</span></label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/25">
                                                        <Icon name="CalendarIcon" size={16} variant="outline" />
                                                    </div>
                                                    <input
                                                        id="timeline"
                                                        type="text"
                                                        name="timeline"
                                                        value={formData.timeline}
                                                        onChange={handleChange}
                                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-foreground/10 bg-white text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                                                        placeholder="e.g., Next 3 months"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 bg-foreground text-background rounded-full text-sm font-semibold uppercase tracking-[0.15em] hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground/50 transition-colors flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
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
    // Check if admin has a real headshot (not logo.jpeg)
    const hasHeadshot = admin.photo && admin.photo !== '/logo.jpeg';
    
    return (
        <div className="admin-card soft-card p-8 text-center group hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-300">
            {/* Portrait */}
            <div className="relative mx-auto mb-5 w-24 h-24">
                {hasHeadshot ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg ring-2 ring-foreground/5 group-hover:ring-foreground/10 transition-all duration-200">
                        <img
                            src={admin.photo}
                            alt={admin.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                ) : (
                    <div 
                        className="w-24 h-24 rounded-full shadow-lg ring-2 ring-foreground/5 group-hover:ring-foreground/10 transition-all duration-200 flex items-center justify-center text-4xl font-semibold text-white transform group-hover:scale-105"
                        style={{ background: '#C4783E' }}
                    >
                        {admin.avatar}
                    </div>
                )}
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