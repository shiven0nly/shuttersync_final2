'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import BpkInput from '@skyscanner/backpack-web/bpk-component-input';
import { Plus, Trash2, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, MessageCircle, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CompetitionSubmissionPage() {
  const { user, isLoaded: isAuthLoaded } = useUser();
  const router = useRouter();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [upiTransactionId, setUpiTransactionId] = useState('');
  const [driveLinks, setDriveLinks] = useState<string[]>(['', '']);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Get Registration
  const myRegistration = useQuery(
    api.competitionRegistrations.getMyRegistration,
    user ? {} : 'skip'
  );

  // Get Submission (to check if already submitted)
  const mySubmission = useQuery(
    api.competitionRegistrations.getMySubmission,
    user ? {} : 'skip'
  );

  // Get Workshop Registration (to check for free submissions)
  const workshopRegistration = useQuery(
    api.registrations.getUserRegistration,
    user ? { userId: user.id, workshopId: 3 } : 'skip'
  );
  const isWorkshopRegistered = workshopRegistration?.status === 'active';

  const submitMutation = useMutation(api.competitionRegistrations.submitCompetition);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.primaryEmailAddress?.emailAddress || '');
    }
  }, [user]);

  // Already submitted effect
  useEffect(() => {
    if (mySubmission) {
      setSubmitSuccess(true);
    }
  }, [mySubmission]);

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...driveLinks];
    newLinks[index] = value;
    setDriveLinks(newLinks);
  };

  const addLinkInput = () => {
    setDriveLinks([...driveLinks, '']);
  };

  const removeLinkInput = (index: number) => {
    const newLinks = driveLinks.filter((_, i) => i !== index);
    if (newLinks.length === 0) newLinks.push('');
    setDriveLinks(newLinks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !myRegistration) return;
    
    const validLinks = driveLinks.filter(link => link.trim() !== '');
    
    if (validLinks.length === 0) {
      setSubmitError('Please provide at least one valid Google Drive link.');
      return;
    }

    const finalUpiId = totalPrice === 0 ? "FREE_WORKSHOP_SUBMISSION" : upiTransactionId;

    if (totalPrice > 0 && !upiTransactionId) {
      setSubmitError('Please provide your UPI Transaction ID.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitMutation({
        registrationId: myRegistration._id,
        fullName,
        email,
        upiTransactionId: finalUpiId,
        driveLinks: validLinks,
      });
      setSubmitSuccess(true);
      setDriveLinks(['', '']);
      setUpiTransactionId('');
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculatePrice = () => {
    const previouslySubmitted = mySubmission ? mySubmission.driveLinks.length : 0;
    const newLinks = driveLinks.length;
    
    if (isWorkshopRegistered) {
      const freeLinksRemaining = Math.max(0, 2 - previouslySubmitted);
      const paidNewLinks = Math.max(0, newLinks - freeLinksRemaining);
      return paidNewLinks * 19;
    } else {
      if (!mySubmission) {
        return Math.max(2, newLinks) * 19;
      } else {
        return newLinks * 19;
      }
    }
  };

  const totalPrice = calculatePrice();

  if (!isAuthLoaded || myRegistration === undefined || mySubmission === undefined || workshopRegistration === undefined) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#fafafa]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-stone-800 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-stone-500 tracking-wider">Loading Submission Portal...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Not registered yet
  if (!myRegistration) {
    return (
      <main className="min-h-screen bg-[#fafafa] flex flex-col justify-between">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md mx-auto w-full bg-white border border-stone-200 shadow-xl rounded-3xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-2">
              Registration Required
            </h2>
            <p className="text-sm text-stone-500 mb-8 leading-relaxed">
              You must register for the competition before you can submit your photos.
            </p>
            <Link
              href="/events/competition/register"
              className="w-full py-3.5 bg-stone-900 text-center text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
            >
              Go to Registration <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-stone-900 relative overflow-hidden flex flex-col justify-between">
      {/* Background Subtle Grid */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)",
        }}
      />

      <Header />

      <div className="relative z-10 flex-1 py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex flex-col justify-center">
        {submitSuccess && !mySubmission && (
          // This case only happens briefly between successful submission and mySubmission query updating
          <div className="mb-8 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-700 text-xs font-medium leading-relaxed">
            Successfully submitted! Processing...
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-2xl border border-stone-200 shadow-xl rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-stone-800 to-amber-500" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Form Section */}
            <div className="p-8 sm:p-10 lg:col-span-3 border-b lg:border-b-0 lg:border-r border-stone-200 relative z-10">
              
              {mySubmission && (
                <div className="mb-8 p-6 bg-stone-50/50 rounded-2xl border border-stone-200 text-center relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-stone-900"/>
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-3 text-stone-900" />
                  <h2 className="text-xl font-serif text-stone-900 mb-2">Results announce soon</h2>
                  <p className="text-sm text-stone-500 mb-4">Your submissions are securely recorded. You can add more submissions below.</p>
                  
                  {mySubmission.driveLinks && mySubmission.driveLinks.length > 0 && (
                     <div className="space-y-2 mt-4 text-left">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">
                          Total Photos Submitted ({mySubmission.driveLinks.length})
                        </h3>
                        {mySubmission.driveLinks.map((link: string, idx: number) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-white/80 border border-stone-200 rounded-xl">
                             <span className="text-sm text-stone-600 truncate max-w-[200px] sm:max-w-[250px]">{link}</span>
                             <a href={link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shrink-0">
                               View <ArrowRight className="w-3 h-3" />
                             </a>
                          </div>
                        ))}
                     </div>
                  )}
                </div>
              )}

              <div className="mb-8">
                <h1 className="text-3xl font-serif text-stone-900 mb-2">
                  Submit {mySubmission ? "More " : ""}Entries
                </h1>
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  Upload your high-resolution photos to a public Google Drive folder and provide the link(s) below.
                </p>
              </div>

                {submitError && (
                  <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium leading-relaxed">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & UPI ID */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2 ml-1">
                        Full Name
                      </label>
                      <BpkInput
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white/50 text-stone-900 text-sm focus:outline-none focus:border-stone-800 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Dynamic Drive Links */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-3 ml-1 flex justify-between items-center">
                      Google Drive Links
                      <span className="text-stone-400 font-normal normal-case tracking-normal">({driveLinks.length})</span>
                    </label>
                    <div className="space-y-3">
                      {driveLinks.map((link, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <BpkInput
                            id={`driveLink-${index}`}
                            name={`driveLink-${index}`}
                            type="text"
                            value={link}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLinkChange(index, e.target.value)}
                            placeholder="https://drive.google.com/..."
                            className="flex-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-sm focus:bg-white focus:outline-none focus:border-stone-800 transition-all"
                          />
                          {driveLinks.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeLinkInput(index)}
                              className="p-3 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0 border border-transparent"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <button
                      type="button"
                      onClick={addLinkInput}
                      className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-stone-500 bg-stone-50 border border-stone-200 rounded-lg hover:bg-stone-100 hover:text-stone-600 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add another link
                    </button>
                  </div>
                  {isWorkshopRegistered && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-xl text-left">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1">Workshop Perks Active</p>
                      <p className="text-xs text-blue-800">Your first 2 submissions are completely free since you are registered for Lightroom Mastery!</p>
                    </div>
                  )}
                </form>
              </div>

              {/* Payment Info Section */}
              <div className="p-8 sm:p-10 lg:col-span-2 bg-stone-50/50 flex flex-col relative z-0 border-l border-stone-200">
                <div className="mb-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Payment Details</h3>
                  <p className="text-3xl font-serif text-stone-900">
                    {totalPrice === 0 ? "FREE" : `₹${totalPrice} INR`}
                  </p>
                  <p className="text-xs text-stone-500 mt-1">Based on {driveLinks.length} new submissions</p>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                  {totalPrice > 0 ? (
                    <>
                      <div className="w-48 h-48 bg-white rounded-2xl p-2 shadow-sm border border-stone-200 flex items-center justify-center overflow-hidden relative">
                        <Image
                          src="/qrcode/qrcode.png"
                          alt="UPI QR Code"
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="text-center w-full">
                        <p className="text-[10px] uppercase tracking-widest text-amber-600 font-bold mb-3">Scan to pay securely</p>
                        <BpkInput
                          id="upiTransactionId"
                          name="upiTransactionId"
                          type="text"
                          value={upiTransactionId}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpiTransactionId(e.target.value)}
                          required
                          placeholder="Enter UPI Transaction ID"
                          className="w-full text-center px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:border-stone-800 transition-all font-mono tracking-widest"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-8 bg-green-50 rounded-2xl border border-green-200 w-full">
                      <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-500" />
                      <p className="text-sm font-bold text-green-700 uppercase tracking-widest mb-1">Free Submission</p>
                      <p className="text-xs text-green-600 leading-relaxed">Covered by your Workshop Pass.</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-stone-200">
                  <BpkButton
                    onClick={handleSubmit}
                    disabled={isSubmitting || (totalPrice > 0 && !upiTransactionId)}
                    className={`w-full py-4.5 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${
                      !isSubmitting && (totalPrice === 0 || upiTransactionId)
                        ? "bg-stone-900 hover:bg-stone-800 cursor-pointer shadow-md"
                        : "bg-stone-200 cursor-not-allowed text-stone-400"
                    }`}
                  >
                    {isSubmitting ? "Finalizing..." : "Complete Submission"}
                  </BpkButton>
                  <div className="text-center mt-4">
                    <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold flex items-center justify-center gap-1.5 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Secure Payment
                    </p>
                    <p className="text-[9px] text-stone-400 font-light">We do not store your financial data.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center px-4 mb-6">
            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-500 leading-relaxed">
              FACING DIFFICULTIES? SUPPORT: <a href="tel:+919460272387" className="text-[#3a70b0] hover:underline">+91 9460272387</a> | <a href="tel:+919455955981" className="text-[#3a70b0] hover:underline">+91 9455955981</a>
            </p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-500 mt-1 leading-relaxed">
              AFTER SUBMITTING IF 'SUBMITTED LINKS' NOT APPEAR THAN KINDLY REFRESH THE SITE..
            </p>
          </div>
      </div>

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
    </main>
  );
}