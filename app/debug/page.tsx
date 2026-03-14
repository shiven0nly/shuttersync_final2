'use client';

import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import { useUser } from '@clerk/nextjs';

export default function DebugPage() {
    const { user } = useUser();
    const identity = useQuery(api.debug.getIdentity);

    return (
        <div className="min-h-screen bg-[#fafafa] pt-32 pb-20 px-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-serif mb-8">RBAC Debug</h1>
                
                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/40 mb-4">Clerk Client-Side (user.publicMetadata)</h2>
                    <pre className="text-xs bg-gray-100 p-4 rounded-lg overflow-auto">
                        {JSON.stringify(user?.publicMetadata, null, 2)}
                    </pre>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/40 mb-4">Convex Server-Side (identity from JWT)</h2>
                    <pre className="text-xs bg-gray-100 p-4 rounded-lg overflow-auto">
                        {JSON.stringify(identity, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
}
