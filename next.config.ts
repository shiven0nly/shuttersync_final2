import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    unoptimized: true, // Required for Netlify
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['gsap', 'lucide-react', '@heroicons/react'],
  },
};

export default nextConfig;
