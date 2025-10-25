import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Export the app as static HTML (next export)
  output: "export",
  // basePath: isProd ? '/hpv-chat-assistant' : '',
  // assetPrefix: isProd ? '/hpv-chat-assistant/' : '',
  images: {
    unoptimized: true, // GitHub Pages does not support Next.js image optimization by default
  },
};

export default nextConfig;
