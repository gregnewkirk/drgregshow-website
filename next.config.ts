import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/reel",
        destination: "https://youtu.be/KMZWRu7mBEs",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
