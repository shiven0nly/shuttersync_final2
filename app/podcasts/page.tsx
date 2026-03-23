import ComingSoon from '@/components/common/ComingSoon';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Podcasts | Coming Soon',
  description: 'Our photography podcasts section is coming soon. Stay tuned!',
};

export default function PodcastsPage() {
  return <ComingSoon title="Podcasts" />;
}
