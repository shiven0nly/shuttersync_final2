import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ChallengeContent from './ChallengeContent';

export const metadata: Metadata = {
    title: 'Challenge of the Week — ShutterSync',
    description: 'Participate in our weekly photography challenges, vote for the best shots, and see past winners in the Hall of Fame.',
    alternates: {
        canonical: 'https://shuttersync-photography.netlify.app/challenge',
    },
    openGraph: {
        type: 'website',
        url: 'https://shuttersync-photography.netlify.app/challenge',
        title: 'Weekly Photography Challenge — ShutterSync',
        description: 'Join our weekly photography challenges, vote for the best shots, and compete with fellow photographers.',
        siteName: 'ShutterSync Photography Community',
        images: [
            {
                url: 'https://shuttersync-photography.netlify.app/logo.jpeg',
                width: 1200,
                height: 630,
                alt: 'ShutterSync Photography Challenge',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Weekly Photography Challenge — ShutterSync',
        description: 'Join our weekly photography challenges, vote for the best shots, and compete with fellow photographers.',
        images: ['https://shuttersync-photography.netlify.app/logo.jpeg'],
    },
};

export default function ChallengePage() {
    return (
        <main className="min-h-screen bg-background overflow-x-hidden">
            <Header />
            <ChallengeContent />
            <Footer />
        </main>
    );
}
