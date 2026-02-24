'use client';

import { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectCardProps {
  image: string;
  alt: string;
  title: string;
  photographer: string;
  category: string;
  exif?: string;
}

function ProjectCard({ image, alt, title, photographer, category, exif }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/5] relative">
        <AppImage
          src={image}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark overlay on hover for readability */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <h3 className="text-3xl font-serif text-white">{category}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MembersWorkSection() {
  const [isHydrated, setIsHydrated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsHydrated(true); }, []);

  useEffect(() => {
    if (!isHydrated || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isHydrated]);

  const projects = [
    { id: 'project_urban', image: '/street.jpeg', alt: 'Urban street scene', title: 'Urban Pulse', photographer: 'Sarah Chen', category: 'Street', exif: 'f/2.8 • 1/250s' },
    { id: 'project_nature', image: '/scenery1.jpeg', alt: 'Mountain landscape', title: 'Mountain Majesty', photographer: 'Alex Rivera', category: 'Landscape', exif: 'f/11 • 1/60s' },
    { id: 'project_portrait', image: '/girl_in_pool.jpeg', alt: 'Portrait photography', title: 'Silent Strength', photographer: 'Marcus Johnson', category: 'Portrait', exif: 'f/1.8 • 1/125s' },
  ];

  const moreProjects = [
    { id: 'project_architecture', image: '/building_with_staircase.jpeg', alt: 'Modern architecture', title: 'Geometric Dreams', photographer: 'Emma Watson', category: 'Architecture', exif: 'f/8 • 1/200s' },
    { id: 'project_wildlife', image: '/sparrow.jpeg', alt: 'Sparrow bird', title: 'Wings of Freedom', photographer: 'David Park', category: 'Wildlife', exif: 'f/5.6 • 1/2000s' },
    { id: 'project_abstract', image: '/lightphotography2.jpeg', alt: 'Abstract light painting', title: 'Light Dance', photographer: 'Sofia Martinez', category: 'Abstract', exif: 'f/16 • 30s' },
    { id: 'project_night', image: '/night1.jpeg', alt: 'Night photography', title: 'Midnight Dreams', photographer: 'James Lee', category: 'Night', exif: 'f/2.0 • 1/500s' },
    { id: 'project_food', image: '/food.jpeg', alt: 'Food photography', title: 'Culinary Art', photographer: 'Rachel Kim', category: 'Food', exif: 'f/4 • 1/60s' },
  ];

  return (
    <section id="work" ref={sectionRef} className="relative py-32 px-6 lg:px-8 bg-background border-t border-black/[0.06] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-foreground/20" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/40">Featured</span>
            <div className="w-8 h-[1px] bg-foreground/20" />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif italic text-foreground mb-6 text-balance">
            Featured Clicks
          </h2>
          <p className="text-lg text-foreground/50 max-w-2xl mx-auto text-pretty">
            A curated collection showcasing the diverse talent and unique perspectives of our photography community.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {projects.map((project, index) => (
            <div key={project.id} className="project-card break-inside-avoid">
              <ProjectCard {...project} />
            </div>
          ))}
          {moreProjects.map((project) => (
            <div key={project.id} className="project-card break-inside-avoid">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-16">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 soft-card px-8 py-4 text-sm uppercase tracking-wider text-foreground hover:bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-foreground/50 rounded-lg transition-colors"
          >
            <span>View Full Gallery</span>
            <Icon name="ArrowRightIcon" size={16} variant="outline" />
          </Link>
        </div>
      </div>
    </section>
  );
}