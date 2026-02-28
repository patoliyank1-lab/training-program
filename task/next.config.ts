import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pixabay.com',
        pathname: '**',
      },
    ],
  },
  experimental: {
    // Ensures dependencies stay in modern ESM format
    esmExternals: true, 
  },
}
export default nextConfig;
