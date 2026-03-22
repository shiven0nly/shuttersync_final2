'use client';

import { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery, useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon, ArrowDownTrayIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

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
    if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    if (isLoaded && user && registration === null) {
      router.push('/workshops/lightroom-mastery/register');
    }
  }, [isLoaded, user, registration, router]);

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

  if (!isLoaded || !user || !registration) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
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
      <div className="stamp-toolbar fixed bottom-8 left-1/2 -translate-x-1/2 bg-white border-4 border-black rounded-full px-4 py-3 shadow-[6px_6px_0_0_rgba(0,0,0,1)] flex items-center gap-2 z-50">
        <div className="text-xs font-black uppercase tracking-wider text-gray-500 mr-2 border-r-2 border-gray-200 pr-4">
          Stamp Tool
        </div>
        {STAMPS.map(stamp => (
          <button
            key={stamp}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedStamp(selectedStamp === stamp ? null : stamp);
            }}
            className={`w-12 h-12 rounded-full text-2xl flex items-center justify-center transition-all ${
              selectedStamp === stamp 
                ? 'bg-orange-400 scale-110 shadow-inner' 
                : 'hover:bg-gray-100 hover:scale-105'
            }`}
          >
            {stamp}
          </button>
        ))}
        {selectedStamp && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
            Click anywhere to stamp!
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rotate-45" />
          </div>
        )}
      </div>

    </div>
  );
}
