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
          DEFAULT: "#0E0E0E",
          surface: "#1A1A1A",
        },
        accent: {
          cyan: "#E84545",   // red is now the primary accent (keeping variable name for compatibility)
          green: "#00E676",
          amber: "#F8C537",  // gold
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#8A8A8A",
          muted: "#555555",
        },
      },
      fontFamily: {
        heading: ["Barlow Condensed", "sans-serif"],
        body: ["Barlow", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
