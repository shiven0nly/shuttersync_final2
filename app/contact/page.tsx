import { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
    title: 'Contact & Our Story — ShutterSync',
    description: 'Connect with ShutterSync, learn about our vision to unify photography feedback and education, and follow our journey.',
};

export default function ContactPage() {
    return <ContactContent />;
}
