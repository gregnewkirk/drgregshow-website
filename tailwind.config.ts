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
          DEFAULT: "#F7F5F2",
          surface: "#EDEAE5",
        },
        accent: {
          cyan: "#1847CC",   // cobalt blue — primary
          green: "#00E676",
          amber: "#C97A0A",  // warm amber — secondary
        },
        text: {
          primary: "#18160F",
          secondary: "#5A5650",
          muted: "#9A9690",
        },
      },
      fontFamily: {
        heading: ["DM Serif Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
