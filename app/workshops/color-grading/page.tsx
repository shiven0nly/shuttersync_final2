'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery, useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon, ArrowDownTrayIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const WORKSHOP_ID = 2;
const GOOGLE_DRIVE_LINK = 'https://drive.google.com/drive/folders/1dDCiNyplLq9H955MU-ob4SjjCsWGRbgS';
const DEADLINE = 'February 23, 2025, 11:59 PM IST';

export default function ColorGradingWorkshopPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [driveLink, setDriveLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const registration = useQuery(
    api.registrations.getUserRegistration,
    user ? { userId: user.id, workshopId: WORKSHOP_ID } : 'skip'
  );

  const submission = useQuery(
    api.workshopSubmissions.getUserSubmission,
    user ? { userId: user.id, workshopId: WORKSHOP_ID } : 'skip'
  );

  const submitAssignment = useMutation(api.workshopSubmissions.submitAssignment);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    if (isLoaded && user && registration === null) {
      router.push('/workshops/register');
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
      // Direct download from public folder
      const link = document.createElement('a');
      link.href = `/${filename}`;
      link.download = filename.split('/').pop() || 'download.dng';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert('Failed to download file. Please try again.');
    }
  };

  if (!isLoaded || !user || !registration) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="w-8 h-8 border-4 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isApproved = submission?.status === 'approved';
  const isPending = submission?.status === 'pending';
  const isRejected = submission?.status === 'rejected';

  return (
    <div className="min-h-screen bg-orange-50 pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/workshops/register" className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50 rounded-lg px-2 py-1 transition-colors mb-6 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Registration
          </Link>
          <h1 className="text-5xl font-serif italic text-foreground mb-4 text-balance">Color Grading Workshop</h1>
          <p className="text-lg text-foreground/70">Welcome, {registration.fullName}!</p>
        </div>

        {/* Certificate Status */}
        {isApproved && submission?.certificateId && (
          <div className="bg-green-600 text-white p-8 rounded-3xl mb-8 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <CheckCircleIcon className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-serif">Congratulations!</h2>
                <p className="text-green-100">Your certificate is ready</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/certificates/${submission.certificateId}`}
                className="inline-block px-6 py-3 bg-white text-green-600 rounded-full font-semibold hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors text-center"
              >
                View Certificate
              </Link>
              <button
                onClick={() => {
                  const url = `${window.location.origin}/certificates/${submission.certificateId}`;
                  navigator.clipboard.writeText(url);
                  alert('Certificate link copied! Share it with anyone.');
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 backdrop-blur text-white rounded-full font-semibold hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Copy Shareable Link
              </button>
            </div>
            <p className="text-xs text-green-100 mt-4">
              🔗 Share your achievement! Anyone with the link can verify your certificate.
            </p>
          </div>
        )}

        {/* Status Banner */}
        {isPending && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-6 rounded-2xl mb-8">
            <p className="font-semibold">⏳ Submission Under Review</p>
            <p className="text-sm mt-1">Your work is being reviewed by our team. You'll be notified once approved.</p>
          </div>
        )}

        {isRejected && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-2xl mb-8">
            <p className="font-semibold">❌ Submission Not Approved</p>
            <p className="text-sm mt-1">Please review the requirements and resubmit your work.</p>
          </div>
        )}

        {/* Workshop Video */}
        <div className="bg-white p-8 rounded-3xl shadow-lg mb-8">
          <div className="flex items-center gap-3 mb-6">
            <PlayCircleIcon className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-serif text-foreground">Workshop Video</h2>
          </div>
          <div className="aspect-video bg-gray-900 rounded-2xl mb-6 flex items-center justify-center border border-gray-800">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 text-sm">Video is not available for now</p>
              <p className="text-gray-600 text-xs mt-2">Check back soon for workshop content</p>
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={videoCompleted}
              onChange={(e) => setVideoCompleted(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-2 focus:ring-orange-500"
              aria-label="Mark video as completed"
            />
            <span className="text-sm text-foreground/70">I have completed watching the workshop video</span>
          </label>
        </div>

        {/* DNG Downloads */}
        <div className="bg-white p-8 rounded-3xl shadow-lg mb-8">
          <h2 className="text-2xl font-serif text-foreground mb-6">Download Resources</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Presets (3 files)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['presets/Monochrome Love.dng', 'presets/Purple Fever.dng', 'presets/Retro Vapourwave .dng'].map((file, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDownload(file)}
                  className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium text-foreground">{file.split('/')[1]}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Raw Images for Challenge (3 files)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['raw_images/image-1.dng', 'raw_images/image-2.dng', 'raw_images/image-3.dng'].map((file, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDownload(file)}
                  className="flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium text-foreground">{file.split('/')[1]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Challenge Instructions */}
        <div className="bg-white p-8 rounded-3xl shadow-lg mb-8">
          <h2 className="text-2xl font-serif text-foreground mb-6">The Challenge</h2>
          <div className="prose prose-sm max-w-none text-foreground/70">
            <p className="mb-4">Thank you for joining and completing the workshop! As mentioned, we're sharing 3 presets along with one edit challenge.</p>
            
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Your Task:</h3>
            <p className="mb-4">You will receive 3 photos. Your task is to edit all three images and submit them by <strong className="text-red-600">{DEADLINE}</strong>.</p>
            
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">How to Submit:</h3>
            <ol className="list-decimal list-inside space-y-2 mb-4">
              <li>Edit all three images using the techniques learned in the workshop</li>
              <li>Name your files clearly (e.g., Photo1_YourName.jpg, Photo2_YourName.jpg, etc.)</li>
              <li>Add a watermark in the bottom right corner: <code className="bg-gray-100 px-2 py-1 rounded">edited_by_YourName</code></li>
              <li>Upload to the Google Drive folder</li>
              <li>Submit the google photos below</li>
            </ol>

            <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl mt-6">
              <p className="text-sm font-semibold text-orange-800 mb-2">📅 Deadline: {DEADLINE}</p>
              <p className="text-xs text-orange-700">Looking forward to seeing your creative edits! ✨</p>
            </div>
          </div>
        </div>

        {/* Submission Form */}
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-serif text-foreground mb-6">Submit Your Work</h2>
          
          {showSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl mb-6">
              ✅ Submission saved successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Google Drive Submission Link
              </label>
              <a
                href={GOOGLE_DRIVE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mb-3 text-sm text-blue-500 hover:underline"
              >
                📁 Open Google Drive Folder →
              </a>
              <input
                type="url"
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
                required
                placeholder="Paste your Google Drive link here"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
              <p className="text-xs text-foreground/50 mt-2">
                Upload your edited images to the shared folder, then paste the link here
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !videoCompleted || !driveLink}
              className="w-full py-4 bg-foreground text-background rounded-2xl font-semibold hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {submission ? 'Update Submission' : 'Submit Assignment'}
                </>
              )}
            </button>

            {!videoCompleted && (
              <p className="text-xs text-red-500 text-center">
                Please mark the video as completed before submitting
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
