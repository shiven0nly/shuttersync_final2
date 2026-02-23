import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
    title: 'Meet the Admins — ShutterSync',
    description: 'Get in touch with the ShutterSync team. Meet our admins and drop us a message.',
    alternates: {
        canonical: 'https://shuttersync-photography.netlify.app/contact',
    },
    openGraph: {
        type: 'website',
        url: 'https://shuttersync-photography.netlify.app/contact',
        title: 'Contact Us — ShutterSync Photography',
        description: 'Get in touch with the ShutterSync team. Meet our admins and connect with us.',
        siteName: 'ShutterSync Photography Community',
        images: [
            {
                url: 'https://shuttersync-photography.netlify.app/logo.jpeg',
                width: 1200,
                height: 630,
                alt: 'Contact ShutterSync Photography',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Us — ShutterSync Photography',
        description: 'Get in touch with the ShutterSync team. Meet our admins and connect with us.',
        images: ['https://shuttersync-photography.netlify.app/logo.jpeg'],
    },
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background overflow-x-hidden">
            <Header />
            <ContactContent />
            <Footer />
        </main>
    );
}
