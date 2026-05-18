import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ClubTripsContent from './ClubTripsContent';

export const metadata: Metadata = {
    title: 'Expeditions & Club Trips — Coming Soon | ShutterSync',
    description: 'Landscape and nature expeditions outside the city with fellow photographers. Connect with the community, chase the golden hour, and capture wilderness. Join the waitlist.',
    alternates: {
        canonical: 'https://shuttersync-photography.netlify.app/events/club-trips',
    },
    openGraph: {
        type: 'website',
        url: 'https://shuttersync-photography.netlify.app/events/club-trips',
        title: 'Expeditions & Club Trips — Coming Soon | ShutterSync',
        description: 'Escape the city and chase the sunset with our vibrant community. Nature trekking, weekend overnight stays, and travel photography diaries.',
        siteName: 'ShutterSync Photography Community',
        images: [
            {
                url: 'https://shuttersync-photography.netlify.app/scenery1.jpeg',
                width: 1200,
                height: 630,
                alt: 'ShutterSync Expeditions & Club Trips',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Expeditions & Club Trips — Coming Soon | ShutterSync',
        description: 'Landscape and nature expeditions outside the city with fellow photographers. Chase golden hour. Join the waitlist.',
        images: ['https://shuttersync-photography.netlify.app/scenery1.jpeg'],
    },
};

export default function ClubTripsPage() {
    return (
        <main className="min-h-screen bg-background overflow-x-hidden">
            <Header />
            <ClubTripsContent />
            <Footer />
        </main>
    );
}
