import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import GalleryContent from './GalleryContent';

export const metadata: Metadata = {
    title: 'Gallery — ShutterSync',
    description: 'Explore stunning photography from the ShutterSync community. Like, comment, and discover camera settings behind every shot.',
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
