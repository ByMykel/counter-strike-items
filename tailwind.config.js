const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.zinc,
        black: {
          500: "#090909",
          450: "#101010",
          400: "#121212",
          300: "#212121",
          200: "#535353",
          100: "#b3b3b3",
        },
      },
    },
  },
  plugins: [],
};
