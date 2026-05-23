'use client';

import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { ArrowLeft, ShieldAlert, Award, FileText, Camera } from 'lucide-react';

export default function RulesPage() {
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
            Rules & Regulations
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
            ShutterSync Contest Policy & Guidelines
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-stone-700 leading-relaxed font-light text-sm sm:text-base">
          
          {/* Section 1: Intellectual Property */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900">
              <Award className="w-5 h-5 text-amber-600 shrink-0" />
              <h2 className="text-lg font-serif font-semibold">1. Intellectual Property & Ownership</h2>
            </div>
            <p className="text-pretty">
              Participants retain full copyright ownership of all images they submit to the contest. By entering, you grant ShutterSync a non-exclusive, worldwide, royalty-free, limited license to display, publish, distribute, and reproduce the submitted photographs solely for the purposes of promoting, marketing, and staging the competition, including exhibition in the ShutterSync gallery. No commercial resale of images will occur without explicit agreement.
            </p>
          </section>

          {/* Section 2: Prohibitions against AI */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
              <h2 className="text-lg font-serif font-semibold">2. GenAI and Manipulation Policy</h2>
            </div>
            <p className="text-pretty">
              The competition is dedicated to authentic, camera-captured photography. Submissions containing Generative AI (GenAI) elements, synthetic pixels, or text-to-image additions are strictly prohibited. Advanced composite manipulation that alters the reality or changes the core subject structure is not permitted. 
            </p>
            <p className="text-pretty">
              Standard post-processing—such as color grading, dodging and burning, contrast adjustment, sharpening, and minor cropping—is acceptable. The judges reserve the right to request the original RAW file for any shortlisted image to inspect for manipulation.
            </p>
          </section>

          {/* Section 3: Metadata Validation */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900">
              <Camera className="w-5 h-5 text-amber-600 shrink-0" />
              <h2 className="text-lg font-serif font-semibold">3. Metadata & EXIF Integrity</h2>
            </div>
            <p className="text-pretty">
              Every submitted entry must retain its complete and unaltered camera metadata (EXIF). This must include details of the capturing device (camera model, lens), exposure settings (shutter speed, aperture, ISO), and timestamp of capture. Files that have their EXIF stripped or wiped by editing software may be automatically disqualified during the clearing process.
            </p>
          </section>

          {/* Section 4: Eligibility */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900">
              <FileText className="w-5 h-5 text-amber-600 shrink-0" />
              <h2 className="text-lg font-serif font-semibold">4. Eligibility & General Guidelines</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-stone-600">
              <li>Open to photographers of all levels globally who are registered members of ShutterSync.</li>
              <li>Images must be the sole original work of the submitting participant. Collaborations are not permitted.</li>
              <li>Photographs that have won awards or recognitions in other major international competitions prior to the close of entries are not eligible for submission.</li>
              <li>All entries must comply with regional and international laws concerning privacy and rights of representation.</li>
            </ul>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
