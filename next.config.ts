import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, 
  },
  

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  

  experimental: {
    optimizePackageImports: ['gsap', 'lucide-react', '@heroicons/react'],
  },
};

export default nextConfig;
