'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

type BlogCategory = 'all' | 'composition' | 'lighting' | 'gear' | 'editing' | 'portrait' | 'landscape';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: {
    name: string;
  };
  image: string;
  source: {
    name: string;
    url: string;
  };
  views: string;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Mastering the Golden Ratio in Landscape Photography',
    excerpt: 'Discover how the golden ratio transforms ordinary landscapes into captivating visual stories through mathematical composition.',
    category: 'Composition',
    readTime: '6 min read',
    author: {
      name: 'Sarah Mitchell',
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    source: {
      name: 'Medium',
      url: 'https://medium.com/tag/photography',
    },
    views: '12k',
  },
  {
    id: '2',
    title: 'The Art of Natural Light: Window Light Portraits',
    excerpt: 'Learn professional techniques for creating stunning portraits using only window light and simple reflectors.',
    category: 'Lighting',
    readTime: '8 min read',
    author: {
      name: 'Marcus Chen',
    },
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    source: {
      name: '121 Clicks',
      url: 'https://121clicks.com',
    },
    views: '18k',
  },
  {
    id: '3',
    title: 'Essential Gear for Street Photography in 2026',
    excerpt: 'A comprehensive guide to choosing the right camera, lenses, and accessories for capturing authentic street moments.',
    category: 'Gear',
    readTime: '10 min read',
    author: {
      name: 'David Park',
    },
    image: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=800&q=80',
    source: {
      name: 'PetaPixel',
      url: 'https://petapixel.com',
    },
    views: '24k',
  },
  {
    id: '4',
    title: 'Color Grading Secrets: From Flat to Cinematic',
    excerpt: 'Transform your photos with professional color grading techniques used by top commercial photographers.',
    category: 'Editing',
    readTime: '12 min read',
    author: {
      name: 'Emma Rodriguez',
    },
    image: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=800&q=80',
    source: {
      name: 'Fstoppers',
      url: 'https://fstoppers.com',
    },
    views: '31k',
  },
  {
    id: '5',
    title: 'Capturing Emotion: The Psychology of Portrait Photography',
    excerpt: 'Understanding human connection and emotion to create powerful, authentic portrait photographs.',
    category: 'Portrait',
    readTime: '7 min read',
    author: {
      name: 'James Anderson',
    },
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
    source: {
      name: 'Digital Photography School',
      url: 'https://digital-photography-school.com',
    },
    views: '15k',
  },
  {
    id: '6',
    title: 'Milky Way Photography: Complete Beginner\'s Guide',
    excerpt: 'Everything you need to know about planning, shooting, and processing stunning astrophotography images.',
    category: 'Landscape',
    readTime: '15 min read',
    author: {
      name: 'Lisa Wong',
    },
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
    source: {
      name: 'Lonely Speck',
      url: 'https://lonelyspeck.com',
    },
    views: '42k',
  },
  {
    id: '7',
    title: 'Understanding Exposure Triangle: ISO, Aperture & Shutter Speed',
    excerpt: 'Master the fundamental relationship between ISO, aperture, and shutter speed to take full control of your camera.',
    category: 'Gear',
    readTime: '9 min read',
    author: {
      name: 'Robert Kim',
    },
    image: 'https://images.unsplash.com/photo-1606244864456-8bee63fce472?w=800&q=80',
    source: {
      name: 'Photography Life',
      url: 'https://photographylife.com',
    },
    views: '28k',
  },
  {
    id: '8',
    title: 'Black and White Photography: Seeing in Monochrome',
    excerpt: 'Learn to visualize scenes in black and white and create powerful monochrome images that stand the test of time.',
    category: 'Editing',
    readTime: '11 min read',
    author: {
      name: 'Alexandra Stone',
    },
    image: 'https://media.istockphoto.com/id/628648170/photo/close-up-of-man-praying.jpg?s=612x612&w=0&k=20&c=QBbfCXDWWABi82VPkSWQjSaaiG6PUzMTiwCcpsx9xaM=',
    source: {
      name: 'The Phoblographer',
      url: 'https://thephoblographer.com',
    },
    views: '19k',
  },
  {
    id: '9',
    title: 'Food Photography Lighting: Natural vs Artificial',
    excerpt: 'Discover the best lighting techniques for mouth-watering food photography that makes viewers hungry.',
    category: 'Lighting',
    readTime: '8 min read',
    author: {
      name: 'Michael Torres',
    },
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    source: {
      name: 'Digital Photography School',
      url: 'https://digital-photography-school.com',
    },
    views: '22k',
  },
];

const categories = [
  { id: 'all', label: 'Latest', count: 9 },
  { id: 'composition', label: 'Composition', count: 1 },
  { id: 'lighting', label: 'Lighting', count: 2 },
  { id: 'gear', label: 'Gear', count: 2 },
  { id: 'editing', label: 'Editing', count: 2 },
  { id: 'portrait', label: 'Portrait', count: 1 },
  { id: 'landscape', label: 'Landscape', count: 1 },
];

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category.toLowerCase() === activeCategory);

  return (
    <div className="pt-32 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 text-xs font-semibold uppercase tracking-wider mb-6">
            <Icon name="BookOpenIcon" size={16} variant="outline" />
            Photography Insights
          </div>
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-balance mb-6">
            Learn & Grow Your Craft
          </h1>
          <p className="text-lg text-foreground/60 text-pretty max-w-2xl mx-auto">
            Expert tutorials, creative inspiration, and professional insights curated from the photography community
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12 pb-6 border-b border-black/10">
          {/* Categories */}
          <nav className="flex flex-wrap items-center gap-2 md:gap-3 w-full lg:w-auto" aria-label="Blog categories">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as BlogCategory)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? 'bg-foreground text-background'
                    : 'bg-black/5 text-foreground/60 hover:bg-black/10'
                }`}
                aria-label={`Filter by ${category.label}`}
                aria-pressed={activeCategory === category.id}
              >
                {category.label}
                <span className="ml-2 opacity-60">{category.count}</span>
              </button>
            ))}
          </nav>

          {/* View Toggle */}
          <div className="flex items-center gap-2" role="group" aria-label="View mode">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-foreground text-background' : 'bg-black/5 text-foreground/60 hover:bg-black/10'
              }`}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <Icon name="Squares2X2Icon" size={20} variant="outline" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-foreground text-background' : 'bg-black/5 text-foreground/60 hover:bg-black/10'
              }`}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              <Icon name="Bars3Icon" size={20} variant="outline" />
            </button>
          </div>
        </div>

        {/* Blog Grid */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
          : 'flex flex-col gap-6'
        }>
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className={`group bg-white rounded-2xl overflow-hidden border border-black/5 hover:border-black/10 transition-all duration-300 hover:shadow-lg ${
                viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
              }`}
            >
              {/* Image */}
              <Link 
                href={`/blog/${post.id}`}
                className={`relative overflow-hidden bg-black/5 ${
                  viewMode === 'list' ? 'md:w-80 h-64 md:h-auto flex-shrink-0' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes={viewMode === 'list' ? '320px' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
                />
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs">
                  <Icon name="EyeIcon" size={14} variant="outline" />
                  {post.views}
                </div>
              </Link>

              {/* Content */}
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative size-10 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {getInitials(post.author.name)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{post.author.name}</p>
                    <p className="text-xs text-foreground/60">{post.readTime}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-block px-2 py-1 rounded-md bg-orange-500/10 text-orange-600 text-[10px] font-semibold uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>

                <Link href={`/blog/${post.id}`} className="block group/title">
                  <h2 className="text-xl font-serif font-bold text-balance mb-3 group-hover/title:text-orange-500 transition-colors">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-sm text-foreground/70 text-pretty mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <a
                    href={post.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-foreground/60 hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    Source: {post.source.name}
                    <Icon name="ArrowTopRightOnSquareIcon" size={12} variant="outline" />
                  </a>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-xs font-semibold uppercase tracking-wider text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1"
                    aria-label={`Read more about ${post.title}`}
                  >
                    Read More
                    <Icon name="ArrowRightIcon" size={14} variant="outline" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        {filteredPosts.length > 0 && (
          <div className="mt-16 text-center">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-foreground text-foreground font-semibold uppercase tracking-wider text-sm hover:bg-foreground hover:text-background transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/50">
              <Icon name="ArrowPathIcon" size={18} variant="outline" />
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
