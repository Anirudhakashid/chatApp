/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        layout: {
          side: "#070808", // left panel
          content: "#0F1115", // right panel background
          surface: "#14161C", // cards, inputs
        },
      },
    },
  },
  plugins: [daisyui],
};
