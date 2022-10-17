const { transparent } = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#CDD1F0",
          100: "#A9A8E0",
          200: "#4C4B7E",
          300: "#1B1A3E",
        },
        juicyblue: {
          50: "#ACC8FF",
          100: "#3177FF",
        },
        juicygreen: {
          50: "#B2EBD0",
          100: "#20C879",
        },
      },
      borderRadius: {
        "2.5xl": "1.25rem",
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
        ml: "0px 4px 12px rgba(76, 75, 126, 0.25);",
        "inner-brand": "inset 0px 2px 6px rgba(76, 75, 126, 0.2);",
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
        ".bg-brand-gradient": {
          background:
            "radial-gradient(134.2% 110.5% at -9.28% -8.59%, #71A1FF 34.38%, #293CEB 93.23%)",
        },
      });
    }),
  ],
};
