'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: {
    name: string;
    bio: string;
  };
  image: string;
  source: {
    name: string;
    url: string;
  };
  publishedDate: string;
  views: string;
  content: {
    intro: string;
    sections: Array<{
      heading: string;
      content: string;
    }>;
  };
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

const blogPostsData: Record<string, BlogPostData> = {
  '1': {
    id: '1',
    title: 'Mastering the Golden Ratio in Landscape Photography',
    excerpt: 'Discover how the golden ratio transforms ordinary landscapes into captivating visual stories through mathematical composition.',
    category: 'Composition',
    readTime: '6 min read',
    author: {
      name: 'Sarah Mitchell',
      bio: 'Landscape photographer and composition expert with 15 years of experience capturing nature\'s beauty.',
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    source: {
      name: 'Medium',
      url: 'https://medium.com/tag/photography',
    },
    publishedDate: 'Feb 20, 2026',
    views: '12k',
    content: {
      intro: 'The golden ratio, approximately 1.618, has been used by artists and architects for centuries to create visually pleasing compositions. In landscape photography, this mathematical principle can transform ordinary scenes into captivating visual stories.',
      sections: [
        {
          heading: 'Understanding the Golden Ratio',
          content: 'The golden ratio appears throughout nature - in seashells, flower petals, and even galaxy spirals. When applied to photography, it creates a natural sense of balance and harmony that draws viewers into your images. Unlike the rule of thirds, which divides the frame into equal parts, the golden ratio uses a 1:1.618 proportion.',
        },
        {
          heading: 'Practical Application in Landscapes',
          content: 'Start by identifying your main subject - whether it\'s a mountain peak, a tree, or a winding river. Position this element along the golden spiral or at the intersection points of the golden grid. This placement creates a natural flow that guides the viewer\'s eye through the composition.',
        },
        {
          heading: 'Tools and Techniques',
          content: 'Most modern cameras offer golden ratio overlays in their viewfinders or LCD screens. Enable this feature during shooting, or use it in post-processing to refine your compositions. Remember, these are guidelines, not strict rules - sometimes breaking them creates more impact.',
        },
      ],
    },
  },
  '2': {
    id: '2',
    title: 'The Art of Natural Light: Window Light Portraits',
    excerpt: 'Learn professional techniques for creating stunning portraits using only window light and simple reflectors.',
    category: 'Lighting',
    readTime: '8 min read',
    author: {
      name: 'Marcus Chen',
      bio: 'Portrait photographer specializing in natural light techniques and authentic storytelling.',
    },
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=80',
    source: {
      name: '121 Clicks',
      url: 'https://121clicks.com',
    },
    publishedDate: 'Feb 18, 2026',
    views: '18k',
    content: {
      intro: 'Window light is one of the most beautiful and accessible light sources for portrait photography. With proper technique, you can create professional-quality portraits without expensive lighting equipment.',
      sections: [
        {
          heading: 'Choosing the Right Window',
          content: 'North-facing windows provide soft, consistent light throughout the day, making them ideal for portraits. Avoid direct sunlight, which creates harsh shadows. If you only have south-facing windows, shoot during golden hour or use sheer curtains to diffuse the light.',
        },
        {
          heading: 'Positioning Your Subject',
          content: 'Place your subject 2-4 feet from the window at a 45-degree angle. This creates beautiful directional light with gentle shadows that add dimension to the face. Experiment with different angles - turning the subject toward or away from the window dramatically changes the mood.',
        },
        {
          heading: 'Using Reflectors Effectively',
          content: 'A simple white foam board or reflector opposite the window fills in shadows and creates catchlights in the eyes. Position it close enough to bounce light but not so close that it creates an unnatural second light source. Silver reflectors add more contrast, while white creates softer fill.',
        },
      ],
    },
  },
  '3': {
    id: '3',
    title: 'Essential Gear for Street Photography in 2026',
    excerpt: 'A comprehensive guide to choosing the right camera, lenses, and accessories for capturing authentic street moments.',
    category: 'Gear',
    readTime: '10 min read',
    author: {
      name: 'David Park',
      bio: 'Street photographer and gear reviewer documenting urban life across five continents.',
    },
    image: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=1200&q=80',
    source: {
      name: 'PetaPixel',
      url: 'https://petapixel.com',
    },
    publishedDate: 'Feb 15, 2026',
    views: '24k',
    content: {
      intro: 'Street photography demands gear that\'s fast, discreet, and reliable. The right equipment fades into the background, letting you focus on capturing authentic moments as they unfold.',
      sections: [
        {
          heading: 'Camera Body Considerations',
          content: 'Compact mirrorless cameras have revolutionized street photography. Look for fast autofocus, good high-ISO performance, and a silent shutter mode. The best camera is the one you\'ll actually carry - prioritize portability over megapixels.',
        },
        {
          heading: 'Lens Selection',
          content: 'A 35mm or 50mm prime lens is the street photographer\'s workhorse. These focal lengths match human perspective and force you to engage with your environment. Fast apertures (f/1.4-f/2) enable shooting in low light and create beautiful subject separation.',
        },
        {
          heading: 'Essential Accessories',
          content: 'Keep it minimal: a comfortable camera strap, spare batteries, and a small microfiber cloth. Consider a wrist strap for quick access. Skip the camera bag - a simple crossbody bag or jacket pocket keeps you mobile and inconspicuous.',
        },
      ],
    },
  },
  '4': {
    id: '4',
    title: 'Color Grading Secrets: From Flat to Cinematic',
    excerpt: 'Transform your photos with professional color grading techniques used by top commercial photographers.',
    category: 'Editing',
    readTime: '12 min read',
    author: {
      name: 'Emma Rodriguez',
      bio: 'Commercial photographer and retoucher specializing in editorial and advertising work.',
    },
    image: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1200&q=80',
    source: {
      name: 'Fstoppers',
      url: 'https://fstoppers.com',
    },
    publishedDate: 'Feb 12, 2026',
    views: '31k',
    content: {
      intro: 'Color grading elevates photography from documentation to art. Professional color grading creates mood, directs attention, and establishes visual consistency across your portfolio.',
      sections: [
        {
          heading: 'Understanding Color Theory',
          content: 'Complementary colors create tension and energy, while analogous colors feel harmonious and calm. Study color wheels and analyze films and photographs you admire. Notice how warm highlights and cool shadows create depth and dimension.',
        },
        {
          heading: 'The Grading Workflow',
          content: 'Start with proper exposure and white balance. Use curves to establish contrast and tonal relationships. HSL sliders refine individual colors. Split toning adds sophistication - try warm highlights with cool shadows for a cinematic look. Always work non-destructively with adjustment layers.',
        },
        {
          heading: 'Creating Signature Looks',
          content: 'Develop a consistent style by creating and refining presets. Document your process - note which adjustments create specific moods. Consistency across a series is more important than perfection in individual images. Your color palette becomes part of your artistic voice.',
        },
      ],
    },
  },
  '5': {
    id: '5',
    title: 'Capturing Emotion: The Psychology of Portrait Photography',
    excerpt: 'Understanding human connection and emotion to create powerful, authentic portrait photographs.',
    category: 'Portrait',
    readTime: '7 min read',
    author: {
      name: 'James Anderson',
      bio: 'Portrait photographer and psychology enthusiast exploring the intersection of human emotion and visual storytelling.',
    },
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80',
    source: {
      name: 'Digital Photography School',
      url: 'https://digital-photography-school.com',
    },
    publishedDate: 'Feb 10, 2026',
    views: '15k',
    content: {
      intro: 'Great portrait photography transcends technical perfection. It captures the essence of a person - their vulnerability, strength, joy, or contemplation. Understanding human psychology is as important as understanding your camera.',
      sections: [
        {
          heading: 'Building Rapport',
          content: 'The first 10 minutes determine the success of your session. Start with conversation, not camera. Learn about your subject, share about yourself, and establish trust. People reveal their authentic selves when they feel safe and valued.',
        },
        {
          heading: 'Reading Body Language',
          content: 'Tension shows in shoulders, hands, and jaw. Guide your subject into comfortable positions rather than rigid poses. Genuine smiles engage the eyes, not just the mouth. Watch for micro-expressions that reveal true emotion.',
        },
        {
          heading: 'Creating Authentic Moments',
          content: 'Ask questions that evoke emotion. Have subjects think about loved ones, recall memories, or imagine future dreams. Shoot between poses when they relax. The most powerful portraits often happen in these unguarded moments.',
        },
      ],
    },
  },
  '6': {
    id: '6',
    title: 'Milky Way Photography: Complete Beginner\'s Guide',
    excerpt: 'Everything you need to know about planning, shooting, and processing stunning astrophotography images.',
    category: 'Landscape',
    readTime: '15 min read',
    author: {
      name: 'Lisa Wong',
      bio: 'Astrophotographer and night sky advocate capturing the cosmos from dark sky locations worldwide.',
    },
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80',
    source: {
      name: 'Lonely Speck',
      url: 'https://lonelyspeck.com',
    },
    publishedDate: 'Feb 8, 2026',
    views: '42k',
    content: {
      intro: 'Photographing the Milky Way connects us to the cosmos and reveals the universe\'s breathtaking beauty. With proper planning and technique, you can capture stunning astrophotography images that inspire wonder.',
      sections: [
        {
          heading: 'Planning Your Shoot',
          content: 'Use apps like PhotoPills or Stellarium to find when and where the Milky Way will be visible. Shoot during new moon phases for the darkest skies. Scout locations during daylight to find interesting foreground elements. Check weather forecasts for clear skies.',
        },
        {
          heading: 'Camera Settings',
          content: 'Use manual mode with the widest aperture your lens offers (f/1.4-f/2.8). Set ISO between 3200-6400 depending on your camera\'s noise performance. Calculate shutter speed using the 500 rule: 500 divided by your focal length. Focus manually on a bright star using live view at maximum magnification.',
        },
        {
          heading: 'Post-Processing Techniques',
          content: 'Shoot in RAW for maximum flexibility. Increase exposure and contrast to reveal the Milky Way\'s structure. Reduce highlights and increase shadows. Boost clarity and vibrance carefully. Use graduated filters to balance sky and foreground. Stack multiple exposures for cleaner results.',
        },
      ],
    },
  },
  '7': {
    id: '7',
    title: 'Understanding Exposure Triangle: ISO, Aperture & Shutter Speed',
    excerpt: 'Master the fundamental relationship between ISO, aperture, and shutter speed to take full control of your camera.',
    category: 'Gear',
    readTime: '9 min read',
    author: {
      name: 'Robert Kim',
      bio: 'Technical photography instructor and camera systems expert with a passion for teaching fundamentals.',
    },
    image: 'https://images.unsplash.com/photo-1606244864456-8bee63fce472?w=1200&q=80',
    source: {
      name: 'Photography Life',
      url: 'https://photographylife.com',
    },
    publishedDate: 'Feb 5, 2026',
    views: '28k',
    content: {
      intro: 'The exposure triangle is the foundation of photography. Understanding how ISO, aperture, and shutter speed work together gives you complete creative control over your images.',
      sections: [
        {
          heading: 'ISO: Sensor Sensitivity',
          content: 'ISO controls your camera sensor\'s sensitivity to light. Lower ISO values (100-400) produce cleaner images with less noise, ideal for bright conditions. Higher ISO (1600+) allows shooting in low light but introduces grain. Modern cameras handle high ISO remarkably well, but always use the lowest ISO that gives you the shutter speed you need.',
        },
        {
          heading: 'Aperture: Depth of Field Control',
          content: 'Aperture, measured in f-stops, controls how much light enters through the lens and affects depth of field. Wide apertures (f/1.4-f/2.8) create beautiful background blur and work well in low light. Narrow apertures (f/8-f/16) keep more of the scene in focus, perfect for landscapes. Each stop change doubles or halves the light.',
        },
        {
          heading: 'Shutter Speed: Motion Control',
          content: 'Shutter speed determines how long the sensor is exposed to light and controls motion blur. Fast speeds (1/500s+) freeze action, while slow speeds (1/30s or slower) create motion blur. The reciprocal rule suggests using a shutter speed at least as fast as your focal length to avoid camera shake. Balance all three elements to achieve proper exposure while maintaining your creative vision.',
        },
      ],
    },
  },
  '8': {
    id: '8',
    title: 'Black and White Photography: Seeing in Monochrome',
    excerpt: 'Learn to visualize scenes in black and white and create powerful monochrome images that stand the test of time.',
    category: 'Editing',
    readTime: '11 min read',
    author: {
      name: 'Alexandra Stone',
      bio: 'Fine art photographer specializing in monochrome imagery and darkroom techniques.',
    },
    image: 'https://media.istockphoto.com/id/628648170/photo/close-up-of-man-praying.jpg?s=612x612&w=0&k=20&c=QBbfCXDWWABi82VPkSWQjSaaiG6PUzMTiwCcpsx9xaM=',
    source: {
      name: 'The Phoblographer',
      url: 'https://thephoblographer.com',
    },
    publishedDate: 'Feb 3, 2026',
    views: '19k',
    content: {
      intro: 'Black and white photography strips away color distractions, revealing the essence of form, texture, contrast, and emotion. Learning to see in monochrome transforms your photographic vision.',
      sections: [
        {
          heading: 'Training Your Eye',
          content: 'Start by enabling your camera\'s monochrome preview mode while shooting in RAW. This lets you visualize in black and white while preserving color data for post-processing. Look for strong contrast, interesting textures, dramatic lighting, and compelling shapes. Colors that appear different may look identical in monochrome - learn which colors convert to similar tones.',
        },
        {
          heading: 'Contrast and Tonal Range',
          content: 'Great black and white images use the full tonal range from pure black to bright white. Contrast creates drama and directs attention. High contrast works for graphic, bold images. Low contrast creates mood and subtlety. The histogram is your friend - ensure you have detail in both shadows and highlights unless you\'re deliberately creating silhouettes or high-key images.',
        },
        {
          heading: 'Post-Processing Techniques',
          content: 'Never use simple desaturation - it produces flat, lifeless images. Use channel mixer or HSL adjustments to control how different colors convert to grayscale. Dodge and burn to refine local contrast and guide the viewer\'s eye. Add subtle grain for a film-like quality. Study the masters like Ansel Adams and Henri Cartier-Bresson to understand timeless monochrome composition.',
        },
      ],
    },
  },
  '9': {
    id: '9',
    title: 'Food Photography Lighting: Natural vs Artificial',
    excerpt: 'Discover the best lighting techniques for mouth-watering food photography that makes viewers hungry.',
    category: 'Lighting',
    readTime: '8 min read',
    author: {
      name: 'Michael Torres',
      bio: 'Commercial food photographer working with restaurants and culinary brands worldwide.',
    },
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
    source: {
      name: 'Digital Photography School',
      url: 'https://digital-photography-school.com',
    },
    publishedDate: 'Feb 1, 2026',
    views: '22k',
    content: {
      intro: 'Lighting makes or breaks food photography. The right light reveals texture, creates appetite appeal, and tells a story. Understanding both natural and artificial lighting gives you flexibility for any situation.',
      sections: [
        {
          heading: 'Natural Light Advantages',
          content: 'Window light is the food photographer\'s best friend. It\'s soft, flattering, and free. Position your setup near a large window with indirect light - north-facing windows provide consistent illumination throughout the day. Side lighting at 45-90 degrees creates dimension and reveals texture. Use white foam boards or reflectors to fill shadows and add catchlights to liquids.',
        },
        {
          heading: 'Artificial Light Control',
          content: 'Continuous LED lights or strobes give you complete control regardless of time or weather. Softboxes and diffusers create the soft, directional quality of window light. Key light from the side or back creates drama and highlights steam or texture. Fill light prevents shadows from going too dark. Color temperature matters - warm light (3000-4000K) makes food look more appetizing than cool light.',
        },
        {
          heading: 'Styling and Composition',
          content: 'Light direction affects how viewers perceive freshness and texture. Backlighting makes liquids glow and creates rim light on food edges. Side lighting emphasizes texture in bread, meat, and vegetables. Overhead lighting works for flat lays but can look flat on dimensional subjects. Shoot slightly underexposed and brighten in post - overexposed highlights on food look unappetizing. Fresh ingredients, careful styling, and thoughtful lighting combine to create images that make viewers taste with their eyes.',
        },
      ],
    },
  },
};

export default function BlogPostContent({ postId }: { postId: string }) {
  const router = useRouter();
  const post = blogPostsData[postId];

  if (!post) {
    return null;
  }

  return (
    <article className="pt-32 pb-20">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Go back to blog"
        >
          <Icon name="ArrowLeftIcon" size={16} variant="outline" />
          Back to Blog
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[60vh] mb-12">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-orange-500 text-white text-xs font-semibold uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-balance mb-6">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-black/10">
          <div className="flex items-center gap-3">
            <div className="relative size-12 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg font-bold">
                {getInitials(post.author.name)}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{post.author.name}</p>
              <p className="text-xs text-foreground/60">{post.author.bio}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-foreground/60">
            <span className="flex items-center gap-1">
              <Icon name="CalendarIcon" size={16} variant="outline" />
              {post.publishedDate}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="ClockIcon" size={16} variant="outline" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="EyeIcon" size={16} variant="outline" />
              {post.views} views
            </span>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-foreground/80 text-pretty leading-relaxed mb-8">
            {post.content.intro}
          </p>

          {post.content.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-serif font-bold mb-4">{section.heading}</h2>
              <p className="text-foreground/70 text-pretty leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Source Attribution */}
        <div className="mt-12 p-6 rounded-2xl bg-black/5 border border-black/10">
          <p className="text-sm text-foreground/60 mb-2">Content curated from:</p>
          <a
            href={post.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-foreground font-semibold hover:text-orange-500 transition-colors"
          >
            {post.source.name}
            <Icon name="ArrowTopRightOnSquareIcon" size={16} variant="outline" />
          </a>
          <p className="text-xs text-foreground/50 mt-2">
            This article is inspired by content from {post.source.name}. Visit the source for more photography insights.
          </p>
        </div>

        {/* Share & Actions */}
        <div className="mt-12 pt-8 border-t border-black/10 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold text-sm uppercase tracking-wider hover:bg-foreground/90 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/50"
          >
            <Icon name="ArrowLeftIcon" size={16} variant="outline" />
            More Articles
          </Link>
        </div>
      </div>
    </article>
  );
}
