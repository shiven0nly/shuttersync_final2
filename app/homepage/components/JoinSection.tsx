'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const benefits = [
  { icon: 'UserGroupIcon', title: 'Community', description: 'Connect with passionate photographers who share your vision.' },
  { icon: 'AcademicCapIcon', title: 'Learning', description: 'Access workshops, mentorship, and hands-on learning sessions.' },
  { icon: 'TrophyIcon', title: 'Challenges', description: 'Sharpen your skills through weekly themed photo challenges.' },
  { icon: 'GlobeAltIcon', title: 'Networking', description: 'Build professional connections and collaboration opportunities.' },
];

export default function JoinSection() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    portfolio: '',
    experience: 'beginner',
    message: '',
  });

  useEffect(() => { setIsHydrated(true); }, []);

  useEffect(() => {
    if (!isHydrated || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.benefit-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isHydrated]);

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setFormData({ name: '', email: '', portfolio: '', experience: 'beginner', message: '' });
    setPhotoPreview(null);
    setErrors({});
  };

  return (
    <section id="join" ref={sectionRef} className="py-36 px-6 lg:px-8 bg-background border-t border-black/[0.06]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block py-1.5 px-4 border border-foreground/15 rounded-full text-[10px] tracking-[0.2em] uppercase text-foreground/60 mb-6">
            Join Us
          </span>
          <h2 className="text-4xl md:text-6xl font-serif italic text-foreground mb-6 text-balance">
            Become a Member
          </h2>
          <p className="text-lg text-foreground/50 max-w-2xl mx-auto text-pretty">
            Join our community of passionate photographers and be part of a collective that celebrates visual storytelling.
          </p>
        </div>

        {/* Why Join? Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {benefits.map((benefit, i) => (
            <div
              key={`benefit_${i}`}
              className="benefit-card soft-card p-6 text-center group hover:translate-y-[-2px] transition-transform duration-200"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors duration-200"
                style={{ background: i % 2 === 0 ? 'rgba(196, 120, 62, 0.08)' : 'rgba(230, 126, 34, 0.08)' }}
              >
                <Icon
                  name={benefit.icon as any}
                  size={24}
                  variant="outline"
                  style={{ color: i % 2 === 0 ? '#C4783E' : '#E67E22' }}
                />
              </div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">{benefit.title}</h4>
              <p className="text-xs text-foreground/50 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="soft-card-inset p-8 md:p-12">
          {submitted ? (
            /* Success State */
            <div className="animate-success text-center py-16">
              <div className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'rgba(196, 120, 62, 0.1)' }}>
                <Icon name="CheckCircleIcon" size={48} variant="solid" style={{ color: '#C4783E' }} />
              </div>
              <h3 className="text-3xl font-serif text-foreground mb-4">Welcome Aboard!</h3>
              <p className="text-base text-foreground/50 max-w-md mx-auto mb-8 text-pretty">
                Thank you for your interest, {formData.name}! We&apos;ll review your application and get back to you soon.
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 hover:underline"
                style={{ color: '#C4783E' }}
                type="button"
              >
                Submit Another Application
                <Icon name="ArrowRightIcon" size={14} variant="outline" />
              </button>
            </div>
          ) : (
            <>
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-2 mb-10">
                <button
                  onClick={() => setStep(1)}
                  className={`progress-step w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold border border-foreground/20 ${step === 1 ? 'active' : step > 1 ? 'completed' : ''
                    }`}
                  type="button"
                  aria-label="Step 1: Personal Info"
                >
                  {step > 1 ? <Icon name="CheckIcon" size={16} variant="outline" /> : '1'}
                </button>
                <div className="w-16 h-[2px] rounded-full" style={{ background: step > 1 ? '#C4783E' : 'rgba(0,0,0,0.1)' }} />
                <div
                  className={`progress-step w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold border border-foreground/20 ${step === 2 ? 'active' : ''
                    }`}
                >
                  2
                </div>
                <div className="ml-4 text-xs text-foreground/40 uppercase tracking-wider hidden sm:block">
                  {step === 1 ? 'Personal Info' : 'Photography Details'}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-8">
                    {/* Photo Upload */}
                    <div className="flex justify-center mb-4">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="relative w-24 h-24 rounded-full border-2 border-dashed border-foreground/15 flex items-center justify-center overflow-hidden hover:border-foreground/30 transition-colors duration-200 group"
                        aria-label="Upload profile photo"
                      >
                        {photoPreview ? (
                          <img src={photoPreview} alt="Profile preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center">
                            <Icon name="CameraIcon" size={24} variant="outline" className="text-foreground/30 mx-auto group-hover:text-foreground/50 transition-colors" />
                            <span className="text-[8px] text-foreground/30 mt-1 block uppercase tracking-wider">Photo</span>
                          </div>
                        )}
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        aria-label="Profile photo upload"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="join-name" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-3">Full Name</label>
                        <input
                          id="join-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          className={`w-full bg-transparent border-b py-3 text-sm text-foreground focus:outline-none transition-colors ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-foreground/10 focus:border-foreground'
                            }`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p id="name-error" className="text-xs text-red-500 mt-2" role="alert">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="join-email" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-3">Email Address</label>
                        <input
                          id="join-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          className={`w-full bg-transparent border-b py-3 text-sm text-foreground focus:outline-none transition-colors ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-foreground/10 focus:border-foreground'
                            }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p id="email-error" className="text-xs text-red-500 mt-2" role="alert">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-10 py-4 bg-foreground text-background rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 flex items-center gap-3"
                      >
                        Next Step
                        <Icon name="ArrowRightIcon" size={14} variant="outline" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="join-portfolio" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-3">Portfolio URL</label>
                        <input
                          id="join-portfolio"
                          type="url"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-foreground/10 py-3 text-sm text-foreground focus:outline-none focus:border-foreground transition-colors"
                          placeholder="https://yourportfolio.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="join-experience" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-3">Experience Level</label>
                        <div className="relative">
                          <select
                            id="join-experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-foreground/10 py-3 text-sm text-foreground focus:outline-none focus:border-foreground transition-colors appearance-none cursor-pointer"
                          >
                            <option value="beginner">Beginner (0-2 years)</option>
                            <option value="intermediate">Intermediate (3-5 years)</option>
                            <option value="advanced">Advanced (5+ years)</option>
                            <option value="professional">Professional</option>
                          </select>
                          <div className="absolute right-0 top-3 pointer-events-none text-foreground/40">
                            <Icon name="ChevronDownIcon" size={16} variant="outline" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="join-message" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-3">Tell Us About Your Photography</label>
                      <textarea
                        id="join-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-white border border-foreground/10 rounded-xl p-4 text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                        placeholder="Share your passion, style, and what you hope to achieve..."
                      />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-foreground/10">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors duration-200"
                      >
                        <Icon name="ArrowLeftIcon" size={14} variant="outline" />
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-full md:w-auto px-12 py-4 bg-foreground hover:bg-foreground/90 text-background rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 flex items-center justify-center gap-3 group"
                      >
                        Submit Application
                        <Icon name="ArrowRightIcon" size={16} variant="outline" className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}