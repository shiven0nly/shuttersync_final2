'use client';

import { useState, useEffect } from 'react';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';
import { useQuery, useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';
import { Id } from 'convex/_generated/dataModel';
import { EnvelopeIcon as MailIcon, PhoneIcon, ArrowRightOnRectangleIcon as LogOutIcon, Squares2X2Icon as LayoutDashboardIcon, DocumentTextIcon as ScrollTextIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const ADMIN_EMAIL = 'admin@shuttersync.com';

export default function AdminPage() {
    const { user, isLoaded } = useUser();
    const registrations = useQuery(api.registrations.getAllRegistrations);
    const cancelRegistration = useMutation(api.registrations.cancelRegistration);
    const reactivateRegistration = useMutation(api.registrations.reactivateRegistration);
    
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const isAdmin = user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

    const handleCancelRegistration = async (registrationId: Id<"workshop_registrations">) => {
        if (!confirm('Are you sure you want to cancel this registration?')) return;
        
        setActionLoading(registrationId);
        try {
            await cancelRegistration({
                registrationId,
                adminEmail: user?.primaryEmailAddress?.emailAddress || ADMIN_EMAIL
            });
        } catch (error) {
            alert('Failed to cancel registration');
        } finally {
            setActionLoading(null);
        }
    };

    const handleReactivateRegistration = async (registrationId: Id<"workshop_registrations">) => {
        if (!confirm('Are you sure you want to reactivate this registration?')) return;
        
        setActionLoading(registrationId);
        try {
            await reactivateRegistration({ registrationId });
        } catch (error) {
            alert('Failed to reactivate registration');
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
                    <div className="w-16 h-16 bg-foreground text-background rounded-2xl flex items-center justify-center mb-8 mx-auto">
                        <LayoutDashboardIcon className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-serif text-center text-foreground mb-2">Admin Dashboard</h1>
                    <p className="text-center text-foreground/40 text-sm mb-10">Restricted access area.</p>

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
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        );
    }

    const activeRegistrations = registrations?.filter(r => r.status === 'active') || [];
    const cancelledRegistrations = registrations?.filter(r => r.status === 'cancelled') || [];

    return (
        <div className="min-h-screen bg-[#fafafa] pt-32 pb-20 px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                                <ScrollTextIcon className="w-5 h-5" />
                            </span>
                            <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Admin Portal</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif italic text-foreground">Workshop <br />Registrations</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
                        <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-2">Total Registrations</p>
                        <p className="text-4xl font-serif">{registrations?.length || 0}</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
                        <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-2">Active</p>
                        <p className="text-4xl font-serif text-green-600">{activeRegistrations.length}</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
                        <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-2">Cancelled</p>
                        <p className="text-4xl font-serif text-red-600">{cancelledRegistrations.length}</p>
                    </div>
                </div>

                {/* Active Registrations Table */}
                <div className="mb-8">
                    <h2 className="text-2xl font-serif text-foreground mb-4">Active Registrations</h2>
                    <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-black/5">
                                        <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Name</th>
                                        <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Email</th>
                                        <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Phone</th>
                                        <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/[0.03]">
                                    {!registrations ? (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-20 text-center">
                                                <div className="w-6 h-6 border-2 border-foreground border-t-transparent rounded-full animate-spin mx-auto" />
                                            </td>
                                        </tr>
                                    ) : activeRegistrations.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-20 text-center text-foreground/30 italic">
                                                No active registrations found.
                                            </td>
                                        </tr>
                                    ) : (
                                        activeRegistrations.map((reg) => (
                                            <tr key={reg._id} className="hover:bg-[#fafafa] transition-colors group">
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
                                                        onClick={() => handleCancelRegistration(reg._id)}
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

                {/* Cancelled Registrations Table */}
                {cancelledRegistrations.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-serif text-foreground mb-4">Cancelled Registrations</h2>
                        <div className="bg-white rounded-[2.5rem] border border-red-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-red-100">
                                            <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Name</th>
                                            <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Email</th>
                                            <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Cancelled By</th>
                                            <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-foreground/40 font-bold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-red-50">
                                        {cancelledRegistrations.map((reg) => (
                                            <tr key={reg._id} className="hover:bg-red-50/30 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                                                            {reg.fullName.charAt(0)}
                                                        </div>
                                                        <span className="text-sm font-medium text-foreground/60">{reg.fullName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-sm text-foreground/60">{reg.email}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-xs text-foreground/40">{reg.cancelledBy || 'Unknown'}</span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button
                                                        onClick={() => handleReactivateRegistration(reg._id)}
                                                        disabled={actionLoading === reg._id}
                                                        className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors disabled:opacity-50"
                                                    >
                                                        {actionLoading === reg._id ? 'Reactivating...' : 'Reactivate'}
                                                    </button>
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
