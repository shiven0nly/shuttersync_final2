'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import Link from 'next/link';
import SSEmptyState from '@/components/ui/SSEmptyState';
import { TrophyIcon, Users, CameraIcon, SparklesIcon } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SSTokenBadge from '@/components/my-learning/SSTokenBadge';
import SSFilterTabs from '@/components/my-learning/SSFilterTabs';
import SSEnrollmentCard from '@/components/my-learning/SSEnrollmentCard';
import SSLoadingSkeleton from '@/components/my-learning/SSLoadingSkeleton';
import { UserCircleIcon } from '@heroicons/react/24/outline';

// Metadata mapping for IDs to display content
const WORKSHOP_METADATA: Record<number, any> = {
    3: {
        title: "Lightroom Mastery",
        description: "Master the art of post-processing with high-contrast workflows.",
        instructor: "Will be announced soon",
        date: "Coming Soon",
        thumbnail: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1000",
        href: "/workshops/lightroom-mastery"
    }
};

const COURSE_METADATA: Record<number, any> = {
    1: {
        title: "Photography Fundamentals",
        description: "The complete guide to exposure, composition, and lighting.",
        instructor: "Sarah Chen",
        thumbnail: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=1000",
        href: "/courses/fundamentals"
    }
};

const EVENT_METADATA: Record<number, any> = {
    1: {
        title: "Sunset Photowalk: Mumbai",
        description: "Join us for a golden hour walk through the streets of Mumbai.",
        instructor: "Local Chapter",
        thumbnail: "https://images.unsplash.com/photo-1570160897042-bc420f8660a1?auto=format&fit=crop&q=80&w=1000",
        href: "/events/mumbai-photowalk"
    },
    2: {
        title: "Global Photography Contest",
        description: "Submit your best shots and win amazing prizes.",
        instructor: "ShutterSync",
        thumbnail: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=1000",
        href: "/events/competition"
    }
};

export default function MyLearningDashboard() {
    const { user, isLoaded: isAuthLoaded } = useUser();
    const [activeTab, setActiveTab] = useState('All');

    const enrollments = useQuery(
        api.registrations.getMyEnrollments,
        user ? { userId: user.id } : 'skip'
    );

    const userData = useQuery(
        api.users.getUser,
        user ? { userId: user.id } : 'skip'
    );

    if (!isAuthLoaded || enrollments === undefined) {
        return (
            <main className="min-h-screen bg-[#fafaf9]">
                <Header />
                <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                    <div className="h-10 w-48 bg-slate-100 rounded-lg animate-pulse mb-4" />
                    <div className="h-6 w-72 bg-slate-100 rounded-lg animate-pulse mb-12" />
                    <SSLoadingSkeleton />
                </div>
                <Footer />
            </main>
        );
    }

    // Filter enrollments based on active tab
    const getFilteredEnrollments = () => {
        if (!enrollments) return [];
        
        const all = [
            ...(enrollments.workshops || []).map(w => ({ ...w, type: 'workshops', meta: WORKSHOP_METADATA[w.workshopId] || WORKSHOP_METADATA[3] })),
            ...(enrollments.courses || []).map(c => ({ ...c, type: 'courses', meta: COURSE_METADATA[c.courseId] || COURSE_METADATA[1] })),
            ...(enrollments.photowalks || []).map(p => ({ ...p, type: 'events', meta: EVENT_METADATA[p.photowalkId] || EVENT_METADATA[1] })),
            ...(enrollments.competitions || []).map(comp => ({ ...comp, type: 'events', meta: EVENT_METADATA[(comp as any).competitionId ?? comp._id] || EVENT_METADATA[2] })),
        ];

        if (activeTab === 'All') return all;
        if (activeTab === 'Workshops') return all.filter(e => e.type === 'workshops');
        if (activeTab === 'Courses') return all.filter(e => e.type === 'courses');
        if (activeTab === 'Events') return all.filter(e => e.type === 'events');
        return all;
    };

    const filteredItems = getFilteredEnrollments();
    const hasEnrollments = filteredItems.length > 0;

    return (
        <main className="min-h-screen bg-[#fafaf9] flex flex-col">
            <Header />

            <div className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-20">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            Your Creative Space
                        </h1>
                        <p className="text-slate-500 text-lg font-medium">
                            Everything you’ve joined, in one place.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <SSTokenBadge tokens={userData?.totalTokens || 0} />
                        <div className="w-12 h-12 rounded-2xl border-2 border-indigo-100 bg-white p-1 shadow-sm">
                            {user?.imageUrl ? (
                                <Image src={user.imageUrl} width={48} height={48} alt="Profile" className="w-full h-full rounded-xl object-cover" />
                            ) : (
                                <UserCircleIcon className="w-full h-full text-slate-300" />
                            )}
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="sticky top-24 z-30 bg-[#fafaf9]/80 backdrop-blur-md py-4 mb-8">
                    <SSFilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                {/* Content Grid */}
                {!hasEnrollments ? (
                    <SSEmptyState 
                        title="Your Creative Space"
                        description="Enroll in workshops and courses to start seeing them here."
                        icon={CameraIcon}
                        steps={[
                            { 
                                id: 1, 
                                title: "Explore Workshops", 
                                description: "Enroll in your first photography workshop.", 
                                completed: false,
                                link: "/workshops/lightroom-mastery",
                                linkText: "Explore",
                                icon: CameraIcon
                            },
                            { 
                                id: 2, 
                                title: "Join the Community", 
                                description: "Connect with fellow creators in our community.", 
                                completed: false, 
                                link: "https://chat.whatsapp.com/DdYKdvQZZhB3FV5oSi1NcR",
                                linkText: "Join",
                                icon: Users
                            }
                        ]}
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map((item: any, idx: number) => (
                            <SSEnrollmentCard 
                                key={idx}
                                title={item.meta.title}
                                description={item.meta.description}
                                instructor={item.meta.instructor}
                                date={item.meta.date || (item.type === 'workshops' ? 'Coming Soon' : 'Active')}
                                thumbnail={item.meta.thumbnail}
                                status={item.status === 'active' ? (item.type === 'workshops' ? 'Coming Soon' : 'Enrolled') : 'Completed'}
                                href={item.meta.href}
                                type={item.type as any}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
