import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
 
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
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



 
module.exports = withBundleAnalyzer(nextConfig)
