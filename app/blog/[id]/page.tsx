import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BlogPostContent from './BlogPostContent';

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

const blogPostsData = {
  '1': {
    title: 'Mastering the Golden Ratio in Landscape Photography',
    description: 'Discover how the golden ratio transforms ordinary landscapes into captivating visual stories through mathematical composition.',
    category: 'Composition',
  },
  '2': {
    title: 'The Art of Natural Light: Window Light Portraits',
    description: 'Learn professional techniques for creating stunning portraits using only window light and simple reflectors.',
    category: 'Lighting',
  },
  '3': {
    title: 'Essential Gear for Street Photography in 2026',
    description: 'A comprehensive guide to choosing the right camera, lenses, and accessories for capturing authentic street moments.',
    category: 'Gear',
  },
  '4': {
    title: 'Color Grading Secrets: From Flat to Cinematic',
    description: 'Transform your photos with professional color grading techniques used by top commercial photographers.',
    category: 'Editing',
  },
  '5': {
    title: 'Capturing Emotion: The Psychology of Portrait Photography',
    description: 'Understanding human connection and emotion to create powerful, authentic portrait photographs.',
    category: 'Portrait',
  },
  '6': {
    title: 'Milky Way Photography: Complete Beginner\'s Guide',
    description: 'Everything you need to know about planning, shooting, and processing stunning astrophotography images.',
    category: 'Landscape',
  },
  '7': {
    title: 'Understanding Exposure Triangle: ISO, Aperture & Shutter Speed',
    description: 'Master the fundamental relationship between ISO, aperture, and shutter speed to take full control of your camera.',
    category: 'Gear',
  },
  '8': {
    title: 'Black and White Photography: Seeing in Monochrome',
    description: 'Learn to visualize scenes in black and white and create powerful monochrome images that stand the test of time.',
    category: 'Editing',
  },
  '9': {
    title: 'Food Photography Lighting: Natural vs Artificial',
    description: 'Discover the best lighting techniques for mouth-watering food photography that makes viewers hungry.',
    category: 'Lighting',
  },
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = blogPostsData[id as keyof typeof blogPostsData];

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} — ShutterSync Blog`,
    description: post.description,
    keywords: `${post.category.toLowerCase()}, photography tutorial, photography tips, ${post.title.toLowerCase()}`,
    alternates: {
      canonical: `https://shuttersync-photography.netlify.app/blog/${id}`,
    },
    openGraph: {
      type: 'article',
      url: `https://shuttersync-photography.netlify.app/blog/${id}`,
      title: post.title,
      description: post.description,
      siteName: 'ShutterSync Photography Community',
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  
  if (!blogPostsData[id as keyof typeof blogPostsData]) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <BlogPostContent postId={id} />
      <Footer />
    </main>
  );
}

export async function generateStaticParams() {
  return Object.keys(blogPostsData).map((id) => ({
    id,
  }));
}
