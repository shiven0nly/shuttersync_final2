'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const categories = ['All', 'Street', 'Landscape', 'Portrait', 'Architecture', 'Wildlife', 'Abstract', 'Wedding', 'Food'];

const galleryPhotos = [
    { id: 1, image: 'https://images.unsplash.com/photo-1516234140488-fecd4f4ab234?auto=format&fit=crop&w=800&q=80', title: 'Urban Pulse', photographer: 'Sarah Chen', category: 'Street', likes: 128, comments: 14, exif: 'Canon EOS R5 • f/2.8 • 1/250s • ISO 400' },
    { id: 2, image: 'https://images.unsplash.com/photo-1548588681-adf41d474533?auto=format&fit=crop&w=800&q=80', title: 'Mountain Majesty', photographer: 'Alex Rivera', category: 'Landscape', likes: 245, comments: 32, exif: 'Sony A7III • f/11 • 1/60s • ISO 100' },
    { id: 3, image: 'https://images.unsplash.com/photo-1574526787396-da66a83b83fc?auto=format&fit=crop&w=800&q=80', title: 'Silent Strength', photographer: 'Marcus Johnson', category: 'Portrait', likes: 189, comments: 21, exif: 'Nikon Z6 • f/1.8 • 1/125s • ISO 200' },
    { id: 4, image: 'https://images.unsplash.com/photo-1533331605935-1e28889cb5c4?auto=format&fit=crop&w=800&q=80', title: 'Geometric Dreams', photographer: 'Emma Watson', category: 'Architecture', likes: 156, comments: 18, exif: 'Fuji X-T5 • f/8 • 1/200s • ISO 160' },
    { id: 5, image: 'https://images.unsplash.com/photo-1638814838160-fe53ae216d14?auto=format&fit=crop&w=800&q=80', title: 'Wings of Freedom', photographer: 'David Park', category: 'Wildlife', likes: 312, comments: 45, exif: 'Canon R7 • f/5.6 • 1/2000s • ISO 800' },
    { id: 6, image: 'https://images.unsplash.com/photo-1726774045558-4f6ae15d89eb?auto=format&fit=crop&w=800&q=80', title: 'Light Dance', photographer: 'Sofia Martinez', category: 'Abstract', likes: 98, comments: 8, exif: 'Sony A7RV • f/16 • 30s • ISO 100' },
    { id: 7, image: 'https://images.unsplash.com/photo-1632689998744-8608215796f5?auto=format&fit=crop&w=800&q=80', title: 'Forever Begins', photographer: 'James Lee', category: 'Wedding', likes: 267, comments: 38, exif: 'Canon EOS R6 • f/2.0 • 1/500s • ISO 320' },
    { id: 8, image: 'https://images.unsplash.com/photo-1698431411784-a93825012505?auto=format&fit=crop&w=800&q=80', title: 'Culinary Art', photographer: 'Rachel Kim', category: 'Food', likes: 143, comments: 16, exif: 'Nikon Z8 • f/4 • 1/60s • ISO 400' },
    { id: 9, image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80', title: 'Forest Whispers', photographer: 'Tom Harris', category: 'Landscape', likes: 201, comments: 27, exif: 'Sony A7IV • f/5.6 • 1/125s • ISO 200' },
    { id: 10, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80', title: 'Starry Peaks', photographer: 'Nina Patel', category: 'Landscape', likes: 378, comments: 52, exif: 'Nikon Z6II • f/2.8 • 25s • ISO 3200' },
    { id: 11, image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', title: 'Golden Reflections', photographer: 'Carlos Vega', category: 'Landscape', likes: 195, comments: 23, exif: 'Canon R5 • f/8 • 1/30s • ISO 100' },
    { id: 12, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', title: 'Alpine Glory', photographer: 'Lena Berg', category: 'Landscape', likes: 289, comments: 41, exif: 'Sony A1 • f/11 • 1/250s • ISO 100' },
];

export default function GalleryContent() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

    const filteredPhotos = activeCategory === 'All'
        ? galleryPhotos
        : galleryPhotos.filter((p) => p.category === activeCategory);

    const toggleLike = (id: number) => {
        const newLikes = new Set(likedPhotos);
        if (newLikes.has(id)) newLikes.delete(id);
        else newLikes.add(id);
        setLikedPhotos(newLikes);
    };

    return (
        <div className="pt-28 pb-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-serif italic text-white mb-4">Community Gallery</h1>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        Explore stunning work from our community. Like, comment, and discover the camera settings behind every shot.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${activeCategory === cat
                                    ? 'bg-white text-black font-semibold'
                                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {filteredPhotos.map((photo) => (
                        <div key={photo.id} className="break-inside-avoid group">
                            <div className="relative overflow-hidden rounded-2xl bg-white/5">
                                <AppImage
                                    src={photo.image}
                                    alt={photo.title}
                                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-x-0 bottom-0 p-6">
                                        <h3 className="text-xl font-serif text-white mb-1">{photo.title}</h3>
                                        <p className="text-sm text-white/70 mb-2">by {photo.photographer}</p>
                                        <p className="text-xs font-mono text-white/50 mb-4">{photo.exif}</p>

                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => toggleLike(photo.id)}
                                                className="flex items-center gap-1.5 text-sm"
                                            >
                                                <Icon
                                                    name="HeartIcon"
                                                    size={18}
                                                    variant={likedPhotos.has(photo.id) ? 'solid' : 'outline'}
                                                    className={likedPhotos.has(photo.id) ? 'text-red-500' : 'text-white/70'}
                                                />
                                                <span className="text-white/70">{photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)}</span>
                                            </button>
                                            <button className="flex items-center gap-1.5 text-sm text-white/70">
                                                <Icon name="ChatBubbleLeftIcon" size={18} variant="outline" />
                                                <span>{photo.comments}</span>
                                            </button>
                                            <button className="flex items-center gap-1.5 text-sm text-white/70 ml-auto">
                                                <Icon name="ShareIcon" size={18} variant="outline" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
