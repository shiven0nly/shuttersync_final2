import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import CompetitionsContent from './CompetitionsContent';

export const metadata: Metadata = {
    title: 'Photo Competitions — Coming Soon | ShutterSync',
    description: 'Themed photo competitions with exciting prizes, professional judging, and global exposure. Join the ShutterSync photography community.',
    alternates: {
        canonical: 'https://shuttersync-photography.netlify.app/events/competitions',
    },
    openGraph: {
        type: 'website',
        url: 'https://shuttersync-photography.netlify.app/events/competitions',
        title: 'Photo Competitions — Coming Soon | ShutterSync',
        description: 'Compete with the best. Submit your best shots, win exciting prizes, and get judged by industry professionals.',
        siteName: 'ShutterSync Photography Community',
        images: [
            {
                url: 'https://shuttersync-photography.netlify.app/logo.jpeg',
                width: 1200,
                height: 630,
                alt: 'ShutterSync Competitions',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Photo Competitions — Coming Soon | ShutterSync',
        description: 'Compete with the best. Submit your best shots, win exciting prizes, and get judged by industry professionals.',
        images: ['https://shuttersync-photography.netlify.app/logo.jpeg'],
    },
};

export default function CompetitionsPage() {
    return (
        <main className="min-h-screen bg-background overflow-x-hidden">
            <Header />
            <CompetitionsContent />
            <Footer />
        </main>
    );
}
