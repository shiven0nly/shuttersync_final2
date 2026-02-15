'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const admins = [
    {
        id: 1,
        name: 'Rajnish',
        role: 'Community Lead',
        mobile: '9455955981',
        bio: 'Passionate about building creative communities and connecting photographers across all skill levels.',
        avatar: 'R',
        gradient: 'from-blue-500 to-indigo-600',
    },
    {
        id: 2,
        name: 'Aquib',
        role: 'Technical Lead',
        mobile: '8758675845',
        bio: 'Blending technology and photography to create seamless digital experiences for the community.',
        avatar: 'A',
        gradient: 'from-emerald-500 to-teal-600',
    },
    {
        id: 3,
        name: 'Sampada',
        role: 'Creative Director',
        mobile: '8849299142',
        bio: 'Curating visual experiences and ensuring every photo challenge sparks creativity and growth.',
        avatar: 'S',
        gradient: 'from-purple-500 to-pink-600',
    },
    {
        id: 4,
        name: 'Maitri',
        role: 'Events Coordinator',
        mobile: '8200052219',
        bio: 'Organizing photo walks, workshops, and events that bring the community together in real life.',
        avatar: 'M',
        gradient: 'from-amber-500 to-orange-600',
    },
];

export default function ContactContent() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="pt-28 pb-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <span className="inline-block py-1.5 px-4 border border-foreground/15 rounded-full text-[10px] tracking-[0.2em] uppercase text-foreground/60 mb-6">
                        Get in Touch
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif italic text-foreground mb-4">
                        Meet the Admins
                    </h1>
                    <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
                        The passionate team behind ShutterSync. Reach out to us anytime — we&apos;d love to hear from you.
                    </p>
                </div>

                {/* Admin Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {admins.map((admin) => (
                        <div key={admin.id} className="soft-card p-6 text-center group hover:scale-[1.02] transition-transform duration-500">
                            {/* Avatar */}
                            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${admin.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                <span className="text-2xl font-serif font-bold text-white">{admin.avatar}</span>
                            </div>

                            <h3 className="text-xl font-serif text-foreground mb-1">{admin.name}</h3>
                            <p className="text-xs uppercase tracking-wider text-foreground/40 mb-3">{admin.role}</p>
                            <p className="text-sm text-foreground/50 font-light leading-relaxed mb-4">{admin.bio}</p>

                            <a
                                href={`tel:${admin.mobile}`}
                                className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
                            >
                                <Icon name="PhoneIcon" size={14} variant="outline" />
                                <span>{admin.mobile}</span>
                            </a>
                        </div>
                    ))}
                </div>

                {/* Contact Form */}
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-serif text-foreground mb-3">Drop us a message</h2>
                        <p className="text-foreground/50">Have a question or suggestion? We&apos;d love to hear from you.</p>
                    </div>

                    <div className="soft-card p-8 md:p-10">
                        {isSubmitted ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                    <Icon name="CheckCircleIcon" size={32} variant="solid" className="text-green-600" />
                                </div>
                                <h3 className="text-xl font-serif text-foreground mb-2">Message Sent!</h3>
                                <p className="text-foreground/50 text-sm">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                                <button onClick={() => setIsSubmitted(false)}
                                    className="mt-6 text-sm text-foreground/40 hover:text-foreground underline transition-colors">
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-white text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                                            placeholder="Your name" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Email</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-white text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                                            placeholder="you@example.com" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Subject</label>
                                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} required
                                        className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-white text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                                        placeholder="What's this about?" />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Message</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
                                        className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-white text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                                        placeholder="Tell us what's on your mind..." />
                                </div>
                                <button type="submit"
                                    className="w-full py-4 bg-foreground text-background rounded-full text-sm font-semibold uppercase tracking-[0.15em] hover:bg-foreground/90 transition-all">
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
