'use client';

import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { ArrowLeft, Scale, Users, HeartHandshake, Leaf } from 'lucide-react';

export default function CodeOfConductPage() {
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

      <div className="relative z-10 flex-1 py-28 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/events/competition"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
            Back to Registration
          </Link>
        </div>

        {/* Title */}
        <div className="mb-12 border-b border-stone-200 pb-6">
          <h1 className="text-3xl sm:text-4xl font-serif italic text-stone-900 tracking-tight mb-3">
            Code of Conduct
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
            ShutterSync Community Ethics & Respect Standards
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-stone-700 leading-relaxed font-light text-sm sm:text-base">
          
          {/* Section 1: Fair Play */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900">
              <Scale className="w-5 h-5 text-amber-600 shrink-0" />
              <h2 className="text-lg font-serif font-semibold">1. Fair Play & Integrity</h2>
            </div>
            <p className="text-pretty">
              All participants are expected to compete with integrity. Collusion, voting manipulation, falsifying submission details, or submitting work that is not completely your own constitutes a serious violation of this Code. We enforce a zero-tolerance policy for any attempts to deceive or game the judging systems.
            </p>
          </section>

          {/* Section 2: Plagiarism Policy */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900">
              <HeartHandshake className="w-5 h-5 text-amber-600 shrink-0" />
              <h2 className="text-lg font-serif font-semibold">2. Plagiarism & Originality</h2>
            </div>
            <p className="text-pretty">
              Anti-plagiarism guidelines are strictly enforced. Submitting work captured by another individual or copying compositions from copyrighted materials without significant original artistic expression is prohibited. If another person's work is used as inspiration, it must be declared, and must not copy the original subject verbatim.
            </p>
          </section>

          {/* Section 3: Community Respect */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900">
              <Users className="w-5 h-5 text-amber-600 shrink-0" />
              <h2 className="text-lg font-serif font-semibold">3. Respectful Interaction</h2>
            </div>
            <p className="text-pretty">
              ShutterSync is a diverse and inclusive photography community. Respect must be maintained across all feedback forums, comment threads, and event channels. Harassment, derogatory comments, or discrimination based on race, gender, religion, sexual orientation, or experience level is prohibited and will result in disqualification and potential account suspension.
            </p>
          </section>

          {/* Section 4: Environmental & Wildlife Safety */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900">
              <Leaf className="w-5 h-5 text-amber-600 shrink-0" />
              <h2 className="text-lg font-serif font-semibold">4. Ethical Shooting & Environmental Conservation</h2>
            </div>
            <p className="text-pretty">
              When capturing wildlife or photographing in nature, ethical safety rules must be followed:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-stone-600">
              <li>**No Harassment**: Never provoke, lure with artificial food, or stress wild animals to obtain a shot. Keep a safe and respectful distance.</li>
              <li>**Respect Habitats**: Do not disturb nesting sites, destroy flora, or alter the natural environment to compose an image.</li>
              <li>**Leave No Trace**: Adhere to ecological standards of preservation. Pack out all trash and respect national park/sanctuary regulations.</li>
              <li>**Cultural Respect**: Obtain proper permissions and respect local customs when photographing sensitive cultural sites or indigenous communities.</li>
            </ul>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
