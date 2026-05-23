'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import BpkCheckbox from '@skyscanner/backpack-web/bpk-component-checkbox';
import BpkInput from '@skyscanner/backpack-web/bpk-component-input';
import { Lock, ShieldCheck, HelpCircle, ArrowRight, CheckCircle2, UserCheck, AlertTriangle } from 'lucide-react';

export default function CompetitionRegistrationPage() {
  const { user, isLoaded: isAuthLoaded } = useUser();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [expectedSubmissions, setExpectedSubmissions] = useState<number>(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Convex query to fetch user registration
  const myRegistration = useQuery(
    api.competitionRegistrations.getMyRegistration,
    user ? {} : 'skip'
  );

  // Convex mutation to register
  const registerMutation = useMutation(api.competitionRegistrations.register);

  // Pre-fill form fields with authenticated user data once loaded
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.primaryEmailAddress?.emailAddress || '');
    }
  }, [user]);

  const handleSubmissionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) {
      setExpectedSubmissions(val);
    } else if (e.target.value === '') {
      setExpectedSubmissions(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!agreedToTerms) {
      setSubmitError('You must agree to the rules & regulations and code of conduct.');
      return;
    }
    if (expectedSubmissions < 1) {
      setSubmitError('Please specify at least 1 expected photo submission.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await registerMutation({
        fullName,
        email,
        phoneNumber,
        expectedSubmissions,
        agreedToTerms,
      });
      setSubmitSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalFee = expectedSubmissions * 19;

  // Loader state
  if (!isAuthLoaded) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#fafafa]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-stone-800 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-stone-500 tracking-wider">Verifying Session...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-stone-900 relative overflow-hidden flex flex-col justify-between">
      {/* Background Subtle Light Grid Layout with Vignette effect */}
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

      <div className="relative z-10 flex-1 py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full flex flex-col justify-center">
        {/* Title block */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-stone-200 bg-white text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Competition Season 2026
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif italic text-stone-900 tracking-tight leading-tight mb-4">
            Enter the 2026 Awards
          </h1>
          <p className="text-sm sm:text-base text-stone-500 font-light max-w-xl mx-auto leading-relaxed text-pretty">
            Start your journey today for free. You only pay when you're ready to submit your final photos.
          </p>
        </div>

        {/* Auth Restricted View */}
        {!user ? (
          <div className="max-w-md mx-auto w-full bg-white border border-stone-200 shadow-xl rounded-3xl p-8 text-center relative overflow-hidden transition-all hover:shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 id="auth-title" className="text-xl font-serif font-semibold text-stone-900 mb-2">
              Claim Your Free Profile
            </h2>
            <p className="text-sm text-stone-500 mb-8 leading-relaxed">
              To guarantee the integrity of our entries, you must be logged in to your ShutterSync account to register for the photography competition.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/sign-in?redirect_url=/events/competition/register"
                id="sign-in-btn"
                className="w-full py-3.5 bg-stone-900 text-center text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                Sign In to Account
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sign-up?redirect_url=/events/competition/register"
                id="sign-up-btn"
                className="w-full py-3 text-stone-500 text-center rounded-2xl text-xs font-semibold hover:text-stone-950 transition-colors"
              >
                Create an Account
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Side: Competition Metrics & Information */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between bg-stone-950 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-stone-400">
              {/* Premium Gradient Backgrounds */}
              <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-950 to-black z-0" />
              <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-amber-500/20 rounded-full blur-3xl z-0 pointer-events-none" />
              <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-stone-500/10 rounded-full blur-3xl z-0 pointer-events-none" />

              <div className="relative z-10 space-y-8 flex-1">
                <div>
                  <h3 className="text-xl font-serif font-medium text-white border-b border-stone-800 pb-3 mb-6">
                    Contest Overview
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center text-emerald-400 border border-stone-800 shrink-0 shadow-inner">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-1">Evaluation Style</h4>
                        <p className="text-sm text-stone-200 font-medium">Single Round Evaluation</p>
                        <p className="text-xs text-stone-500 font-light mt-1">A single panel of esteemed masters scores all qualifying entries directly.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center text-amber-400 border border-stone-800 shrink-0 shadow-inner">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-1">Zero Upfront Cost</h4>
                        <p className="text-sm text-stone-200 font-medium">Free Entry | Pay Later</p>
                        <p className="text-xs text-stone-500 font-light mt-1">Registration is 100% free with zero commitment today. A small handling fee of ₹19 INR per photo only applies when you are ready to submit.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-stone-900/50 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-amber-500">
                    <HelpCircle className="w-4.5 h-4.5 shrink-0" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Entry Standard</span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed font-light">
                    Every uploaded photo must include authentic camera metadata (EXIF). Deep composite images or Generative AI submissions are strictly prohibited and auto-disqualified.
                  </p>
                </div>
              </div>

              {/* Secure Lock Badge */}
              <div className="relative z-10 bg-black/40 border border-stone-800/60 rounded-2xl p-4 flex items-center gap-3 justify-center mt-6">
                <Lock className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                  Secure Data Vault Powered by Convex
                </span>
              </div>
            </div>

            {/* Right Side: Form / Status Card */}
            <div className="lg:col-span-7">
              {submitSuccess || (myRegistration && myRegistration.paymentStatus) ? (
                /* Registered Success Card */
                <div className="bg-white border border-stone-200 shadow-xl rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden h-full flex flex-col justify-center">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-stone-900"/>
                  <div className="w-16 h-16 bg-stone-950 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    <UserCheck className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-serif text-stone-900 mb-2">
                    Already Registered
                  </h3>
                  <p className="text-sm text-stone-500 mb-6 leading-relaxed max-w-sm mx-auto">
                    You have successfully registered for the photography competition. Prepare your best shots for submission.
                  </p>

                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 text-left space-y-4 max-w-md mx-auto w-full">
                    <div className="flex justify-between items-center border-b border-stone-200/50 pb-2">
                      <span className="text-xs text-stone-400 uppercase tracking-wider">Contestant</span>
                      <span className="text-sm font-semibold text-stone-800">
                        {myRegistration?.fullName || fullName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-stone-200/50 pb-2">
                      <span className="text-xs text-stone-400 uppercase tracking-wider">Email</span>
                      <span className="text-sm font-medium text-stone-700">
                        {myRegistration?.email || email}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-stone-200/50 pb-2">
                      <span className="text-xs text-stone-400 uppercase tracking-wider">Expected Photos</span>
                      <span className="text-sm font-bold text-stone-800 tabular-nums">
                        {myRegistration?.expectedSubmissions || expectedSubmissions}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-stone-200/50 pb-2">
                      <span className="text-xs text-stone-400 uppercase tracking-wider">Submissions Cost</span>
                      <span className="text-sm font-bold text-stone-800 tabular-nums">
                        ₹{myRegistration?.totalFeesPaid || totalFee} INR
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-stone-400 uppercase tracking-wider">Status</span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        (myRegistration?.paymentStatus || "pending") === "completed" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        {(myRegistration?.paymentStatus || "pending")}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-col items-center gap-4">
                    <Link
                      href="/events/competition/submission"
                      className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      Go to Submission <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/events"
                      className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-600 transition-colors"
                    >
                      Back to Events list
                    </Link>
                  </div>
                </div>
              ) : (
                /* Registration Form */
                <div className="bg-white border border-stone-200 shadow-xl rounded-3xl p-8 sm:p-10 relative">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-stone-900" />
                  
                  <div className="mb-8">
                    <h2 className="text-2xl font-serif text-stone-900 mb-1">
                      Register to Participate
                    </h2>
                    <p className="text-xs text-stone-400">
                      Step 1 — Contestant Information & expected submissions
                    </p>
                  </div>

                  {submitError && (
                    <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium leading-relaxed">
                      {submitError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="fullName" className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2 ml-1">
                        Full Name
                      </label>
                      <BpkInput
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                        required
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:border-stone-800 transition-all font-sans text-stone-900"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2 ml-1">
                        Email Address
                      </label>
                      <BpkInput
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:border-stone-800 transition-all font-sans text-stone-900"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phoneNumber" className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2 ml-1">
                          Phone Number
                        </label>
                        <BpkInput
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                          required
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:border-stone-800 transition-all font-sans text-stone-900"
                        />
                      </div>
                      <div>
                        <label htmlFor="expectedSubmissions" className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2 ml-1">
                          Expected Submissions
                        </label>
                        <BpkInput
                          id="expectedSubmissions"
                          name="expectedSubmissions"
                          type="number"
                          min="1"
                          max="100"
                          value={expectedSubmissions || ''}
                          onChange={handleSubmissionsChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:border-stone-800 transition-all font-sans text-stone-900"
                        />
                        <span className="block mt-2 text-xs font-bold text-emerald-600 ml-1">
                          Zero upfront cost — Pay only when you submit
                        </span>
                      </div>
                    </div>

                    {/* Legal Checkbox */}
                    <div className="border-t border-stone-100 pt-6">
                      <BpkCheckbox
                        name="consent"
                        checked={agreedToTerms}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgreedToTerms(e.target.checked)}
                        label={
                          <span className="text-xs text-stone-500 leading-relaxed font-light select-none">
                            I have read all the{" "}
                            <a
                              href="/events/competition/rules"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold underline text-stone-800 hover:text-stone-950 transition-colors"
                            >
                              rules and regulations
                            </a>{" "}
                            and{" "}
                            <a
                              href="/events/competition/coc"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold underline text-stone-800 hover:text-stone-950 transition-colors"
                            >
                              code of conduct
                            </a>
                          </span>
                        }
                      />
                    </div>

                    {/* Submit Action */}
                    <div className="pt-2">
                      <BpkButton
                        submit
                        disabled={!agreedToTerms || isSubmitting}
                        className={`w-full py-4 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${
                          agreedToTerms && !isSubmitting
                            ? "bg-stone-900 hover:bg-stone-850 cursor-pointer shadow-md hover:shadow-lg"
                            : "bg-stone-200 cursor-not-allowed text-stone-400"
                        }`}
                      >
                        {isSubmitting ? "Processing Entry..." : "Join the Competition for Free"}
                      </BpkButton>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
