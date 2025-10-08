import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["opacity-0", "opacity-100", "z-0", "z-10", "pointer-events-none"],
  theme: {
    extend: {
      fontFamily: {
        alexandria: ["Alexandria", "sans-serif"],
        impact: ['"Anton"', "sans-serif"],
      },
      aspectRatio: {
        '4/3': "4 / 3",
      },
      colors: {
        terracotta: "#8D2D17",
        darkCoral: "#DA5D31",
        tangerine: "#ED7916",
        lilac: "#694896",
        lightLilac: "#CEBFDE",
        greyPearl: "#EEEDEF",
        softWhite: "#F0F0F0",
      },
      fontSize: {
        base: "18px",
        sm: "20px",
        md: "24px",
        lg: "26px",
        xl: "28px",
        "2xl": "30px",
        "3xl": "32px",
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
