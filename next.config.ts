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
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "donate.drgregshow.com",
          },
        ],
        destination: "https://buy.stripe.com/7sYeVd0CWcwp0Vb4Hu6Ri01",
        permanent: false,
      },
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
