import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // next.config.js
images: {
  dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/w500/**', // Allow images from the /t/p/w500 path
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Also allow our fallback placeholder domain
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "dims.apnews.com", 
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**', // The double asterisk is the wildcard
      },
      {
        protocol: 'http', // Also allow http for some older news sites
        hostname: '**',
      }
    ],
  }

};

export default nextConfig;
