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
        navy: "#152935",
        brandBlue: "#698ea2",
        brandOrange: "#e4a576",
        brandGray: "#ccd5d2",
        brandPeach: "#fde5d6",
      },
    },
  },
  plugins: [],
};
export default config;
