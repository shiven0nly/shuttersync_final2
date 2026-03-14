'use client';

import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function AdminSettingsPage() {
    return (
        <div className="min-h-screen bg-[#fafafa] pt-32 pb-20 px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-8 text-sm">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to Dashboard
                </Link>
                <h1 className="text-4xl md:text-5xl font-serif italic text-foreground mb-4">Settings</h1>
                <p className="text-foreground/50 text-sm mb-12">Application configuration and preferences.</p>
                <div className="bg-white p-12 rounded-[2.5rem] border border-black/5 shadow-sm text-center">
                    <p className="text-foreground/40 text-sm">Settings panel coming soon.</p>
                </div>
            </div>
        </div>
    );
}
