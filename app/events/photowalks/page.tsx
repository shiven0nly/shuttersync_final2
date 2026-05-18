import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import PhotowalksContent from './PhotowalksContent';

export const metadata: Metadata = {
    title: 'Photo Walks — Coming Soon | ShutterSync',
    description: 'Guided street and urban photography walks. Connect with fellow creators, capture the city rhythm, and elevate your craft. Join the waitlist.',
    alternates: {
        canonical: 'https://shuttersync-photography.netlify.app/events/photowalks',
    },
    openGraph: {
        type: 'website',
        url: 'https://shuttersync-photography.netlify.app/events/photowalks',
        title: 'Urban Photo Walks — Coming Soon | ShutterSync',
        description: 'Explore the city pulse through your lens. Guided street photography walks, composition tips, and community gatherings.',
        siteName: 'ShutterSync Photography Community',
        images: [
            {
                url: 'https://shuttersync-photography.netlify.app/street.jpeg',
                width: 1200,
                height: 630,
                alt: 'ShutterSync Photo Walks',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Photo Walks — Coming Soon | ShutterSync',
        description: 'Guided street and urban photography walks. Connect with creators, capture city rhythm. Join the waitlist.',
        images: ['https://shuttersync-photography.netlify.app/street.jpeg'],
    },
};

export default function PhotowalksPage() {
    return (
        <main className="min-h-screen bg-background overflow-x-hidden">
            <Header />
            <PhotowalksContent />
            <Footer />
        </main>
    );
}
