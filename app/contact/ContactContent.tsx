'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';
import { contactSchema, ContactFormData } from '@/lib/schemas';
import { useModals } from '@/store/modal-context';
import { ZodError } from 'zod';

const journey = [
  {
    id: "01",
    date: "SEPT '25",
    title: "The WhatsApp Genesis",
    desc: "Started as a small WhatsApp group with a simple goal: improving photography through honest, constructive feedback that social media often ignores.",
    color: "bg-[#f0f8d1]", // Light Green
    photo: "/street.jpeg"
  },
  {
    id: "02",
    date: "DEC '25",
    title: "Astrophotography Workshop",
    desc: "Our first specialized workshop on December 22nd. We took the community to the stars, teaching the nuances of capturing the cosmos.",
    color: "bg-[#e0f1ff]", // Light Blue
    photo: "/moon.jpeg"
  },
  {
    id: "03",
    date: "FEB '26",
    title: "Color Grading Mastery",
    desc: "Conducted on February 11th. Shifting focus to post-processing, we explored the art of professional color theory and grading.",
    color: "bg-[#f3e8ff]", // Lavender
    photo: "/flower2.jpeg"
  },
  {
    id: "04",
    date: "PRESENT",
    title: "The ShutterSync Hub",
    desc: "With 380+ active members and weekly challenges (COTW), we are evolving into a unified platform for courses, events, and campaigns.",
    color: "bg-[#ffe8d6]", // Peach
    photo: "/building_bnw.jpeg"
  }
];

export default function ContactContent() {
  const { dispatch } = useModals();
  const [formData, setFormData] = useState<ContactFormData>({
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
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitInquiry = useMutation(api.collaborationInquiries.submitInquiry);

  const validate = () => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        await submitInquiry(formData);
        setIsSubmitted(true);
        dispatch({
          type: 'OPEN_MODAL',
          payload: {
            type: 'SUCCESS',
            title: 'Inquiry_Received',
            message: 'Your collaboration request has been synced with our team.'
          }
        });
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
        dispatch({
          type: 'OPEN_MODAL',
          payload: {
            type: 'ERROR',
            message: 'Failed to submit inquiry. Please check your connection.'
          }
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  return (
    <main className="min-h-screen bg-white overflow-x-hidden selection:bg-orange-100 selection:text-orange-900">
      <Header />

      {/* Hero / Title Section */}
      <section className="pt-32 pb-12 border-b border-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-[120px] lg:text-[160px] font-serif uppercase leading-none tracking-tighter text-balance"
          >
            Sync <br className="sm:hidden" /> With Us
          </motion.h1>
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-foreground/40">
              ShutterSync — Photography Unified
            </span>
            <div className="h-[1px] flex-1 bg-black/10 hidden md:block mx-12" />
            <span className="text-xl md:text-2xl font-serif italic text-orange-600 text-balance block">
              Transforming <br className="sm:hidden" /> your vision, one <br className="sm:hidden" /> frame at a time.
            </span>
          </div>
        </div>
      </section>

      {/* Philosophy Grid Section */}
      <section className="border-b border-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Why We Started */}
          <div className="lg:col-span-2 border-b md:border-b-0 md:border-r border-black p-10 md:p-16 flex flex-col justify-center bg-[#e0f1ff]">
            <h2 className="text-5xl md:text-7xl font-serif uppercase mb-8 leading-tight">
              Our <br /> Philosophy
            </h2>
            <div className="space-y-6 text-lg md:text-xl font-light leading-relaxed text-black/80 max-w-xl">
              <p>
                People often share photos on Instagram, they see it, "like" and move on. Nobody actually tells you what you need to improve — whether the lighting is too harsh or the framing is just slightly off.
              </p>
              <p>
                ShutterSync was born in that gap. We believe true growth in photography comes from the constructive tension of a community that cares enough to criticize and teach.
              </p>
            </div>
          </div>

          {/* Vision Box */}
          <div className="lg:col-span-2 p-10 md:p-16 bg-white space-y-12">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-orange-600 font-bold mb-4">01 — The Vision</p>
              <h3 className="text-2xl uppercase tracking-widest font-serif mb-6">Unified Platform</h3>
              <p className="text-lg text-foreground/70 font-light max-w-md">
                We are building the definitive nexus for photography. A single platform to find top-tier courses, hands-on workshops, events, and community-led campaigns.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-black/5">
              <div className="space-y-4">
                <div>
                  <h4 className="text-4xl md:text-5xl font-serif uppercase mb-1 tracking-tighter">380+</h4>
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-foreground/40 font-bold">Active Community Members</p>
                </div>
                <a 
                  href="https://chat.whatsapp.com/DdYKdvQZZhB3FV5oSi1NcR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-600 hover:text-green-700 transition-colors"
                >
                  <Icon name="ChatBubbleLeftRightIcon" size={14} /> Join Group
                </a>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-4xl md:text-5xl font-serif uppercase mb-1 tracking-tighter">COTW</h4>
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-foreground/40 font-bold">Weekly Growth Challenges</p>
                </div>
                <a 
                  href="https://chat.whatsapp.com/DdYKdvQZZhB3FV5oSi1NcR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-600 hover:text-green-700 transition-colors"
                >
                   <Icon name="CameraIcon" size={14} /> Participate
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey Section - Bento Style */}
      <section className="bg-white border-b border-black">
        <div className="p-10 md:p-16 border-b border-black text-center">
          <h2 className="text-3xl sm:text-5xl md:text-8xl font-serif uppercase tracking-tight text-balance">
            Our <br className="sm:hidden" /> Photography <br className="sm:hidden" /> Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 min-h-[800px]">
          {/* Step 1 */}
          <div className="lg:col-span-5 border-b md:border-r border-black flex flex-col">
            <div className="p-12 space-y-8 flex-1">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-2xl font-serif uppercase">{journey[0].date}</h4>
                  <p className="text-xs uppercase tracking-widest text-black/40">{journey[0].title}</p>
                </div>
                <span className="text-5xl font-mono text-black/10">01</span>
              </div>
              <p className="text-xl font-light leading-relaxed">
                {journey[0].desc}
              </p>
            </div>
            <div className="h-64 relative overflow-hidden border-t border-black grayscale hover:grayscale-0 transition-all duration-700">
               <Image src={journey[0].photo} alt={journey[0].title} fill className="object-cover" />
            </div>
          </div>

          {/* Top Right Grid Container */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
              {/* Step 2 */}
              <div className={`${journey[1].color} border-b md:border-r border-black p-12 space-y-6 flex flex-col justify-between`}>
                 <div className="flex justify-between items-start">
                    <h4 className="text-2xl font-serif uppercase">{journey[1].date}</h4>
                    <span className="text-4xl font-mono text-black/10">02</span>
                 </div>
                 <p className="text-sm uppercase tracking-widest font-bold">{journey[1].title}</p>
                 <p className="text-base font-light">
                   {journey[1].desc}
                 </p>
              </div>

              {/* Step 3 */}
              <div className={`${journey[2].color} border-b border-black p-12 space-y-6 flex flex-col justify-between`}>
                 <div className="flex justify-between items-start">
                    <h4 className="text-2xl font-serif uppercase">{journey[2].date}</h4>
                    <span className="text-4xl font-mono text-black/10">03</span>
                 </div>
                 <p className="text-sm uppercase tracking-widest font-bold">{journey[2].title}</p>
                 <p className="text-base font-light">
                   {journey[2].desc}
                 </p>
              </div>
            </div>

            {/* Bottom Large Block (Step 4) */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 items-stretch">
               <div className="md:col-span-2 p-12 space-y-8 border-b md:border-b-0 md:border-r border-black flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-4xl font-serif uppercase tracking-tighter">{journey[3].title}</h4>
                    <span className="text-6xl font-mono text-black/10">04</span>
                  </div>
                  <p className="text-xl font-light">
                    {journey[3].desc}
                  </p>
                  <div className="pt-6">
                    <a href="mailto:shuttersync.official@gmail.com" className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full text-xs uppercase tracking-[0.2em] hover:bg-orange-600 transition-colors duration-300">
                      Sync with our team <Icon name="ArrowRightIcon" size={14} />
                    </a>
                  </div>
               </div>
               <div className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 min-h-[300px]">
                  <Image src={journey[3].photo} alt={journey[3].title} fill className="object-cover" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="border-b border-black bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Illustration + Intro */}
          <div className="p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-black flex flex-col justify-center items-center text-center bg-[#f0f8d1]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
               {/* Camera Illustration */}
               <svg width="180" height="140" viewBox="0 0 200 160" fill="none" className="opacity-40">
                  <rect x="30" y="50" width="140" height="90" rx="10" stroke="black" strokeWidth="2.5" />
                  <circle cx="100" cy="95" r="30" stroke="black" strokeWidth="2.5" />
                  <circle cx="100" cy="95" r="12" stroke="black" strokeWidth="2.5" />
                  <rect x="75" y="35" width="50" height="15" rx="5" stroke="black" strokeWidth="2.5" />
                  <circle cx="145" cy="65" r="4" fill="black" />
               </svg>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-serif uppercase tracking-tight mb-6">Let's <br/> Collaborate</h2>
            <p className="text-lg md:text-xl font-light text-black/60 max-w-sm mb-12 text-balance">
              Partner with ShutterSync for workshops, events, sponsorships, and large-scale photography campaigns.
            </p>

            <div className="space-y-6 text-left w-full max-w-xs">
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                <div className="w-10 h-10 border border-black flex items-center justify-center bg-white rotate-3">
                  <Icon name="EnvelopeIcon" size={16} />
                </div>
                <span>shuttersyncofficial1@gmail.com</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-black flex items-center justify-center bg-white shrink-0 rotate-2 mt-0.5">
                  <Icon name="PhoneIcon" size={16} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">Support &amp; Assistance</p>
                  <div className="flex flex-col gap-0.5">
                    <a href="https://wa.me/919460272387" className="text-xs font-bold uppercase tracking-widest text-black hover:text-green-600 transition-colors">+91 94602 72387</a>
                    <a href="https://wa.me/919455955981" className="text-xs font-bold uppercase tracking-widest text-black hover:text-green-600 transition-colors">+91 94559 55981</a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                <div className="w-10 h-10 border border-black flex items-center justify-center bg-white -rotate-3">
                  <Icon name="MapPinIcon" size={16} />
                </div>
                <span>India / Remote</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="p-10 md:p-16 bg-white">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 border-2 border-green-500/20">
                    <Icon name="CheckCircleIcon" size={48} className="text-green-600" variant="solid" />
                  </div>
                  <h3 className="text-4xl font-serif uppercase mb-4 tracking-tight">Sync Established!</h3>
                  <p className="text-foreground/50 mb-10 max-w-sm">
                    We've received your inquiry and will be in touch shortly to discuss the next frame of our journey.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-10 py-4 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Org Type */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">Organization Type</label>
                      <select 
                        name="organizationType"
                        value={formData.organizationType}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b-2 outline-none py-3 font-serif text-lg transition-colors ${errors.organizationType ? 'border-red-500' : 'border-black focus:border-orange-600'}`}
                      >
                        <option value="">Select type</option>
                        <option value="company">Company</option>
                        <option value="organization">Organization</option>
                        <option value="personal">Individual Professional</option>
                      </select>
                    </div>

                    {/* Org Name */}
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">Organization Name</label>
                       <input 
                        type="text" 
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleChange}
                        placeholder="Company Ltd."
                        className={`w-full bg-transparent border-b-2 outline-none py-3 font-serif text-lg transition-colors ${errors.organizationName ? 'border-red-500' : 'border-black focus:border-orange-600'}`}
                       />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Person */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">Contact Person</label>
                      <input 
                        type="text" 
                        name="contactPersonName"
                        value={formData.contactPersonName}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className={`w-full bg-transparent border-b-2 outline-none py-3 font-serif text-lg transition-colors ${errors.contactPersonName ? 'border-red-500' : 'border-black focus:border-orange-600'}`}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">Email Address</label>
                       <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className={`w-full bg-transparent border-b-2 outline-none py-3 font-serif text-lg transition-colors ${errors.email ? 'border-red-500' : 'border-black focus:border-orange-600'}`}
                       />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        className={`w-full bg-transparent border-b-2 outline-none py-3 font-serif text-lg transition-colors ${errors.phoneNumber ? 'border-red-500' : 'border-black focus:border-orange-600'}`}
                      />
                    </div>

                    {/* Collab Type */}
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">Collaboration Type</label>
                       <select 
                        name="collaborationType"
                        value={formData.collaborationType}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b-2 outline-none py-3 font-serif text-lg transition-colors ${errors.collaborationType ? 'border-red-500' : 'border-black focus:border-orange-600'}`}
                      >
                        <option value="">Select type</option>
                        <option value="workshop">Workshop</option>
                        <option value="event">Event Partnership</option>
                        <option value="sponsorship">Sponsorship</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">Project Details</label>
                    <textarea 
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your vision..."
                      className={`w-full bg-transparent border-b-2 outline-none py-3 font-serif text-lg transition-colors resize-none ${errors.projectDetails ? 'border-red-500' : 'border-black focus:border-orange-600'}`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Budget */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">Budget Range (Optional)</label>
                      <input 
                        type="text" 
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        placeholder="e.g. ₹50k - ₹1L"
                        className="w-full bg-transparent border-b-2 border-black outline-none py-3 font-serif text-lg focus:border-orange-600 transition-colors"
                      />
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">Timeline (Optional)</label>
                       <input 
                        type="text" 
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        placeholder="e.g. Next 30 days"
                        className="w-full bg-transparent border-b-2 border-black outline-none py-3 font-serif text-lg focus:border-orange-600 transition-colors"
                       />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 bg-black text-white rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-orange-600 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}