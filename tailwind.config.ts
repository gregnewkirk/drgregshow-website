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
          DEFAULT: "#1C1714",
          surface: "#2A2320",
        },
        accent: {
          cyan: "#8C1C13",   // deep blood red — primary accent
          green: "#00E676",
          amber: "#C8922A",  // dark cognac/bronze — secondary
        },
        text: {
          primary: "#F5EDE0",   // aged parchment cream
          secondary: "#9A9080",
          muted: "#4A4540",
        },
      },
      fontFamily: {
        heading: ["IBM Plex Sans", "sans-serif"],
  body: ["IBM Plex Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
