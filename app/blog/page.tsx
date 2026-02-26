import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: 'Photography Blog & Insights — ShutterSync',
  description: 'Discover expert photography tips, tutorials, and insights. Learn composition techniques, lighting mastery, gear reviews, and creative inspiration from professional photographers.',
  keywords: 'photography blog, photography tips, camera tutorials, composition guide, lighting techniques, photo editing, photography gear reviews, creative photography, professional photography insights',
  alternates: {
    canonical: 'https://shuttersync-photography.netlify.app/blog',
  },
  openGraph: {
    type: 'website',
    url: 'https://shuttersync-photography.netlify.app/blog',
    title: 'Photography Blog & Insights — ShutterSync Community',
    description: 'Expert photography tutorials, tips, and creative inspiration. Master composition, lighting, editing, and more from professional photographers.',
    siteName: 'ShutterSync Photography Community',
    images: [
      {
        url: 'https://shuttersync-photography.netlify.app/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'ShutterSync Photography Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photography Blog & Insights — ShutterSync',
    description: 'Expert photography tutorials, tips, and creative inspiration from professional photographers.',
    images: ['https://shuttersync-photography.netlify.app/logo.jpeg'],
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <BlogContent />
      <Footer />
    </main>
  );
}
