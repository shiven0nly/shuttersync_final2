import ComingSoon from '@/components/common/ComingSoon';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses | Coming Soon',
  description: 'Our professional photography courses section is coming soon. Stay tuned!',
};

export default function CoursesPage() {
  return <ComingSoon title="Courses" />;
}
