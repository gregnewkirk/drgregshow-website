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
          DEFAULT: "#111014",
          surface: "#1E1B24",
        },
        accent: {
          cyan: "#6366F1",   // indigo — professional, distinct, not neon
          green: "#00E676",
          amber: "#F97316",  // warm orange — human and energetic
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
          muted: "#4B5563",
        },
      },
      fontFamily: {
        heading: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
