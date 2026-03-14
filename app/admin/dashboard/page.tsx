'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery, useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';
import { EnvelopeIcon as MailIcon, PhoneIcon, ArrowDownTrayIcon, DocumentTextIcon as ScrollTextIcon } from '@heroicons/react/24/outline';
import { exportToExcel, exportJoinMembersToExcel } from '@/lib/exportToExcel';
import Link from 'next/link';

type RegistrationType = 'workshop' | 'photowalk' | 'course' | 'competition' | 'joinMembers';

export default function AdminPage() {
    const { user, isLoaded } = useUser();
    const [activeTab, setActiveTab] = useState<RegistrationType>('workshop');
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [exporting, setExporting] = useState(false);

    // Queries for all registration types
    const workshopRegistrations = useQuery(api.registrations.getAllRegistrations);
    const photowalkRegistrations = useQuery(api.photowalks.getAllRegistrations);
    const courseRegistrations = useQuery(api.courses.getAllRegistrations);
    const competitionRegistrations = useQuery(api.competitions.getAllRegistrations);
    const joinMembersApplications = useQuery(api.joinMembers.getAllApplications);

    // Mutations
    const cancelWorkshop = useMutation(api.registrations.cancelRegistration);
    const reactivateWorkshop = useMutation(api.registrations.reactivateRegistration);
    const cancelPhotowalk = useMutation(api.photowalks.cancelRegistration);
    const reactivatePhotowalk = useMutation(api.photowalks.reactivateRegistration);
    const cancelCourse = useMutation(api.courses.cancelRegistration);
    const reactivateCourse = useMutation(api.courses.reactivateRegistration);
    const cancelCompetition = useMutation(api.competitions.cancelRegistration);
    const reactivateCompetition = useMutation(api.competitions.reactivateRegistration);
    const approveApplication = useMutation(api.joinMembers.approveApplication);
    const rejectApplication = useMutation(api.joinMembers.rejectApplication);

    // Admin role is now enforced by middleware (proxy.ts) — no client-side gate needed.

    const getCurrentData = () => {
        switch (activeTab) {
            case 'workshop': return workshopRegistrations || [];
            case 'photowalk': return photowalkRegistrations || [];
            case 'course': return courseRegistrations || [];
            case 'competition': return competitionRegistrations || [];
            case 'joinMembers': return joinMembersApplications || [];
        }
    };

    const handleCancel = async (registrationId: any) => {
        if (!confirm('Are you sure you want to cancel this registration?')) return;
        
        setActionLoading(registrationId);
        try {
            switch (activeTab) {
                case 'workshop':
                    await cancelWorkshop({ registrationId });
                    break;
                case 'photowalk':
                    await cancelPhotowalk({ registrationId });
                    break;
                case 'course':
                    await cancelCourse({ registrationId });
                    break;
                case 'competition':
                    await cancelCompetition({ registrationId });
                    break;
            }
        } catch (error) {
            alert('Failed to cancel registration');
        } finally {
            setActionLoading(null);
        }
    };

    const handleReactivate = async (registrationId: any) => {
        if (!confirm('Are you sure you want to reactivate this registration?')) return;
        
        setActionLoading(registrationId);
        try {
            switch (activeTab) {
                case 'workshop':
                    await reactivateWorkshop({ registrationId });
                    break;
                case 'photowalk':
                    await reactivatePhotowalk({ registrationId });
                    break;
                case 'course':
                    await reactivateCourse({ registrationId });
                    break;
                case 'competition':
                    await reactivateCompetition({ registrationId });
                    break;
            }
        } catch (error) {
            alert('Failed to reactivate registration');
        } finally {
            setActionLoading(null);
        }
    };

    const handleApprove = async (applicationId: any) => {
        if (!confirm('Are you sure you want to approve this application?')) return;
        
        setActionLoading(applicationId);
        try {
            await approveApplication({ applicationId });
        } catch (error) {
            alert('Failed to approve application');
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (applicationId: any) => {
        if (!confirm('Are you sure you want to reject this application?')) return;
        
        setActionLoading(applicationId);
        try {
            await rejectApplication({ applicationId });
        } catch (error) {
            alert('Failed to reject application');
        } finally {
            setActionLoading(null);
        }
    };

    const handleExport = async () => {
        setExporting(true);
        try {
            const data = getCurrentData();
            const tabNames = {
                workshop: 'Workshop Registrations',
                photowalk: 'Photowalk Registrations',
                course: 'Course Registrations',
                competition: 'Competition Registrations',
                joinMembers: 'Join Members Applications',
            };
            const filename = `${activeTab}_${activeTab === 'joinMembers' ? 'applications' : 'registrations'}_${new Date().toISOString().split('T')[0]}.xlsx`;
            
            if (activeTab === 'joinMembers') {
                await exportJoinMembersToExcel(data as any, filename, tabNames[activeTab]);
            } else {
                await exportToExcel(data as any, filename, tabNames[activeTab]);
            }
        } catch (error) {
            alert('Failed to export data');
        } finally {
            setExporting(false);
        }
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
                <div className="w-8 h-8 border-4 border-foreground border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const currentData = getCurrentData();
    const activeRegistrations = activeTab === 'joinMembers' 
        ? currentData.filter((r: any) => r.status === 'pending')
        : currentData.filter((r: any) => r.status === 'active');
    const cancelledRegistrations = activeTab === 'joinMembers'
        ? currentData.filter((r: any) => r.status === 'rejected')
        : currentData.filter((r: any) => r.status === 'cancelled');
    const approvedApplications = activeTab === 'joinMembers'
        ? currentData.filter((r: any) => r.status === 'approved')
        : [];

    const tabs = [
        { id: 'workshop' as RegistrationType, label: 'Workshops', icon: '🎨' },
        { id: 'photowalk' as RegistrationType, label: 'Photowalks', icon: '📸' },
        { id: 'course' as RegistrationType, label: 'Courses', icon: '📚' },
        { id: 'competition' as RegistrationType, label: 'Competitions', icon: '🏆' },
        { id: 'joinMembers' as RegistrationType, label: 'Join Members', icon: '👥' },
    ];

    return (
        <div className="min-h-screen bg-[#fafafa] pt-32 pb-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                                <ScrollTextIcon className="w-5 h-5" />
                            </span>
                            <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Admin Portal</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif italic text-foreground">Registration <br />Management</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/admin/workshop-submissions">
                            <button className="px-6 py-3 bg-orange-500 text-white rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-colors flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Workshop Submissions
                            </button>
                        </Link>
                        <Link href="/admin/users">
                            <button className="px-6 py-3 bg-blue-500 text-white rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors flex items-center gap-2">
                                Users
                            </button>
                        </Link>
                        <Link href="/admin/settings">
                            <button className="px-6 py-3 bg-gray-700 text-white rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-colors flex items-center gap-2">
                                Settings
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-2xl text-sm font-semibold uppercase tracking-wider transition-all ${
                                activeTab === tab.id
                                    ? 'bg-foreground text-background shadow-lg'
                                    : 'bg-white text-foreground/60 hover:text-foreground border border-black/5'
                            }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
                        <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-2">Total</p>
                        <p className="text-4xl font-serif">{currentData.length}</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
                        <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-2">
                            {activeTab === 'joinMembers' ? 'Pending' : 'Active'}
                        </p>
                        <p className="text-4xl font-serif text-green-600">{activeRegistrations.length}</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
                        <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-2">
                            {activeTab === 'joinMembers' ? 'Rejected' : 'Cancelled'}
                        </p>
                        <p className="text-4xl font-serif text-red-600">{cancelledRegistrations.length}</p>
                    </div>
                    {activeTab === 'joinMembers' ? (
                        <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
                            <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-2">Approved</p>
                            <p className="text-4xl font-serif text-blue-600">{approvedApplications.length}</p>
                        </div>
                    ) : null}
                    <div className="bg-blue-500 p-8 rounded-3xl shadow-lg flex items-center justify-center">
                        <button
                            onClick={handleExport}
                            disabled={exporting || currentData.length === 0}
                            className="flex flex-col items-center gap-2 text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg px-4 py-2"
                            aria-label="Export data to Excel"
                        >
                            <ArrowDownTrayIcon className="w-8 h-8" />
                            <span className="text-xs font-semibold uppercase tracking-wider">
                                {exporting ? 'Exporting...' : 'Export Excel'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Active Registrations / Pending Applications */}
                <div className="mb-8">
                    <h2 className="text-2xl font-serif text-foreground mb-4">
                        {activeTab === 'joinMembers' ? 'Pending Applications' : 'Active Registrations'}
                    </h2>
                    <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-black/5">
                                        <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Name</th>
                                        <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Email</th>
                                        {activeTab === 'joinMembers' ? (
                                            <>
                                                <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Experience</th>
                                                <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Portfolio</th>
                                            </>
                                        ) : (
                                            <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Phone</th>
                                        )}
                                        <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/[0.03]">
                                    {!currentData ? (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center">
                                                <div className="w-6 h-6 border-2 border-foreground border-t-transparent rounded-full animate-spin mx-auto" />
                                            </td>
                                        </tr>
                                    ) : activeRegistrations.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center text-foreground/30 italic">
                                                {activeTab === 'joinMembers' ? 'No pending applications found.' : 'No active registrations found.'}
                                            </td>
                                        </tr>
                                    ) : activeTab === 'joinMembers' ? (
                                        activeRegistrations.map((app: any) => (
                                            <tr key={app._id} className="hover:bg-[#fafafa] transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                                                            {app.name.charAt(0)}
                                                        </div>
                                                        <span className="text-sm font-medium text-foreground">{app.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2 text-foreground/60 text-sm">
                                                        <MailIcon className="w-3.5 h-3.5" />
                                                        {app.email}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full capitalize">
                                                        {app.experience}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    {app.portfolio ? (
                                                        <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">
                                                            View Portfolio
                                                        </a>
                                                    ) : (
                                                        <span className="text-xs text-foreground/30">N/A</span>
                                                    )}
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex gap-2 justify-end">
                                                        <button
                                                            onClick={() => handleApprove(app._id)}
                                                            disabled={actionLoading === app._id}
                                                            className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors disabled:opacity-50"
                                                        >
                                                            {actionLoading === app._id ? 'Approving...' : 'Approve'}
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(app._id)}
                                                            disabled={actionLoading === app._id}
                                                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors disabled:opacity-50"
                                                        >
                                                            {actionLoading === app._id ? 'Rejecting...' : 'Reject'}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        activeRegistrations.map((reg: any) => (
                                            <tr key={reg._id} className="hover:bg-[#fafafa] transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                                                            {reg.fullName.charAt(0)}
                                                        </div>
                                                        <span className="text-sm font-medium text-foreground">{reg.fullName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2 text-foreground/60 text-sm">
                                                        <MailIcon className="w-3.5 h-3.5" />
                                                        {reg.email}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2 text-foreground/60 text-sm">
                                                        <PhoneIcon className="w-3.5 h-3.5" />
                                                        {reg.phoneNumber}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button
                                                        onClick={() => handleCancel(reg._id)}
                                                        disabled={actionLoading === reg._id}
                                                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors disabled:opacity-50"
                                                    >
                                                        {actionLoading === reg._id ? 'Cancelling...' : 'Cancel'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Cancelled Registrations / Rejected Applications */}
                {cancelledRegistrations.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-serif text-foreground mb-4">
                            {activeTab === 'joinMembers' ? 'Rejected Applications' : 'Cancelled Registrations'}
                        </h2>
                        <div className="bg-white rounded-[2.5rem] border border-red-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-red-100">
                                            <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Name</th>
                                            <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Email</th>
                                            <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">
                                                {activeTab === 'joinMembers' ? 'Rejected By' : 'Cancelled By'}
                                            </th>
                                            <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-red-50">
                                        {cancelledRegistrations.map((reg: any) => (
                                            <tr key={reg._id} className="hover:bg-red-50/30 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                                                            {(activeTab === 'joinMembers' ? reg.name : reg.fullName).charAt(0)}
                                                        </div>
                                                        <span className="text-sm font-medium text-foreground/60">
                                                            {activeTab === 'joinMembers' ? reg.name : reg.fullName}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-sm text-foreground/60">{reg.email}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-xs text-foreground/40">
                                                        {activeTab === 'joinMembers' ? (reg.reviewedBy || 'Unknown') : (reg.cancelledBy || 'Unknown')}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    {activeTab === 'joinMembers' ? (
                                                        <button
                                                            onClick={() => handleApprove(reg._id)}
                                                            disabled={actionLoading === reg._id}
                                                            className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors disabled:opacity-50"
                                                        >
                                                            {actionLoading === reg._id ? 'Approving...' : 'Approve'}
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleReactivate(reg._id)}
                                                            disabled={actionLoading === reg._id}
                                                            className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors disabled:opacity-50"
                                                        >
                                                            {actionLoading === reg._id ? 'Reactivating...' : 'Reactivate'}
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Approved Applications (Join Members only) */}
                {activeTab === 'joinMembers' && approvedApplications.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-serif text-foreground mb-4">Approved Applications</h2>
                        <div className="bg-white rounded-[2.5rem] border border-green-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-green-100">
                                            <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Name</th>
                                            <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Email</th>
                                            <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Experience</th>
                                            <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Approved By</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-green-50">
                                        {approvedApplications.map((app: any) => (
                                            <tr key={app._id} className="hover:bg-green-50/30 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                                                            {app.name.charAt(0)}
                                                        </div>
                                                        <span className="text-sm font-medium text-foreground">{app.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-sm text-foreground/60">{app.email}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full capitalize">
                                                        {app.experience}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-xs text-foreground/40">{app.reviewedBy || 'Unknown'}</span>
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
