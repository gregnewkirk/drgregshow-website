import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only these local assets use next/image. Reject query variants to bound cache growth.
    localPatterns: [
      "/images/headshot-portrait.jpg",
      "/images/avatar-support.jpg",
      "/images/merch-mava.jpg",
      "/images/games/simecon.png",
      "/images/games/simecon-san-diego.png",
      "/images/games/the-gap.png",
      "/images/games/class-wargame.png",
      "/research-portrait.jpg",
      "/research-lab-banner.jpg",
      "/research-headshot-basf.jpg",
    ].map((pathname) => ({ pathname, search: "" })),
  },
  outputFileTracingIncludes: {
    "/api/search": ["./data/search-index.json.gz"],
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
