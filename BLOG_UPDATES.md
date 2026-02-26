# Blog Section Updates

## Changes Made

### 1. Fixed Overlapping Tags Issue
- **Before**: Category badge was positioned on top-left of image, overlapping with author profile
- **After**: Category badge moved next to author info in the content area, preventing any overlap
- View count indicator remains in top-right corner of image

### 2. Replaced Author Photos with Initials
- **Before**: Used project photos as author avatars
- **After**: Author avatars now display initials in gradient circles
- Gradient: `from-orange-400 to-orange-600`
- Initials extracted from author names (e.g., "Sarah Mitchell" → "SM")
- Maintains visual consistency while being more professional

### 3. Replaced Local Images with Unsplash Photos
- **Before**: Used photos from public folder
- **After**: All blog post images now use relevant Unsplash photos
- Images are optimized with `w=800&q=80` for cards and `w=1200&q=80` for detail pages
- Each image is contextually relevant to the blog post topic

#### Image Sources:
1. **Golden Ratio Landscape**: Mountain landscape (Unsplash)
2. **Window Light Portraits**: Portrait by window (Unsplash)
3. **Street Photography Gear**: Vintage camera (Unsplash)
4. **Color Grading**: Colorful editing workspace (Unsplash)
5. **Portrait Psychology**: Emotional portrait (Unsplash)
6. **Milky Way**: Night sky with stars (Unsplash)
7. **Exposure Triangle**: Camera with settings (Unsplash)
8. **Black & White**: Monochrome architecture (Unsplash)
9. **Food Photography**: Delicious food styling (Unsplash)

### 4. Added 3 New Blog Posts

#### Post 7: Understanding Exposure Triangle
- **Author**: Robert Kim
- **Category**: Gear
- **Source**: Photography Life (https://photographylife.com)
- **Topics**: ISO, Aperture, Shutter Speed fundamentals
- **Read Time**: 9 min
- **Views**: 28k

#### Post 8: Black and White Photography
- **Author**: Alexandra Stone
- **Category**: Editing
- **Source**: The Phoblographer (https://thephoblographer.com)
- **Topics**: Monochrome visualization, contrast, tonal range
- **Read Time**: 11 min
- **Views**: 19k

#### Post 9: Food Photography Lighting
- **Author**: Michael Torres
- **Category**: Lighting
- **Source**: Digital Photography School (https://digital-photography-school.com)
- **Topics**: Natural vs artificial light for food photography
- **Read Time**: 8 min
- **Views**: 22k

## Updated Category Counts
- Latest: 9 posts
- Composition: 1 post
- Lighting: 2 posts (added food photography)
- Gear: 2 posts (added exposure triangle)
- Editing: 2 posts (added B&W photography)
- Portrait: 1 post
- Landscape: 1 post

## Source Attribution
All new posts include:
- Clear source attribution in card footer
- External link with proper `rel="noopener noreferrer"`
- Detailed source credit section in full article view
- Author bio and credentials

## Technical Implementation
- No breaking changes to existing code
- All TypeScript types updated
- Diagnostics: ✅ No errors
- Accessibility: ✅ Maintained
- SEO: ✅ Metadata updated for new posts
