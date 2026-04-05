import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/reel",
        destination: "https://youtu.be/KMZWRu7mBEs",
        permanent: false,
      },
      {
        source: "/booking",
        destination: "/book",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
