'use client';

import { useState } from 'react';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

const categories = ['All', 'Street', 'Landscape', 'Portrait', 'Architecture', 'Wildlife', 'Abstract', 'Night', 'Food', 'Nature'];

const galleryPhotos = [
    { id: 1, image: '/street.jpeg', title: 'Urban Pulse', photographer: 'Sarah Chen', category: 'Street', likes: 128, comments: 14, exif: 'Canon EOS R5 • f/2.8 • 1/250s • ISO 400' },
    { id: 2, image: '/scenery1.jpeg', title: 'Mountain Majesty', photographer: 'Alex Rivera', category: 'Landscape', likes: 245, comments: 32, exif: 'Sony A7III • f/11 • 1/60s • ISO 100' },
    { id: 3, image: '/girl_in_pool.jpeg', title: 'Silent Strength', photographer: 'Marcus Johnson', category: 'Portrait', likes: 189, comments: 21, exif: 'Nikon Z6 • f/1.8 • 1/125s • ISO 200' },
    { id: 4, image: '/building_with_staircase.jpeg', title: 'Geometric Dreams', photographer: 'Emma Watson', category: 'Architecture', likes: 156, comments: 18, exif: 'Fuji X-T5 • f/8 • 1/200s • ISO 160' },
    { id: 5, image: '/sparrow.jpeg', title: 'Wings of Freedom', photographer: 'David Park', category: 'Wildlife', likes: 312, comments: 45, exif: 'Canon R7 • f/5.6 • 1/2000s • ISO 800' },
    { id: 6, image: '/lightPhotography1.jpeg', title: 'Light Dance', photographer: 'Sofia Martinez', category: 'Abstract', likes: 98, comments: 8, exif: 'Sony A7RV • f/16 • 30s • ISO 100' },
    { id: 7, image: '/night1.jpeg', title: 'Midnight Dreams', photographer: 'James Lee', category: 'Night', likes: 267, comments: 38, exif: 'Canon EOS R6 • f/2.0 • 1/500s • ISO 320' },
    { id: 8, image: '/food.jpeg', title: 'Culinary Art', photographer: 'Rachel Kim', category: 'Food', likes: 143, comments: 16, exif: 'Nikon Z8 • f/4 • 1/60s • ISO 400' },
    { id: 9, image: '/cloud1.jpeg', title: 'Cloud Whispers', photographer: 'Tom Harris', category: 'Nature', likes: 201, comments: 27, exif: 'Sony A7IV • f/5.6 • 1/125s • ISO 200' },
    { id: 10, image: '/nightsky1.jpeg', title: 'Starry Peaks', photographer: 'Nina Patel', category: 'Night', likes: 378, comments: 52, exif: 'Nikon Z6II • f/2.8 • 25s • ISO 3200' },
    { id: 11, image: '/sunset.jpeg', title: 'Golden Reflections', photographer: 'Carlos Vega', category: 'Landscape', likes: 195, comments: 23, exif: 'Canon R5 • f/8 • 1/30s • ISO 100' },
    { id: 12, image: '/scenery2.jpeg', title: 'Alpine Glory', photographer: 'Lena Berg', category: 'Landscape', likes: 289, comments: 41, exif: 'Sony A1 • f/11 • 1/250s • ISO 100' },
    { id: 13, image: '/building_bnw.jpeg', title: 'Monochrome Lines', photographer: 'David Chen', category: 'Architecture', likes: 167, comments: 19, exif: 'Leica Q2 • f/5.6 • 1/320s • ISO 100' },
    { id: 14, image: '/building_minimal.jpeg', title: 'Minimal Structure', photographer: 'Anna Kim', category: 'Architecture', likes: 134, comments: 15, exif: 'Sony A7III • f/8 • 1/200s • ISO 160' },
    { id: 15, image: '/swan.jpeg', title: 'Graceful Swan', photographer: 'Michael Park', category: 'Wildlife', likes: 223, comments: 28, exif: 'Canon R5 • f/4 • 1/800s • ISO 400' },
    { id: 16, image: '/lightphotography2.jpeg', title: 'Light Trails', photographer: 'Emma Lee', category: 'Abstract', likes: 156, comments: 12, exif: 'Nikon Z6 • f/22 • 20s • ISO 100' },
    { id: 17, image: '/moon.jpeg', title: 'Lunar Beauty', photographer: 'Chris Wang', category: 'Nature', likes: 298, comments: 35, exif: 'Canon R7 • f/8 • 1/125s • ISO 800' },
    { id: 18, image: '/cloud_aeroplane.jpeg', title: 'Sky Journey', photographer: 'Lisa Martinez', category: 'Nature', likes: 178, comments: 22, exif: 'Sony A7IV • f/11 • 1/500s • ISO 200' },
    { id: 19, image: '/sunset_building.jpeg', title: 'Urban Sunset', photographer: 'Robert Kim', category: 'Architecture', likes: 245, comments: 31, exif: 'Fuji X-T4 • f/8 • 1/250s • ISO 200' },
    { id: 20, image: '/macau.jpeg', title: 'Macau Nights', photographer: 'Jenny Liu', category: 'Wildlife', likes: 312, comments: 42, exif: 'Canon EOS R6 • f/2.8 • 1/60s • ISO 1600' },
    { id: 21, image: '/flower1.jpeg', title: 'Floral Elegance', photographer: 'Sarah Green', category: 'Nature', likes: 189, comments: 24, exif: 'Nikon Z7 • f/2.8 • 1/200s • ISO 100' },
    { id: 22, image: '/flower2.jpeg', title: 'Petal Dreams', photographer: 'Mark Johnson', category: 'Nature', likes: 167, comments: 18, exif: 'Sony A7RIV • f/4 • 1/160s • ISO 100' },
    { id: 23, image: '/low-key1.jpeg', title: 'Shadow Play', photographer: 'Alex Rivera', category: 'Portrait', likes: 234, comments: 29, exif: 'Canon R5 • f/1.4 • 1/100s • ISO 400' },
    { id: 24, image: '/nigh2.jpeg', title: 'Night Vibes', photographer: 'Nina Patel', category: 'Night', likes: 201, comments: 26, exif: 'Nikon Z6II • f/2.0 • 1/30s • ISO 3200' },
    { id: 25, image: '/moon2.jpeg', title: 'Moonlit Night', photographer: 'Tom Harris', category: 'Nature', likes: 276, comments: 33, exif: 'Canon R7 • f/11 • 1/100s • ISO 1600' },
    { id: 26, image: '/cloud2.jpeg', title: 'Cloud Formation', photographer: 'Emma Watson', category: 'Nature', likes: 145, comments: 17, exif: 'Sony A7III • f/8 • 1/320s • ISO 100' },
    { id: 27, image: '/building_simitary.jpeg', title: 'Architectural Symmetry', photographer: 'Carlos Vega', category: 'Architecture', likes: 198, comments: 23, exif: 'Fuji X-T5 • f/11 • 1/160s • ISO 200' },
    { id: 28, image: '/camel_scrupture.jpeg', title: 'Desert Art', photographer: 'Lena Berg', category: 'Street', likes: 167, comments: 20, exif: 'Canon EOS R • f/5.6 • 1/250s • ISO 200' },
    { id: 29, image: '/abstract1.jpeg', title: 'Abstract Vision', photographer: 'Sofia Martinez', category: 'Abstract', likes: 212, comments: 25, exif: 'Sony A7RV • f/8 • 1/200s • ISO 100' },
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
                    <h1 className="text-5xl md:text-7xl font-serif italic text-white mb-4 text-balance">Community Gallery</h1>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto text-pretty">
                        Explore stunning work of our members. Thanks To All Members.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors ${activeCategory === cat
                                    ? 'bg-white text-black font-semibold'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                            aria-pressed={activeCategory === cat}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {filteredPhotos.map((photo) => (
                        <div key={photo.id} className="break-inside-avoid group">
                            <div className="relative overflow-hidden rounded-2xl">
                                <Image
                                    src={photo.image}
                                    alt={photo.title}
                                    width={800}
                                    height={800}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-x-0 bottom-0 p-6">
                                        <h3 className="text-2xl font-serif text-white">{photo.category}</h3>
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
