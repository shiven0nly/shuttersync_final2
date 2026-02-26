# ShutterSync Blog Feature

## Overview
A professional photography blog section inspired by ShutterSpace, featuring curated content from reputable photography sources with proper attribution.

## Features

### Blog Listing Page (`/blog`)
- **Hero Section**: Eye-catching header with SEO-optimized buzzwords
- **Category Filtering**: Filter posts by composition, lighting, gear, editing, portrait, landscape
- **View Modes**: Toggle between grid and list layouts
- **Blog Cards**: Each card displays:
  - Featured image with category badge
  - View count indicator
  - Author information with avatar
  - Read time estimate
  - Excerpt preview
  - Source attribution with external link
  - "Read More" call-to-action

### Individual Blog Posts (`/blog/[id]`)
- **Full Article View**: Complete blog post with hero image
- **Author Bio**: Detailed author information and credentials
- **Structured Content**: Introduction and multiple sections
- **Source Attribution**: Clear credit to original content sources
- **Navigation**: Back button and "More Articles" CTA
- **Meta Information**: Published date, read time, view count

### Content Sources
All blog content is curated from reputable photography websites with proper attribution:
- Medium (Photography)
- 121 Clicks
- PetaPixel
- Fstoppers
- Digital Photography School
- Lonely Speck
- Photography Life
- The Phoblographer

Each blog post includes clear source attribution with external links to the original content.

## SEO Optimization

### Keywords Targeted
- Photography blog
- Photography tips
- Camera tutorials
- Composition guide
- Lighting techniques
- Photo editing
- Photography gear reviews
- Creative photography
- Professional photography insights

### Structured Data
- Blog schema added to site-wide JSON-LD
- Article metadata for individual posts
- OpenGraph and Twitter Card support

## Accessibility Features

Following `.agents/skills/fixing-accessibility/SKILL.md`:
- ✅ All interactive elements have accessible names
- ✅ Icon-only buttons include `aria-label`
- ✅ Filter buttons use `aria-pressed` for state
- ✅ View mode toggle uses proper `role="group"`
- ✅ Keyboard navigation fully supported
- ✅ Focus states visible
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Image alt text provided
- ✅ External links use `rel="noopener noreferrer"`

## UI/UX Guidelines

Following `.agents/skills/baseline-ui/SKILL.md`:
- ✅ Tailwind CSS defaults used throughout
- ✅ `text-balance` for headings, `text-pretty` for body text
- ✅ `line-clamp-2` for excerpt truncation
- ✅ No custom gradients or glow effects
- ✅ Consistent color tokens from theme
- ✅ Proper loading states with skeletons
- ✅ `h-dvh` instead of `h-screen`
- ✅ No animation unless explicitly needed
- ✅ Responsive design with mobile-first approach

## Navigation

Blog link added to main header navigation between "Gallery" and "Challenge" for optimal user flow.

## File Structure

```
app/blog/
├── page.tsx                    # Main blog listing page
├── BlogContent.tsx             # Blog listing component
├── loading.tsx                 # Loading skeleton
└── [id]/
    ├── page.tsx                # Individual blog post page
    ├── BlogPostContent.tsx     # Blog post component
    └── loading.tsx             # Post loading skeleton
```

## Current Blog Posts

1. **Mastering the Golden Ratio in Landscape Photography** (Composition) - Medium
2. **The Art of Natural Light: Window Light Portraits** (Lighting) - 121 Clicks
3. **Essential Gear for Street Photography in 2026** (Gear) - PetaPixel
4. **Color Grading Secrets: From Flat to Cinematic** (Editing) - Fstoppers
5. **Capturing Emotion: The Psychology of Portrait Photography** (Portrait) - Digital Photography School
6. **Milky Way Photography: Complete Beginner's Guide** (Landscape) - Lonely Speck
7. **Understanding Exposure Triangle: ISO, Aperture & Shutter Speed** (Gear) - Photography Life
8. **Black and White Photography: Seeing in Monochrome** (Editing) - The Phoblographer
9. **Food Photography Lighting: Natural vs Artificial** (Lighting) - Digital Photography School

## Future Enhancements

- Connect to a CMS for dynamic content management
- Add search functionality
- Implement pagination or infinite scroll
- Add social sharing buttons
- Enable comments section
- Create RSS feed
- Add related posts section
- Implement bookmarking feature
