import { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
    title: 'About Us — ShutterSync',
    description: 'Learn more about ShutterSync, our mission, vision, and the team behind the lens.',
};

export default function AboutPage() {
    return <AboutContent />;
}
