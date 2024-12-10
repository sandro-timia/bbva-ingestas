import type { Config } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A3977",
        secondary: "#00A3FF",
      },
      screens: {
        'sidebar-expanded': {'raw': '(min-width: calc(768px + 180px))'},
      },
    },
  },
  plugins: [],
};
export default config;
