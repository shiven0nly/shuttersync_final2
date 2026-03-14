'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery, useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';
import { 
    EnvelopeIcon, 
    PhoneIcon, 
    GlobeAltIcon,
    BuildingOfficeIcon,
    XCircleIcon,
    CheckCircleIcon,
    ClockIcon,
    TrashIcon,
    ChatBubbleLeftRightIcon,
    BanknotesIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { Id } from 'convex/_generated/dataModel';



type StatusType = 'pending' | 'reviewed' | 'contacted' | 'closed';

interface Inquiry {
    _id: Id<'collaboration_inquiries'>;
    _creationTime: number;
    organizationType: string;
    organizationName: string;
    contactPersonName: string;
    email: string;
    phoneNumber: string;
    website?: string;
    collaborationType: string;
    projectDetails: string;
    budget?: string;
    timeline?: string;
    status: string;
    reviewedBy?: string;
    reviewedAt?: number;
    notes?: string;
    submittedAt: number;
}

export default function CollaborationInquiriesPage() {
    const { user, isLoaded } = useUser();
    const [activeStatus, setActiveStatus] = useState<StatusType>('pending');
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [notes, setNotes] = useState('');

    const inquiries = useQuery(api.collaborationInquiries.getAllInquiries);
    const updateStatus = useMutation(api.collaborationInquiries.updateInquiryStatus);
    const deleteInquiry = useMutation(api.collaborationInquiries.deleteInquiry);

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground"></div>
            </div>
        );
    }

    // Admin role is enforced by middleware (proxy.ts)

    const filteredInquiries = inquiries?.filter(inq => inq.status === activeStatus) || [];

    const statusCounts = {
        pending: inquiries?.filter(inq => inq.status === 'pending').length || 0,
        reviewed: inquiries?.filter(inq => inq.status === 'reviewed').length || 0,
        contacted: inquiries?.filter(inq => inq.status === 'contacted').length || 0,
        closed: inquiries?.filter(inq => inq.status === 'closed').length || 0,
    };

    const handleStatusUpdate = async (inquiryId: Id<'collaboration_inquiries'>, newStatus: string) => {
        setActionLoading(inquiryId);
        try {
            await updateStatus({
                inquiryId,
                status: newStatus,
                notes: notes || undefined,
            });
            setNotes('');
            setSelectedInquiry(null);
        } catch (error) {
            alert('Failed to update status');
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (inquiryId: Id<'collaboration_inquiries'>) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return;
        setActionLoading(inquiryId);
        try {
            await deleteInquiry({ inquiryId });
        } catch (error) {
            alert('Failed to delete inquiry');
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-foreground/10">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/admin" className="text-sm text-foreground/40 hover:text-foreground mb-2 inline-block">
                                ← Back to Admin
                            </Link>
                            <h1 className="text-3xl font-serif text-foreground">Collaboration Inquiries</h1>
                            <p className="text-foreground/50 text-sm mt-2">Manage partnership and collaboration requests</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-foreground/60">{user?.primaryEmailAddress?.emailAddress}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Tabs */}
            <div className="border-b border-foreground/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-8">
                        {(['pending', 'reviewed', 'contacted', 'closed'] as StatusType[]).map((status) => (
                            <button
                                key={status}
                                onClick={() => setActiveStatus(status)}
                                className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                                    activeStatus === status
                                        ? 'border-foreground text-foreground'
                                        : 'border-transparent text-foreground/40 hover:text-foreground/70'
                                }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-foreground/5">
                                    {statusCounts[status]}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {filteredInquiries.length === 0 ? (
                    <div className="text-center py-16">
                        <ClockIcon className="w-16 h-16 mx-auto text-foreground/20 mb-4" />
                        <p className="text-foreground/40">No {activeStatus} inquiries</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {filteredInquiries.map((inquiry) => (
                            <div
                                key={inquiry._id}
                                className="bg-white rounded-xl border border-foreground/10 p-6 hover:shadow-md transition-shadow"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <BuildingOfficeIcon className="w-5 h-5 text-foreground/40" />
                                            <h3 className="text-lg font-semibold text-foreground">
                                                {inquiry.organizationName}
                                            </h3>
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-foreground/5 text-foreground/60">
                                                {inquiry.organizationType}
                                            </span>
                                        </div>
                                        <p className="text-sm text-foreground/60">
                                            Submitted {new Date(inquiry.submittedAt).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(inquiry._id)}
                                        disabled={actionLoading === inquiry._id}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                        aria-label="Delete inquiry"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Contact Info Grid */}
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center">
                                            <EnvelopeIcon className="w-4 h-4 text-foreground/60" />
                                        </div>
                                        <div>
                                            <p className="text-foreground/40 text-xs">Contact Person</p>
                                            <p className="text-foreground font-medium">{inquiry.contactPersonName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center">
                                            <EnvelopeIcon className="w-4 h-4 text-foreground/60" />
                                        </div>
                                        <div>
                                            <p className="text-foreground/40 text-xs">Email</p>
                                            <a href={`mailto:${inquiry.email}`} className="text-foreground font-medium hover:underline">
                                                {inquiry.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center">
                                            <PhoneIcon className="w-4 h-4 text-foreground/60" />
                                        </div>
                                        <div>
                                            <p className="text-foreground/40 text-xs">Phone</p>
                                            <a href={`tel:${inquiry.phoneNumber}`} className="text-foreground font-medium hover:underline">
                                                {inquiry.phoneNumber}
                                            </a>
                                        </div>
                                    </div>
                                    {inquiry.website && (
                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center">
                                                <GlobeAltIcon className="w-4 h-4 text-foreground/60" />
                                            </div>
                                            <div>
                                                <p className="text-foreground/40 text-xs">Website</p>
                                                <a 
                                                    href={inquiry.website} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-foreground font-medium hover:underline"
                                                >
                                                    {inquiry.website}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Collaboration Details */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <ChatBubbleLeftRightIcon className="w-4 h-4 text-foreground/40" />
                                        <span className="text-xs uppercase tracking-wider text-foreground/40">Collaboration Type</span>
                                    </div>
                                    <p className="text-sm font-medium text-foreground mb-4 capitalize">
                                        {inquiry.collaborationType}
                                    </p>
                                    
                                    <div className="flex items-center gap-2 mb-3">
                                        <ChatBubbleLeftRightIcon className="w-4 h-4 text-foreground/40" />
                                        <span className="text-xs uppercase tracking-wider text-foreground/40">Project Details</span>
                                    </div>
                                    <p className="text-sm text-foreground/70 leading-relaxed bg-foreground/[0.02] p-4 rounded-lg">
                                        {inquiry.projectDetails}
                                    </p>
                                </div>

                                {/* Budget & Timeline */}
                                {(inquiry.budget || inquiry.timeline) && (
                                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                                        {inquiry.budget && (
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center">
                                                    <BanknotesIcon className="w-4 h-4 text-foreground/60" />
                                                </div>
                                                <div>
                                                    <p className="text-foreground/40 text-xs">Budget</p>
                                                    <p className="text-foreground font-medium">{inquiry.budget}</p>
                                                </div>
                                            </div>
                                        )}
                                        {inquiry.timeline && (
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center">
                                                    <CalendarIcon className="w-4 h-4 text-foreground/60" />
                                                </div>
                                                <div>
                                                    <p className="text-foreground/40 text-xs">Timeline</p>
                                                    <p className="text-foreground font-medium">{inquiry.timeline}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Admin Notes */}
                                {inquiry.notes && (
                                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-xs uppercase tracking-wider text-yellow-800 mb-2">Admin Notes</p>
                                        <p className="text-sm text-yellow-900">{inquiry.notes}</p>
                                        {inquiry.reviewedBy && (
                                            <p className="text-xs text-yellow-700 mt-2">
                                                By {inquiry.reviewedBy} on {new Date(inquiry.reviewedAt!).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="border-t border-foreground/10 pt-6">
                                    {selectedInquiry?._id === inquiry._id ? (
                                        <div className="space-y-4">
                                            <textarea
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                placeholder="Add notes (optional)"
                                                className="w-full px-4 py-3 border border-foreground/10 rounded-lg text-sm focus:outline-none focus:border-foreground/30 resize-none"
                                                rows={3}
                                            />
                                            <div className="flex gap-3">
                                                {activeStatus !== 'reviewed' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(inquiry._id, 'reviewed')}
                                                        disabled={actionLoading === inquiry._id}
                                                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                                                    >
                                                        Mark Reviewed
                                                    </button>
                                                )}
                                                {activeStatus !== 'contacted' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(inquiry._id, 'contacted')}
                                                        disabled={actionLoading === inquiry._id}
                                                        className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                                                    >
                                                        Mark Contacted
                                                    </button>
                                                )}
                                                {activeStatus !== 'closed' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(inquiry._id, 'closed')}
                                                        disabled={actionLoading === inquiry._id}
                                                        className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors disabled:opacity-50"
                                                    >
                                                        Close
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        setSelectedInquiry(null);
                                                        setNotes('');
                                                    }}
                                                    className="px-4 py-2 border border-foreground/10 text-foreground rounded-lg text-sm font-medium hover:bg-foreground/5 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setSelectedInquiry(inquiry)}
                                            className="w-full px-4 py-2 border border-foreground/10 text-foreground rounded-lg text-sm font-medium hover:bg-foreground/5 transition-colors"
                                        >
                                            Update Status
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
