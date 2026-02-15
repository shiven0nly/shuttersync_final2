import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import EventsContent from './EventsContent';

export const metadata: Metadata = {
    title: 'Events & Learning — ShutterSync',
    description: 'Discover upcoming photo walks, workshops, courses, and competitions. Join the waitlist to be the first to know.',
};

export default function EventsPage() {
    return (
        <main className="min-h-screen bg-background overflow-x-hidden">
            <Header />
            <EventsContent />
            <Footer />
        </main>
    );
}
