import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
    title: 'Meet the Admins — ShutterSync',
    description: 'Get in touch with the ShutterSync team. Meet our admins and drop us a message.',
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
