import withMT from "@material-tailwind/react/utils/withMT.js";

/** @type {import('tailwindcss').Config} */

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        custom: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Black shadow effect
      },
      colors: {
        primary: {
          light: "#D3B9A7",
          DEFAULT: "#6F4E37",
          dark: "#3E2723",
          ligter:"#ede3db "
        },
        secondary: {
          light: "#E7C6A0",
          DEFAULT: "#B08160",
          dark: "#8C5A45",
        },
        danger: {
          light: "#FCA5A5",
          DEFAULT: "#DC2626",
          dark: "#991B1B",
        },
        success: {
          light: "#86EFAC",
          DEFAULT: "#22C55E",
          dark: "#166534",
        },
        warning: {
          light: "#FDE047",
          DEFAULT: "#EAB308",
          dark: "#92400E",
        },
        dark: {
          light: "#1F2937",
          DEFAULT: "#111827",
          deep: "#0A0F1A",
        },
      },
    
    },
  },
  plugins: [  function ({ addUtilities }) {
    addUtilities({
      '.text-shadow': {
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
      },
      '.text-shadow-md': {
        textShadow: '2px 2px 10px rgba(0, 0, 0, 0.4)',
      },
      '.text-shadow-lg': {
        textShadow: '3px 3px 15px rgba(0, 0, 0, 0.5)',
      },
    });
  },],
});

