'use client';

import { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
      gsap.from('.swiper-cards', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
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

        {/* Swiper Stacking Cards Carousel */}
        <div className="relative w-full flex justify-center items-center py-12 select-none overflow-visible">
          {/* Custom styles for Swiper card stacking visual adjustments */}
          <style dangerouslySetInnerHTML={{ __html: `
            .swiper-cards {
              overflow: visible !important;
            }
            .swiper-slide {
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 1.5rem;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
              transition: transform 0.4s ease, filter 0.4s ease;
            }
            .swiper-slide-shadow {
              border-radius: 1.5rem;
            }
            /* Blur and dim stacked/inactive cards to create professional visual depth */
            .swiper-slide:not(.swiper-slide-active) {
              filter: blur(1.5px) brightness(0.65);
            }
            .swiper-pagination-bullet {
              background: var(--foreground, #000) !important;
              opacity: 0.25;
              transition: all 0.3s ease;
            }
            .swiper-pagination-bullet-active {
              opacity: 0.9 !important;
              background: var(--foreground, #000) !important;
              width: 1.5rem !important;
              border-radius: 4px !important;
            }
            .swiper-pagination-bullets.swiper-pagination-horizontal {
              bottom: -40px !important;
            }
          `}} />

          {/* Cards Carousel Stack Wrapper */}
          <div className="relative w-[280px] h-[350px] md:w-[360px] md:h-[450px]">
            <Swiper
              effect="cards"
              grabCursor={true}
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: false,
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              className="swiper-cards w-full h-full"
              modules={[EffectCards, Autoplay, Pagination, Navigation]}
            >
              {[...projects, ...moreProjects].map((project, index) => (
                <SwiperSlide key={`${project.id}-${index}`} className="rounded-3xl bg-black">
                  <div className="w-full h-full relative group overflow-hidden rounded-3xl cursor-pointer">
                    {/* High quality image rendering */}
                    <AppImage
                      src={project.image}
                      alt={project.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Dark gradient vignette overlay for content readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

                    {/* Elegant category overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end text-white text-center">
                      <h3 className="text-2xl md:text-3xl font-serif uppercase tracking-widest text-white/95 drop-shadow-md">
                        {project.category}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Premium Desktop Navigation Arrows */}
            <button className="swiper-button-prev-custom hidden md:flex absolute top-1/2 -translate-y-1/2 -left-20 z-20 items-center justify-center w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 text-foreground hover:bg-white/[0.08] hover:border-white/20 active:scale-95 transition-all duration-300 cursor-pointer">
              <Icon name="ArrowLeftIcon" size={20} variant="outline" />
            </button>
            <button className="swiper-button-next-custom hidden md:flex absolute top-1/2 -translate-y-1/2 -right-20 z-20 items-center justify-center w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 text-foreground hover:bg-white/[0.08] hover:border-white/20 active:scale-95 transition-all duration-300 cursor-pointer">
              <Icon name="ArrowRightIcon" size={20} variant="outline" />
            </button>
          </div>
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