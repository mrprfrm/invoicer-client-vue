const { transparent } = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#EBE7F7",
          200: "#C5C4FF",
          300: "#9491FD",
          400: "#4440EA",
          500: "#121131",
        },
      },
      borderRadius: {
        "2.5xl": "1.875rem",
      },
      padding: {
        3.75: "0.9375rem",
        4.5: "1.125rem",
        7.5: "1.875rem",
        15: "3.75rem",
      },
      spacing: {
        7.5: "1.875rem",
      },
      boxShadow: {
        dark: "0px 4px 16px 0px rgba(68, 64, 234, 0.2);",
      },
      maxHeight: {
        26.25: "6.5625rem",
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
