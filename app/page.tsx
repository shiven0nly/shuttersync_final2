import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HomepageInteractive from './homepage/components/HomepageInteractive';

export const metadata: Metadata = {
  title: 'ShutterSync — Sync Your Vision',
  description: 'A hub for photographers to share their clicks, discuss editing techniques, participate in weekly challenges, and connect. Join the ShutterSync community.',
  keywords: 'photography, community, gallery, challenges, ShutterSync, photo walks, workshops',
  openGraph: {
    title: 'ShutterSync — Sync Your Vision',
    description: 'A hub for photographers to share, learn, and grow together.',
    type: 'website',
  },
};

export default function Homepage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HomepageInteractive />
      <Footer />
    </main>
  );
}
