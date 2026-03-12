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
          DEFAULT: "#080D12",
          surface: "#0F1F30",
        },
        accent: {
          cyan: "#00FF88",   // bioluminescent green is now primary
          green: "#00FF88",
          amber: "#38BDF8",  // sky blue is secondary
        },
        text: {
          primary: "#E0FFF3",
          secondary: "#4B6280",
          muted: "#2D4056",
        },
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["IBM Plex Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
