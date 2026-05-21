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
  async headers() {
    return [
      {
        source: '/.well-known/traffic-advice',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/trafficadvice+json',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
