import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ChallengeContent from './ChallengeContent';

export const metadata: Metadata = {
    title: 'Challenge of the Week — ShutterSync',
    description: 'Participate in our weekly photography challenges, vote for the best shots, and see past winners in the Hall of Fame.',
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
