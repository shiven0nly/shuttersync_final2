import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import GalleryContent from './GalleryContent';

export const metadata: Metadata = {
    title: 'Gallery — ShutterSync',
    description: 'Explore stunning photography from the ShutterSync community. Like, comment, and discover camera settings behind every shot.',
    alternates: {
        canonical: 'https://shuttersync-photography.netlify.app/gallery',
    },
    openGraph: {
        type: 'website',
        url: 'https://shuttersync-photography.netlify.app/gallery',
        title: 'Photography Gallery — ShutterSync Community',
        description: 'Explore stunning photography from our community. Discover camera settings, techniques, and connect with fellow photographers.',
        siteName: 'ShutterSync Photography Community',
        images: [
            {
                url: 'https://shuttersync-photography.netlify.app/logo.jpeg',
                width: 1200,
                height: 630,
                alt: 'ShutterSync Photography Gallery',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Photography Gallery — ShutterSync Community',
        description: 'Explore stunning photography from our community. Discover camera settings, techniques, and connect with fellow photographers.',
        images: ['https://shuttersync-photography.netlify.app/logo.jpeg'],
    },
};

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
            <Header />
            <GalleryContent />
            <Footer />
        </main>
    );
}
