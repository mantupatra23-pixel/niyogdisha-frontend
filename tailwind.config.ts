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
          text: "#152935",
          muted: "#5F6B72",
          border: "#E5E9E7",
        },
      },
    },
  },
  plugins: [],
};
export default config;
