import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // Tắt Strict Mode
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Cho phép tất cả hostname
      },
      {
        protocol: 'http',
        hostname: '**', // Cho phép cả http
      },
    ],
  },
};

export default nextConfig;
