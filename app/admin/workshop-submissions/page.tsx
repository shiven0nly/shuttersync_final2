'use client';

import { useState } from 'react';
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs';
import { useQuery, useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';
import { CheckCircleIcon, XCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const ADMIN_EMAIL = 'admin@shuttersync.com';

export default function WorkshopSubmissionsAdminPage() {
  const { user, isLoaded } = useUser();
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const submissions = useQuery(api.workshopSubmissions.getAllSubmissions);
  const approveSubmission = useMutation(api.workshopSubmissions.approveSubmission);
  const rejectSubmission = useMutation(api.workshopSubmissions.rejectSubmission);

  const isAdmin = user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

  const handleApprove = async (submissionId: any) => {
    if (!confirm('Approve this submission and generate certificate?')) return;

    setActionLoading(submissionId);
    try {
      const adminEmail = user?.primaryEmailAddress?.emailAddress || ADMIN_EMAIL;
      const result = await approveSubmission({ submissionId, adminEmail });
      const certificateUrl = `${window.location.origin}/certificates/${result.certificateId}`;
      
      // Show success with shareable link
      const message = `✅ Certificate Generated!\n\nCertificate ID: ${result.certificateId}\n\nShareable Link:\n${certificateUrl}\n\nThe student can share this link with anyone to verify their certificate.`;
      alert(message);
      
      // Copy to clipboard
      navigator.clipboard.writeText(certificateUrl);
    } catch (error) {
      alert('Failed to approve submission');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (submissionId: any) => {
    if (!confirm('Reject this submission?')) return;

    setActionLoading(submissionId);
    try {
      const adminEmail = user?.primaryEmailAddress?.emailAddress || ADMIN_EMAIL;
      await rejectSubmission({ submissionId, adminEmail });
    } catch (error) {
      alert('Failed to reject submission');
    } finally {
      setActionLoading(null);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="w-8 h-8 border-4 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] p-6 pt-32">
        <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-xl">
          <h1 className="text-3xl font-serif text-center text-foreground mb-2">Admin Access Required</h1>
          <p className="text-center text-foreground/40 text-sm mb-10">Sign in to manage workshop submissions.</p>
          <SignInButton mode="modal">
            <button className="w-full py-4 bg-foreground text-background rounded-2xl text-sm font-semibold uppercase tracking-widest hover:opacity-90 transition-all">
              Sign In as Admin
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] p-6">
        <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] border border-red-100 shadow-xl text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-8 mx-auto">
            <XCircleIcon className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif text-foreground mb-2">Access Denied</h1>
          <p className="text-foreground/50 text-sm mb-8">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const pendingSubmissions = submissions?.filter((s) => s.status === 'pending') || [];
  const approvedSubmissions = submissions?.filter((s) => s.status === 'approved') || [];
  const rejectedSubmissions = submissions?.filter((s) => s.status === 'rejected') || [];

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Link href="/admin" className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-4 text-sm">
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Admin Dashboard
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif italic text-foreground">Workshop Submissions</h1>
            <p className="text-foreground/60 mt-2">Review and approve student work</p>
          </div>
          <div className="flex items-center gap-4">
            <SignOutButton redirectUrl="/">
              <button className="px-6 py-3 bg-red-500 text-white rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-red-600 transition-all">
                Logout
              </button>
            </SignOutButton>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
            <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-2">Total</p>
            <p className="text-4xl font-serif">{submissions?.length || 0}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
            <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-2">Pending</p>
            <p className="text-4xl font-serif text-yellow-600">{pendingSubmissions.length}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
            <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-2">Approved</p>
            <p className="text-4xl font-serif text-green-600">{approvedSubmissions.length}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
            <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-2">Rejected</p>
            <p className="text-4xl font-serif text-red-600">{rejectedSubmissions.length}</p>
          </div>
        </div>

        {/* Pending Submissions */}
        <div className="mb-8">
          <h2 className="text-2xl font-serif text-foreground mb-4">Pending Review</h2>
          <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-black/5">
                    <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Name</th>
                    <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Email</th>
                    <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Drive Link</th>
                    <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Video</th>
                    <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Submitted</th>
                    <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.03]">
                  {!submissions ? (
                    <tr>
                      <td colSpan={6} className="px-8 py-20 text-center">
                        <div className="w-6 h-6 border-2 border-foreground border-t-transparent rounded-full animate-spin mx-auto" />
                      </td>
                    </tr>
                  ) : pendingSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-8 py-20 text-center text-foreground/30 italic">
                        No pending submissions
                      </td>
                    </tr>
                  ) : (
                    pendingSubmissions.map((sub: any) => (
                      <tr key={sub._id} className="hover:bg-[#fafafa] transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center text-[10px] font-bold">
                              {sub.fullName.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-foreground">{sub.fullName}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm text-foreground/60">{sub.email}</span>
                        </td>
                        <td className="px-8 py-6">
                          <a
                            href={sub.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:underline"
                          >
                            View Submission
                          </a>
                        </td>
                        <td className="px-8 py-6">
                          {sub.videoCompleted ? (
                            <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">✓ Done</span>
                          ) : (
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">Pending</span>
                          )}
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-xs text-foreground/40">
                            {new Date(sub.submittedAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleApprove(sub._id)}
                              disabled={actionLoading === sub._id}
                              className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors disabled:opacity-50 whitespace-nowrap"
                            >
                              {actionLoading === sub._id ? '⏳ Approving...' : '✓ Approve & Generate'}
                            </button>
                            <button
                              onClick={() => handleReject(sub._id)}
                              disabled={actionLoading === sub._id}
                              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Approved Submissions */}
        {approvedSubmissions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-serif text-foreground mb-4">Approved Submissions</h2>
            <div className="bg-white rounded-[2.5rem] border border-green-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-green-100">
                      <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Name</th>
                      <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Certificate ID</th>
                      <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Approved By</th>
                      <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-green-50">
                    {approvedSubmissions.map((sub: any) => (
                      <tr key={sub._id} className="hover:bg-green-50/30 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-medium text-foreground">{sub.fullName}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">{sub.certificateId}</code>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-xs text-foreground/40">{sub.reviewedBy}</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex gap-2 justify-end">
                            <Link
                              href={`/certificates/${sub.certificateId}`}
                              target="_blank"
                              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
                            >
                              View Certificate
                            </Link>
                            <button
                              onClick={() => {
                                const url = `${window.location.origin}/certificates/${sub.certificateId}`;
                                navigator.clipboard.writeText(url);
                                alert('Certificate link copied to clipboard!');
                              }}
                              className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors"
                            >
                              Copy Link
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Rejected Submissions */}
        {rejectedSubmissions.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif text-foreground mb-4">Rejected Submissions</h2>
            <div className="bg-white rounded-[2.5rem] border border-red-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-red-100">
                      <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Name</th>
                      <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Email</th>
                      <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Rejected By</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-50">
                    {rejectedSubmissions.map((sub: any) => (
                      <tr key={sub._id} className="hover:bg-red-50/30 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <XCircleIcon className="w-5 h-5 text-red-500" />
                            <span className="text-sm font-medium text-foreground/60">{sub.fullName}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm text-foreground/60">{sub.email}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-xs text-foreground/40">{sub.reviewedBy}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
