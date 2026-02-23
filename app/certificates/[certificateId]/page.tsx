'use client';

import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import { useParams } from 'next/navigation';
import { CheckCircleIcon, XCircleIcon, ShareIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    .certificate-container, .certificate-container * {
      visibility: visible;
    }
    .certificate-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 20px;
    }
    .no-print {
      display: none !important;
    }
    @page {
      size: landscape;
      margin: 0;
    }
    /* Force print background graphics */
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    /* Ensure borders and backgrounds print */
    .certificate-container * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

export default function CertificateVerificationPage() {
  const params = useParams();
  const certificateId = params.certificateId as string;
  const [copied, setCopied] = useState(false);

  const certificate = useQuery(
    api.certificates.getCertificateById,
    { certificateId }
  );

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${certificate?.fullName} - Color Grading Workshop Certificate`,
          text: `${certificate?.fullName} has successfully completed the Color Grading Workshop at ShutterSync!`,
          url: shareUrl,
        });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (certificate === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="w-8 h-8 border-4 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (certificate === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] p-4 sm:p-6">
        <div className="max-w-md w-full bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <XCircleIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h1 className="text-xl sm:text-2xl font-serif text-foreground mb-2">Certificate Not Found</h1>
          <p className="text-xs sm:text-sm text-foreground/50 mb-4 sm:mb-6 px-2">
            The certificate ID <code className="bg-gray-100 px-2 py-1 rounded text-xs break-all">{certificateId}</code> is invalid or does not exist.
          </p>
        </div>
      </div>
    );
  }

  const issueDate = new Date(certificate.issueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Dancing+Script:wght@400;500;600;700&family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
      ` }} />
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-red-50 to-orange-100 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Main Message */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12 no-print">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-3 sm:mb-4 px-2">
              This is to certify that
            </h1>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-orange-600 mb-4 sm:mb-6 px-2 break-words">{certificate.fullName}</p>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 px-2">
              has successfully completed
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-serif text-foreground mt-2 px-2">{certificate.workshopTitle}</p>
          </div>

          {/* Certificate Preview - Oracle Style */}
          <div className="certificate-container mb-8">
            <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden print-certificate" style={{ aspectRatio: '16/11' }}>
              {/* Decorative Border Pattern */}
              <div className="absolute inset-0 border-[10px] md:border-[20px] border-transparent print-border" style={{
                borderImage: 'repeating-linear-gradient(45deg, #f97316, #f97316 10px, #ef4444 10px, #ef4444 20px, #fb923c 20px, #fb923c 30px) 20',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
              }} />
              
              {/* Inner Border */}
              <div className="absolute inset-[15px] md:inset-[25px] border-2 md:border-4 border-orange-200 rounded-xl md:rounded-2xl print-inner-border" style={{
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
              }} />

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03] print-bg-pattern" style={{
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
              }}>
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)',
                  WebkitPrintColorAdjust: 'exact',
                  printColorAdjust: 'exact',
                }} />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col p-4 sm:p-8 md:p-12 lg:p-16">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-8 md:mb-12">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    {/* Logo */}
                    <img 
                      src="/logo.jpeg" 
                      alt="ShutterSync Logo" 
                      className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-md md:rounded-lg object-cover shadow-md"
                    />
                    <div>
                      <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-0.5 sm:mb-1" style={{ fontFamily: 'serif' }}>
                        SHUTTERSYNC
                      </h2>
                      <p className="text-[10px] sm:text-xs md:text-sm text-foreground/60">Photography Community</p>
                    </div>
                  </div>
                </div>

                {/* Main Content - Centered */}
                <div className="flex-1 flex flex-col items-center justify-center text-center -mt-2 sm:-mt-4 md:-mt-8">
                  {/* Title */}
                  <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-2 sm:mb-3 px-2" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontStyle: 'italic' }}>
                    Certificate of Completion
                  </h3>
                  
                  {/* Decorative Line */}
                  <div className="w-20 sm:w-28 md:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full mb-3 sm:mb-6 md:mb-8" />
                  
                  {/* This certifies text */}
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-foreground/60 mb-3 sm:mb-4 md:mb-6 px-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    This is to certify that
                  </p>

                  {/* Name - Underlined */}
                  <div className="mb-3 sm:mb-4 md:mb-6 w-full px-4">
                    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-1 sm:mb-2 break-words" style={{ fontFamily: 'Great Vibes, cursive', fontWeight: 400 }}>
                      {certificate.fullName}
                    </p>
                    <div className="w-full h-0.5 bg-foreground/30" />
                  </div>

                  {/* Completion text */}
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-foreground/60 mb-2 sm:mb-3 md:mb-4 px-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    has successfully completed the
                  </p>

                  {/* Workshop Title */}
                  <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-foreground mb-4 sm:mb-6 md:mb-8 px-2" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>
                    Color Grading Workshop
                  </p>

                  {/* Certification Text */}
                  <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-foreground/60 max-w-2xl px-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    and is recognized by ShutterSync Photography Community
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end mt-4 sm:mt-6 md:mt-8 gap-2">
                  <div>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-foreground mb-0.5 sm:mb-1">{issueDate}</p>
                    <p className="text-[8px] sm:text-[10px] md:text-xs text-foreground/50 uppercase tracking-wider">Date</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground mb-0.5 sm:mb-1" style={{ fontFamily: 'Great Vibes, cursive', fontWeight: 400 }}>
                      Rajnish
                    </p>
                    <p className="text-[8px] sm:text-[10px] md:text-xs text-foreground/50 uppercase tracking-wider">Founder, ShutterSync</p>
                  </div>
                </div>

                {/* Certificate ID at bottom right */}
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4">
                  <p className="text-[8px] sm:text-[10px] md:text-xs text-foreground/40 font-mono">{certificate.certificateId}</p>
                </div>
              </div>

              {/* Red Oracle-style badge in bottom right corner */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-red-600 rounded-md md:rounded-lg flex items-center justify-center shadow-lg no-print print-red-badge" style={{
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
              }}>
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-white rounded-md md:rounded-lg flex items-center justify-center">
                  <span className="text-white text-base sm:text-xl md:text-2xl">✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Details */}
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg mb-6 sm:mb-8 no-print">
            <h2 className="text-lg sm:text-xl font-serif text-foreground mb-4 sm:mb-6">Certificate Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-foreground/40 mb-1">Certificate ID</p>
                <p className="text-xs sm:text-sm font-mono text-foreground break-all">{certificate.certificateId}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-foreground/40 mb-1">Issue Date</p>
                <p className="text-xs sm:text-sm text-foreground">{issueDate}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-foreground/40 mb-1">Workshop</p>
                <p className="text-xs sm:text-sm text-foreground">{certificate.workshopTitle}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-foreground/40 mb-1">Verification Status</p>
                <p className="text-xs sm:text-sm text-green-600 font-semibold">✅ Valid</p>
              </div>
            </div>
          </div>

          {/* Share & Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center no-print">
            <button
              onClick={handleShare}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-foreground/10 text-foreground rounded-xl sm:rounded-2xl font-semibold hover:border-foreground/20 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ShareIcon className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">{copied ? '✓ Link Copied!' : 'Share Certificate'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-foreground text-background rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 overflow-hidden hover:shadow-2xl hover:-translate-y-0.5 text-sm sm:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-foreground via-gray-800 to-foreground bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-all duration-500" />
              <svg className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="relative z-10">Download PDF</span>
            </button>
          </div>
          <p className="text-xs text-foreground/50 mt-3 sm:mt-4 text-center no-print px-4">
            💡 Enable "Background graphics" in print settings for best results
          </p>
        </div>
      </div>
    </>
  );
}
