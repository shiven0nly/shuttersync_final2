import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import EventsContent from './EventsContent';

export const metadata: Metadata = {
    title: 'Events & Learning — ShutterSync',
    description: 'Discover upcoming photo walks, workshops, courses, and competitions. Join the waitlist to be the first to know.',
    alternates: {
        canonical: 'https://shuttersync-photography.netlify.app/events',
    },
    openGraph: {
        type: 'website',
        url: 'https://shuttersync-photography.netlify.app/events',
        title: 'Photography Events & Workshops — ShutterSync',
        description: 'Join our photo walks, workshops, courses, and competitions. Connect with photographers and enhance your skills.',
        siteName: 'ShutterSync Photography Community',
        images: [
            {
                url: 'https://shuttersync-photography.netlify.app/logo.jpeg',
                width: 1200,
                height: 630,
                alt: 'ShutterSync Photography Events',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Photography Events & Workshops — ShutterSync',
        description: 'Join our photo walks, workshops, courses, and competitions. Connect with photographers and enhance your skills.',
        images: ['https://shuttersync-photography.netlify.app/logo.jpeg'],
    },
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
