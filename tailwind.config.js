const { transparent } = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#3B7393",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        'input[type="date"]::-webkit-calendar-picker-indicator': {
          display: "none",
        },
      });
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scroll-hidden::-webkit-scrollbar": {
          display: "none",
        },
      });
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-black": {
          textShadow: "0 0 0 black",
        },
      });
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".branded-text": {
          background:
            "linear-gradient(to right, rgba(50,97,124,1), rgba(59,115,147,1))",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".branded-bg": {
          background:
            "linear-gradient(to right, rgba(50,97,124,1), rgba(59,115,147,1))",
        },
      });
    }),
  ],
};
