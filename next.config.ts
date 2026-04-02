import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/reel",
        destination: "https://youtu.be/KMZWRu7mBEs",
        permanent: false,
      },
      {
        source: "/book",
        destination: "/booking",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
