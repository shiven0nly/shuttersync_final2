import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HomepageInteractive from './components/HomepageInteractive';

export const metadata: Metadata = {
  title: 'ShutterSync - Photography Collective',
  description: 'A collective of passionate photographers dedicated to capturing the beauty of life through our lenses. Join us in creating visual stories that last forever.',
  keywords: 'photography, collective, portfolio, photographers, visual storytelling, professional photography',
  openGraph: {
    title: 'ShutterSync - Photography Collective',
    description: 'A collective of passionate photographers dedicated to capturing the beauty of life through our lenses.',
    type: 'website',
  },
};

export default function Homepage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Film Grain Overlay */}
      <div className="noise-overlay" />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <HomepageInteractive />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}