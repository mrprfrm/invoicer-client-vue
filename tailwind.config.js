const { transparent } = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        violetgray: {
          50: "#CDD1F0",
          100: "#A9A8E0",
          200: "#4C4B7E",
          300: "#1B1A3E",
        },
        juicyblue: {
          50: "#ACC8FF",
          100: "#3177FF",
          200: "#216CFF",
        },
        juicygreen: {
          50: "#B2EBD0",
          100: "#20C879",
        },
      },
      borderRadius: {
        "2.5xl": "1.25rem", //20px
      },
      padding: {
        3.75: "0.9375rem", //15px
        4.5: "1.125rem", //18px
        7.5: "1.875rem", //30px
        15: "3.75rem",
      },
      spacing: {
        7.5: "1.875rem", //30px
      },
      boxShadow: {
        dark: "0px 4px 16px 0px rgba(68, 64, 234, 0.2);",
        ml: "0px 4px 12px rgba(76, 75, 126, 0.25);",
        "inner-violetgray": "inset 0px 2px 6px rgba(76, 75, 126, 0.2);",
      },
      height: {
        18.5: "4.625rem", //74px
        42: "10.5rem", //168px
      },
      fontFamily: {
        inter: ["inter"],
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".moz-appearance-none": {
          "-moz-appearance": "textfield",
        },
      });
    }),
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
        ".bg-violetgray-gradient": {
          background:
            "radial-gradient(134.2% 110.5% at -9.28% -8.59%, #71A1FF 34.38%, #293CEB 93.23%)",
        },
      });
    }),
  ],
};
