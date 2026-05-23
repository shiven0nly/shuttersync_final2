'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Camera, Aperture, Trophy, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight, HelpCircle, FileText } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { RippleButton } from '@/components/ui/ripple-button';

export default function CompetitionLandingPage() {
  const { isLoaded: isAuthLoaded } = useUser();

  // Loader state while auth is loading, ensuring smooth transition
  if (!isAuthLoaded) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-zinc-900 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-zinc-500 tracking-wider">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900 relative overflow-hidden flex flex-col justify-between">
      <Header />

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center overflow-hidden">
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-zinc-50 blur-[100px] opacity-80" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-amber-50 blur-[120px] opacity-60" />
          <div 
            className="absolute inset-0 z-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-8 relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white shadow-sm text-xs font-bold uppercase tracking-widest text-zinc-600">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              Season 2026 Open
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-zinc-900 tracking-tight leading-[1.1]">
              Capture The <br className="hidden lg:block"/>
              <span className="italic font-light text-zinc-600">Unseen World</span>
            </h1>
            
            <p className="text-lg text-zinc-600 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed text-pretty">
              Join the most prestigious photography contest. We evaluate vision, technical mastery, and authentic storytelling. Trusted by professionals globally.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link href="/events/competition/register">
                <RippleButton className="cursor-pointer min-w-[200px] px-10 py-4 text-[15px] font-medium rounded-full bg-green-500 text-black border border-black/5 shadow-sm hover:bg-black/5 hover:text-black transition-colors">
                  Register Now
                </RippleButton>
              </Link>
              
              <Link
                href="#details"
                className="px-8 py-4 bg-white border border-zinc-200 text-zinc-600 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-zinc-50 hover:text-zinc-900 transition-colors w-full sm:w-auto text-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right: Featured Imagery */}
          <div className="relative w-full aspect-[4/5] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-zinc-100 group">
            <Image
              src="https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=1200"
              alt="Professional photographer adjusting lens"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            {/* Overlay Gradient for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div id="details" className="w-full bg-zinc-50 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-zinc-900 mb-6">Why Participate?</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              We stand for authenticity in an era of digital composites. Our evaluation process focuses purely on the artistic and technical merits of true photography.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-6">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-medium text-zinc-900 mb-3">Single Round Evaluation</h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-light">
                No endless qualifying rounds. A single panel of esteemed photography masters scores all qualifying entries directly, ensuring a fair and comprehensive review of your work.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-medium text-zinc-900 mb-3">Free Registration</h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-light">
                Creating an account and registering for the contest is entirely free. A minor clearing and handling fee of ₹19 INR per photo is only charged when you actually submit.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6">
                <Aperture className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-medium text-zinc-900 mb-3">Authentic Standard</h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-light">
                Every uploaded photo must include authentic camera metadata (EXIF). Deep composite images or Generative AI submissions are strictly prohibited. We celebrate real moments.
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Rules / CTA Section */}
      <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white border border-zinc-200 shadow-xl rounded-[2.5rem] p-10 sm:p-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-zinc-800 to-zinc-950" />
          
          <h2 className="text-3xl md:text-4xl font-serif text-zinc-900 mb-6">Ready to Showcase Your Vision?</h2>
          <p className="text-zinc-500 mb-10 max-w-xl mx-auto font-light leading-relaxed">
            The registration process requires an authenticated account to maintain the integrity of our participant list. Please review the rules before continuing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/events/competition/rules"
              className="flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-zinc-900 transition-colors uppercase tracking-widest"
            >
              <FileText className="w-4 h-4" />
              Read Rules
            </Link>
            <span className="hidden sm:block text-zinc-300">•</span>
            <Link
              href="/events/competition/coc"
              className="flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-zinc-900 transition-colors uppercase tracking-widest"
            >
              <ShieldCheck className="w-4 h-4" />
              Code of Conduct
            </Link>
          </div>

          <Link
            href="/events/competition/register"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-zinc-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/10 transition-all hover:-translate-y-1 w-full sm:w-auto"
          >
            Start Registration
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
