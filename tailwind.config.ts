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
        brand: {
          navy: "#152935",
          blue: "#698EA2",
          orange: "#E4A576",
          gray: "#CCD5D2",
          peach: "#FDE5D6",
          border: "#CCD5D2",
        },
      },
    },
  },
  plugins: [],
};
export default config;
