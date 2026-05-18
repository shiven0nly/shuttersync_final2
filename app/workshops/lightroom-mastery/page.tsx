'use client';

import { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery, useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon, ArrowDownTrayIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

const WORKSHOP_ID = 3;
const GOOGLE_DRIVE_LINK = 'https://drive.google.com/drive/folders/1dDCiNyplLq9H955MU-ob4SjjCsWGRbgS';
const DEADLINE = 'February 23, 2025, 11:59 PM IST';

// Available stamps for the feedback feature
const STAMPS = ['👍', '❤️', '🌟', '+1', '🔥', '👀'];

export default function LightroomMasteryWorkshopPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [driveLink, setDriveLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Stamp Feature State
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);
  const [placedStamps, setPlacedStamps] = useState<{ id: number, x: number, y: number, emoji: string }[]>([]);
  const pageRef = useRef<HTMLDivElement>(null);

  const registration = useQuery(
    api.registrations.getUserRegistration,
    user ? { userId: user.id, workshopId: WORKSHOP_ID } : 'skip'
  );

  const submission = useQuery(
    api.workshopSubmissions.getUserSubmission,
    user ? { userId: user.id, workshopId: WORKSHOP_ID } : 'skip'
  );

  const dbUser = useQuery(api.users.getUser, user ? { userId: user.id } : 'skip');

  const submitAssignment = useMutation(api.workshopSubmissions.submitAssignment);

  useEffect(() => {
    if (submission) {
      setVideoCompleted(submission.videoCompleted);
      setDriveLink(submission.driveLink);
    }
  }, [submission]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !registration) return;

    setIsSubmitting(true);
    try {
      await submitAssignment({
        userId: user.id,
        registrationId: registration._id,
        workshopId: WORKSHOP_ID,
        fullName: registration.fullName,
        email: registration.email,
        driveLink,
        videoCompleted,
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = async (filename: string) => {
    try {
      const link = document.createElement('a');
      link.href = `/${filename}`;
      link.download = filename.split('/').pop() || 'download.zip';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert('Failed to download file. Please try again.');
    }
  };

  const handlePageClick = (e: React.MouseEvent) => {
    if (!selectedStamp || !pageRef.current) return;
    
    // Ignore clicks on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('.stamp-toolbar')) {
      return;
    }

    const rect = pageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPlacedStamps([...placedStamps, { id: Date.now(), x: e.pageX, y: e.pageY, emoji: selectedStamp }]);
    setSelectedStamp(null); // Optional: deselect after one use
  };

  const isLoading = !isLoaded || (!!user && registration === undefined);
  const hasAccess = !!(user && registration && registration.status === 'active');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Curriculum modules for the landing page
  const modules = [
    {
      num: "01",
      title: "The Digital Darkroom Foundation",
      description: "Conquer the Lightroom interface, master catalog organization, and understand RAW vs JPEG dynamics for non-destructive, lightning-fast workflows.",
      bg: "bg-[#FFE500]",
      textColor: "text-black",
      details: ["Importing & Cataloging", "Smart Previews Workflow", "Global Adjustments", "Histogram Interpretation"]
    },
    {
      num: "02",
      title: "Advanced Masking & Local Adjustments",
      description: "Dive deep into AI-powered masking. Master subject and sky selections, luminance/color range masks, and brush refinement techniques.",
      bg: "bg-[#3b82f6]",
      textColor: "text-white",
      details: ["AI Subject & Sky Selection", "Linear & Radial Gradients", "Luminance & Color Ranges", "Intersecting Masking Workflows"]
    },
    {
      num: "03",
      title: "Cinematic Color Theory & Grading",
      description: "Learn how to use color wheels, HSL panels, and tone curves to create signature color grades that set your work apart in a crowded market.",
      bg: "bg-[#ec4899]",
      textColor: "text-white",
      details: ["Complementary Color Grading", "Mastering Tone Curves", "HSL & Color Mixer Panels", "Creating Moody Cinematic Vibes"]
    },
    {
      num: "04",
      title: "Signature Presets & High-Res Export",
      description: "Build reusable preset packs, master sharpening & noise reduction algorithms, and configure bulletproof export templates for print and socials.",
      bg: "bg-[#f97316]",
      textColor: "text-white",
      details: ["Creating Professional Presets", "Advanced Sharpening", "Noise Reduction (AI-Powered)", "Print & Web Export Settings"]
    }
  ];

  if (!hasAccess) {
    return (
      <div 
        className="min-h-screen bg-[#f8f9fa] pt-32 pb-20 relative overflow-hidden font-sans flex flex-col justify-between"
        style={{
          backgroundImage: 'radial-gradient(#d1d5db 2px, transparent 2px)',
          backgroundSize: '30px 30px'
        }}
      >
        <Header />
        
        {/* Style block for animations */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            animation: marquee 25s linear infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(-1deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
        `}</style>

        {/* Floating background shapes */}
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 w-full flex-1">
          
          {/* Back button */}
          <Link href="/workshops" className="inline-flex items-center gap-2 text-black hover:text-gray-600 font-bold mb-8 text-sm group">
            <span className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center group-hover:-translate-x-1 transition-transform bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              ←
            </span>
            Back to Workshops
          </Link>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block bg-[#FFE500] text-black border-3 border-black px-4 py-1.5 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0_0_#000] rotate-[-1.5deg]">
                ⚡ LIVE & HANDS-ON WORKSHOP
              </div>
              
              <div className="relative">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-black tracking-tight leading-[0.95] uppercase italic text-left">
                  Lightroom<br />
                  <span className="text-blue-500 drop-shadow-[4px_4px_0_#000]">Mastery_</span>
                </h1>
                {/* Highlighter accents */}
                <div className="absolute bottom-2 left-0 w-4/5 h-4 bg-yellow-300 -z-10 -rotate-1" />
              </div>

              <p className="text-xl md:text-2xl font-bold text-gray-800 leading-snug border-l-6 border-black pl-6 py-2 text-left">
                Ditch the guesswork. Master professional post-processing workflows, advanced AI masking, and cinematic color grading.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {["100% Hands-on", "Premium Presets Included", "Verifiable Certificate", "Lifetime Access"].map((tag, idx) => (
                  <span key={idx} className="bg-white border-2 border-black px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                    ✦ {tag}
                  </span>
                ))}
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
                <Link
                  href="/workshops/lightroom-mastery/register"
                  className="flex items-center justify-center gap-3 px-8 py-5 bg-black text-white border-4 border-black font-black rounded-xl shadow-[8px_8px_0_0_rgba(59,130,246,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0_0_rgba(59,130,246,1)] transition-all uppercase tracking-wider text-base text-center group"
                >
                  <span>Register Now for ₹99</span>
                  <span className="group-hover:translate-x-1 transition-transform">⚡</span>
                </Link>
                <div className="flex flex-col justify-center text-center sm:text-left bg-white border-3 border-black p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rotate-[1deg]">
                  <span className="text-sm font-black text-slate-500 line-through">Valued at ₹499</span>
                  <span className="text-2xl font-black text-rose-500">₹99 ONLY (Save 80%)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Premium Neo-Brutalist Frame with Course Preview */}
              <div className="w-full max-w-[420px] bg-white border-4 border-black p-4 rounded-[2rem] shadow-[12px_12px_0_0_rgba(0,0,0,1)] rotate-[2deg] hover:rotate-0 transition-transform duration-500 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-3 bg-blue-500 border-b-3 border-black" />
                
                {/* Course Thumbnail image with overlay */}
                <div className="aspect-[4/3] bg-zinc-900 rounded-2xl border-3 border-black overflow-hidden relative mb-6">
                  {/* We can use a premium illustration or background */}
                  <div className="absolute inset-0 bg-[url('/heroSectionbg.jpg')] bg-cover bg-center opacity-85 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                  

                  <span className="absolute bottom-4 left-4 bg-black text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 border-2 border-white rounded-md">
                    COURSE PREVIEW BELOW
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest text-blue-600">Curriculum Agenda</span>
                    <span className="bg-purple-100 border-2 border-black text-[10px] font-black uppercase px-2 py-0.5 rounded-full">4 MODULES</span>
                  </div>
                  <h3 className="text-2xl font-black text-black leading-tight uppercase italic text-left">The Digital Lightroom Mastery</h3>
                  <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase text-left">
                    Comprehensive training built to save you thousands of editing hours and unlock true creative potential.
                  </p>
                </div>
              </div>

              {/* Floating Star Badges */}
              <div className="absolute -top-6 -right-4 bg-rose-500 text-white border-3 border-black px-4 py-2 font-black uppercase text-[10px] shadow-[4px_4px_0_0_#000] rotate-[8deg] z-20 animate-bounce">
                SEATS FILLING FAST! ⚡
              </div>
            </div>
          </div>

          {/* Marquee Banner */}
          <div className="w-full bg-[#FFE500] border-4 border-black rounded-xl overflow-hidden mb-24 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
            <div className="animate-marquee py-3 flex items-center">
              <span className="text-sm font-black uppercase tracking-widest text-black flex shrink-0 items-center gap-4">
                <span>⚡ MASTER MASKS & RANGE CONTROLS</span> <span className="text-lg">✦</span>
                <span>⚡ CINEMATIC COLOR WHEELS</span> <span className="text-lg">✦</span>
                <span>⚡ WORKFLOW COMPRESSION</span> <span className="text-lg">✦</span>
                <span>⚡ ONE-CLICK PRESET CREATION</span> <span className="text-lg">✦</span>
              </span>
              <span className="text-sm font-black uppercase tracking-widest text-black flex shrink-0 items-center gap-4">
                <span>⚡ MASTER MASKS & RANGE CONTROLS</span> <span className="text-lg">✦</span>
                <span>⚡ CINEMATIC COLOR WHEELS</span> <span className="text-lg">✦</span>
                <span>⚡ WORKFLOW COMPRESSION</span> <span className="text-lg">✦</span>
                <span>⚡ ONE-CLICK PRESET CREATION</span> <span className="text-lg">✦</span>
              </span>
            </div>
          </div>

          {/* Masterclass Agenda / Curriculum Section */}
          <div className="space-y-12 mb-24">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-orange-500 font-black text-xs uppercase tracking-[0.3em] block">CURRICULUM AGENDA</span>
              <h2 className="text-4xl md:text-6xl font-black text-black tracking-tight uppercase italic leading-none">
                What You Will Learn_
              </h2>
              <div className="w-24 h-2 bg-black mx-auto rounded-full" />
              <p className="text-base font-bold text-slate-500 uppercase tracking-tighter max-w-lg mx-auto">
                No fluff. Just highly actionable editing workflows built specifically for modern storytellers and creative photographers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {modules.map((m, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border-4 border-black rounded-[2rem] p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative overflow-hidden group hover:translate-x-1 hover:translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all flex flex-col"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-5xl font-black italic tracking-tighter text-slate-200 group-hover:text-blue-500/20 transition-colors">
                      {m.num}
                    </span>
                    <div className={`px-4 py-1.5 border-2 border-black rounded-full font-black text-xs uppercase tracking-widest ${m.bg} ${m.textColor} rotate-[-2deg]`}>
                      MODULE {m.num}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-black mb-4 uppercase italic tracking-tight text-left">
                    {m.title}
                  </h3>
                  <p className="text-sm font-bold text-slate-600 mb-8 leading-relaxed uppercase text-left">
                    {m.description}
                  </p>

                  <div className="mt-auto space-y-3 pt-6 border-t-2 border-dashed border-slate-200">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block text-left">KEY TAKEAWAYS:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {m.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 bg-green-400 border-2 border-black rounded-full shrink-0" />
                          <span className="text-xs font-black uppercase tracking-tight text-slate-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Masterclass Bonuses / Goodies */}
          <div className="bg-[#1890ff] text-white border-4 border-black rounded-[2.5rem] p-8 md:p-12 shadow-[12px_12px_0_0_rgba(0,0,0,1)] relative overflow-hidden mb-24 rotate-[-0.5deg]">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="bg-[#FFE500] text-black border-2 border-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest inline-block rotate-[2deg]">
                  🔥 EXCLUSIVE SIGNUP BONUSES (WORTH ₹999+)
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase italic leading-none text-left">
                  Unbelievable Bonuses Included For Free!
                </h2>
                <p className="text-base md:text-lg font-bold text-blue-100 uppercase tracking-tighter text-left">
                  We don't want anything holding you back from mastering Lightroom. That's why we're giving you everything you need to start editing immediately.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  {[
                    { title: "3 Premium DNG Presets", desc: "Monochrome Love, Purple Fever, and Retro Vapourwave signature looks." },
                    { title: "Sample RAW Images", desc: "High-resolution raw files to follow along with the instructor step-by-step." },
                    { title: "Verifiable Certificate", desc: "Earn a high-contrast verifiable certificate on course completion." },
                    { title: "WhatsApp Community Access", desc: "Ongoing peer support, challenges, weekly reviews, and priority updates." }
                  ].map((b, bIdx) => (
                    <div key={bIdx} className="bg-white/10 border-2 border-white/20 p-4 rounded-2xl relative">
                      <span className="absolute -top-3 -left-3 w-8 h-8 bg-[#FFE500] border-2 border-black text-black rounded-full flex items-center justify-center text-sm font-black rotate-[-10deg]">
                        🎁
                      </span>
                      <h4 className="font-black text-base uppercase tracking-tight text-white pl-4 mb-1 text-left">{b.title}</h4>
                      <p className="text-xs font-medium text-blue-100 uppercase pl-4 text-left">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white border-4 border-black p-8 rounded-[2rem] shadow-[8px_8px_0_0_#000] rotate-[1.5deg] text-black">
                <span className="text-5xl mb-4 animate-bounce">🎁</span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-center italic mb-2">Claim All Bonuses Now</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center mb-6">
                  Included free when you register for the Lightroom Masterclass today!
                </p>
                <div className="w-full text-center border-t-2 border-dashed border-slate-200 pt-6">
                  <span className="text-sm font-black text-slate-400 line-through block uppercase">TOTAL VALUE: ₹999</span>
                  <span className="text-4xl font-black text-[#52c41a] block uppercase mt-1 drop-shadow-[1px_1px_0_#000]">₹99 ONLY</span>
                </div>
                
                <Link
                  href="/workshops/lightroom-mastery/register"
                  className="w-full mt-6 py-4 bg-[#FFE500] hover:bg-yellow-400 text-black border-3 border-black font-black uppercase text-xs tracking-wider rounded-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2"
                >
                  <span>SECURE YOUR SPOT NOW</span>
                  <span>⚡</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Pricing FAQ section / Final Urgency Callout */}
          <div className="bg-white border-4 border-black rounded-[2.5rem] p-8 md:p-12 shadow-[8px_8px_0_0_rgba(0,0,0,1)] text-center relative overflow-hidden mb-12">
            <div className="absolute top-0 left-0 w-full h-3 bg-rose-500 border-b-3 border-black" />
            <h2 className="text-3xl md:text-5xl font-black text-black mb-4 uppercase italic">Ready To Elevate Your Edit?</h2>
            <p className="text-lg font-bold text-slate-500 uppercase tracking-widest max-w-2xl mx-auto mb-8">
              Join hundreds of passionate photographers refining their digital darkroom techniques. Instant access upon secure UPI registration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/workshops/lightroom-mastery/register"
                className="w-full sm:w-auto px-10 py-5 bg-black hover:bg-slate-900 text-white border-4 border-black font-black uppercase text-lg rounded-xl shadow-[6px_6px_0_0_rgba(59,130,246,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(59,130,246,1)] transition-all flex items-center justify-center gap-3 group"
              >
                <span>Unlock Lightroom Mastery</span>
                <span className="group-hover:translate-x-1 transition-transform">⚡</span>
              </Link>

              <Link
                href="/workshops"
                className="w-full sm:w-auto px-10 py-5 bg-white hover:bg-slate-50 text-black border-4 border-black font-black uppercase text-lg rounded-xl shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all text-center"
              >
                Explore Other Workshops
              </Link>
            </div>

            {/* Support footer section */}
            <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-200">
              <p className="text-xs font-black uppercase text-slate-400 tracking-wider">
                ⚡ QUESTIONS? CONCERNS? GET INSTANT HELP OVER WHATSAPP:
              </p>
              <div className="mt-4 flex flex-wrap gap-4 justify-center">
                <a
                  href="https://wa.me/919460272387?text=Hi! I have questions regarding the Lightroom Mastery Masterclass."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#25D366] text-white border-2 border-black text-xs font-black uppercase rounded-lg shadow-[3px_3px_0_0_#000] hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000] transition-all"
                >
                  💬 Support Line 1
                </a>
                <a
                  href="https://wa.me/919455955981?text=Hi! I have questions regarding the Lightroom Mastery Masterclass."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#25D366] text-white border-2 border-black text-xs font-black uppercase rounded-lg shadow-[3px_3px_0_0_#000] hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000] transition-all"
                >
                  💬 Support Line 2
                </a>
              </div>
            </div>
          </div>

        </div>
        
        
            {/* Custom Neo-Brutalist Footer */}
            <footer className="w-full bg-[#000]  border-t-[8px] border-black mt-20 relative overflow-hidden z-10">
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

  const isApproved = submission?.status === 'approved';
  const isPending = submission?.status === 'pending';
  const isRejected = submission?.status === 'rejected';

  return (
    <div 
      className="min-h-screen bg-[#f8f9fa] pt-32 pb-40 px-6 relative overflow-hidden font-sans cursor-crosshair"
      style={{
        backgroundImage: 'radial-gradient(#d1d5db 2px, transparent 2px)',
        backgroundSize: '30px 30px'
      }}
      onClick={handlePageClick}
      ref={pageRef}
    >
      {/* Hand-drawn decorative elements floating in background */}
      <svg className="absolute top-20 right-20 w-32 h-32 text-pink-400 opacity-50 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" />
      </svg>
      <svg className="absolute bottom-40 left-10 w-48 h-48 text-orange-400 opacity-40 pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 100 Q 50 10, 100 100 T 190 100" />
      </svg>

      {/* Render Placed Stamps */}
      {placedStamps.map(stamp => (
        <div 
          key={stamp.id} 
          className="absolute text-4xl animate-in zoom-in spin-in-12 duration-300 pointer-events-none drop-shadow-md"
          style={{ left: stamp.x - 20, top: stamp.y - 20, zIndex: 50 }}
        >
          {stamp.emoji}
        </div>
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header - Miro Style */}
        <div className="mb-16 relative">
          <Link href="/workshops/lightroom-mastery/register" className="inline-flex items-center gap-2 text-black hover:text-gray-600 font-bold mb-8 text-sm group">
            <span className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            Back Registration
          </Link>
          
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-8xl font-black text-black tracking-tight md:tracking-tighter mb-4 relative z-10 mix-blend-multiply">
              Lightroom<br />Mastery.
            </h1>
            {/* Highlighter effect */}
            <div className="absolute bottom-6 left-0 w-full h-8 bg-pink-300/80 -rotate-1 -z-10" />
            <div className="absolute top-6 left-1/2 w-full h-8 bg-yellow-300/80 rotate-2 -z-10" />
          </div>
          
          <p className="text-xl text-gray-700 font-medium max-w-lg mt-6 bg-white p-4 border-2 border-black rounded-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] -rotate-1">
            Hey {registration.fullName.split(' ')[0]}! Welcome to your digital workspace.
          </p>

          {dbUser && (
            <div className="mt-8 relative inline-block z-20">
              <button
                onClick={() => {
                  const url = `${window.location.origin}/?ref=${dbUser.referralCode}`;
                  navigator.clipboard.writeText(url);
                  alert('Referral link copied! Share it to earn S² Cash.');
                }}
                className="flex items-center gap-3 px-6 py-4 bg-orange-400 text-white border-4 border-black font-black rounded-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
              >
                <span className="text-2xl drop-shadow-sm">🔗</span> 
                <span>Copy Referral Link<br /><span className="text-sm font-bold opacity-90 text-yellow-100">Earn 50 S² Cash per friend!</span></span>
              </button>
              <div className="absolute -bottom-6 left-12 w-8 h-8 border-l-4 border-b-4 border-black rounded-bl-xl pointer-events-none" />
            </div>
          )}
        </div>

        {/* WhatsApp Group Links Neo-Brutalist Box */}
        <div className="mb-12 bg-white border-4 border-black rounded-[2rem] p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative overflow-hidden group hover:translate-x-[2px] hover:translate-y-[2px] transition-transform hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          {/* Header Accent Bar */}
          <div className="absolute top-0 left-0 w-full h-3 bg-[#25D366] border-b-[3px] border-black" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border-[3px] border-black flex items-center justify-center rotate-3 shrink-0">
                  <span className="text-xl">💬</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight uppercase italic">
                  Join_The_Groups
                </h2>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800 uppercase tracking-tight">
                  Follow this link to join Workshop WhatsApp group for updates:
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  Connect with fellow Lightroom Masterclass attendees and mentors.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              {/* Workshop Group Link Button */}
              <Link
                href="https://chat.whatsapp.com/CW5iLBntSka5PqP37L3F3j"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] text-white border-[3px] border-black font-black rounded-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all uppercase text-xs tracking-wider"
              >
                <span>Workshop Group</span>
                <span className="text-lg">⚡</span>
              </Link>

              {/* General Group Link Button */}
              <Link
                href="https://chat.whatsapp.com/DdYKdvQZZhB3FV5oSi1NcR"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-black border-[3px] border-black font-black rounded-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-slate-50 transition-all uppercase text-xs tracking-wider"
              >
                <span>General Group</span>
                <span className="text-lg">🌐</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Coming Soon Notice */}
            <div className="bg-white border-4 border-black rounded-[2rem] p-10 shadow-[8px_8px_0_0_rgba(0,0,0,1)] text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-500 border-b-2 border-black" />
              <h2 className="text-4xl md:text-5xl font-black text-black mb-4 uppercase italic">Workshop will be available soon</h2>
              <p className="text-xl font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">we will let u soon</p>
              <div className="mt-8 flex justify-center gap-4">
                <div className="w-12 h-12 bg-blue-100 border-2 border-black flex items-center justify-center rotate-3">
                  <span className="text-2xl animate-pulse">⏳</span>
                </div>
                <div className="w-12 h-12 bg-pink-100 border-2 border-black flex items-center justify-center -rotate-6">
                  <span className="text-2xl animate-bounce">📢</span>
                </div>
              </div>
            </div>
            
            {/* Workshop Video section */}
            <div className="bg-white border-4 border-black rounded-[2rem] p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative overflow-hidden group hover:translate-x-[2px] hover:translate-y-[2px] transition-transform hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-red-500 animate-pulse border-2 border-black"/>
                  <h2 className="text-3xl font-black text-black tracking-tight">The Masterclass</h2>
                </div>
                <div className="px-4 py-1.5 border-2 border-black rounded-full font-bold text-sm bg-purple-100 rotate-2">
                  1h 45m
                </div>
              </div>
              
              <div className="aspect-video bg-[#1a1a1a] rounded-2xl mb-8 flex items-center justify-center border-4 border-black box-shadow-inner relative overflow-hidden group-hover:border-purple-500 transition-colors cursor-pointer">
                <div className="text-center z-10 relative">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-[4px_4px_0_0_rgba(0,0,0,1)] border-4 border-black group-hover:bg-purple-400 group-hover:text-white">
                    <PlayCircleIcon className="w-10 h-10" />
                  </div>
                  <p className="text-white font-bold text-lg">Watch Lesson 1</p>
                </div>
                {/* Decorative noise/pattern for video placeholder */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
              </div>

              <label className="flex items-center gap-4 cursor-pointer p-4 rounded-xl hover:bg-gray-50 border-2 border-transparent hover:border-black transition-all">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={videoCompleted}
                    onChange={(e) => setVideoCompleted(e.target.checked)}
                    className="w-6 h-6 appearance-none border-2 border-black rounded cursor-pointer checked:bg-green-400 checked:border-green-400 transition-colors peer"
                  />
                  <svg className="w-4 h-4 absolute top-1 left-1 pointer-events-none hidden peer-checked:block text-black stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-bold text-black select-none">I've completed this module!</span>
              </label>
            </div>


          </div>

          {/* Sidebar Column for Sticky Notes */}
          <div className="lg:col-span-4 space-y-8 flex flex-col items-center sm:items-stretch">
            
            {/* Status Sticky Note */}
            {isApproved && submission?.certificateId && (
              <div className="bg-[#52c41a] p-6 border-4 border-black rounded-lg shadow-[8px_8px_0_0_rgba(0,0,0,1)] -rotate-2 transform hover:rotate-0 transition-transform w-[280px] sm:w-full">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">🎓</span>
                  <div>
                    <h2 className="text-xl font-black text-white">Nailed It!</h2>
                    <p className="font-bold flex-1 text-black">You passed!</p>
                  </div>
                </div>
                <Link
                  href={`/certificates/${submission.certificateId}`}
                  className="block w-full text-center py-3 bg-white text-black border-4 border-black font-black rounded hover:bg-gray-100 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
                >
                  Get Certificate
                </Link>
              </div>
            )}
            
            {isPending && (
              <div className="bg-[#faad14] p-6 border-4 border-black rounded-lg shadow-[8px_8px_0_0_rgba(0,0,0,1)] rotate-3 transform hover:rotate-0 transition-transform w-[280px] sm:w-full">
                <p className="font-black text-2xl mb-2 text-black">Under Review 👀</p>
                <p className="font-medium text-black">Our team is checking out your edits. Hang tight!</p>
              </div>
            )}

            {isRejected && (
              <div className="bg-[#ff4d4f] p-6 border-4 border-black rounded-lg shadow-[8px_8px_0_0_rgba(0,0,0,1)] -rotate-3 transform hover:rotate-0 transition-transform w-[280px] sm:w-full">
                <p className="font-black text-2xl mb-2 text-white">Oops! 😬</p>
                <p className="font-bold text-white">Something was missing. Review feedback and try again.</p>
              </div>
            )}
            
            {/* Resources Sticky Note - Free Goodies */}
            <div className="bg-[#1890ff] p-8 border-4 border-black rounded-lg shadow-[8px_8px_0_0_rgba(0,0,0,1)] -rotate-1 transform hover:-rotate-0 transition-transform w-[280px] sm:w-full text-white mt-10">
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-red-400 border-2 border-black" /> {/* Pin */}
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                <span className="text-3xl">🎁</span> Free Goodies
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold border-b-2 border-white/30 pb-2 mb-3 tracking-widest uppercase text-[10px]">Presets (DNG)</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Monochrome Love', file: 'Monochrome Love.dng' },
                      { name: 'Purple Fever', file: 'Purple Fever.dng' },
                      { name: 'Retro Vapourwave', file: 'Retro Vapourwave .dng' }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDownload(`presets/${item.file}`)}
                        className="w-full flex items-center justify-between p-3 bg-white text-black border-2 border-black rounded font-bold hover:bg-gray-100 shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                      >
                        <span className="text-xs truncate">{item.name}</span>
                        <ArrowDownTrayIcon className="w-4 h-4 stroke-[3] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold border-b-2 border-white/30 pb-2 mb-3 tracking-widest uppercase text-[10px]">Practice RAWs</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleDownload(`raw_images/image-${num}.dng`)}
                        className="w-full flex items-center justify-between p-3 bg-yellow-300 text-black border-2 border-black rounded font-bold hover:bg-yellow-400 shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                      >
                        <span className="text-xs">RAW Sample {num}</span>
                        <ArrowDownTrayIcon className="w-4 h-4 stroke-[3]" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Floating Interactive Stamp Toolbar */}
      <div className="stamp-toolbar fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 bg-white border-[3px] sm:border-4 border-black rounded-full px-3 py-2 sm:px-4 sm:py-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)] sm:shadow-[6px_6px_0_0_rgba(0,0,0,1)] flex items-center gap-1.5 sm:gap-2 z-50 max-w-[95vw] sm:max-w-none overflow-x-auto no-scrollbar">
        <div className="hidden sm:block text-xs font-black uppercase tracking-wider text-gray-500 mr-2 border-r-2 border-gray-200 pr-4 whitespace-nowrap">
          Stamp Tool
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {STAMPS.map(stamp => (
            <button
              key={stamp}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedStamp(selectedStamp === stamp ? null : stamp);
              }}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full text-xl sm:text-2xl flex items-center justify-center transition-all shrink-0 ${
                selectedStamp === stamp 
                  ? 'bg-orange-400 scale-110 shadow-inner' 
                  : 'hover:bg-gray-100 hover:scale-105'
              }`}
            >
              {stamp}
            </button>
          ))}
        </div>
        {selectedStamp && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold text-[10px] sm:text-sm whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
            Click to stamp!
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rotate-45" />
          </div>
        )}
      </div>
      
            {/* Custom Neo-Brutalist Footer */}
            <footer className="w-full bg-[#000] border-t-[8px] border-black mt-20 relative overflow-hidden z-10 rounded-lg">
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
