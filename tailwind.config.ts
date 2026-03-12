import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#111318",
          surface: "#22293A",
        },
        accent: {
          cyan: "#7C3AED",   // violet is now primary
          green: "#00E676",
          amber: "#FB923C",  // warm orange is secondary
        },
        text: {
          primary: "#F1F5F9",
          secondary: "#94A3B8",
          muted: "#4B5563",
        },
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
