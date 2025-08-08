/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#042B26",
        secondary: "#E5D896",
        darkSecondary: "#DBAA4B",
        lightSecondary: "#E5D89666",
        lighterSecondary: "#F4E6C9",
        green: "#0EAB61",
        lightGray: "#00000080",
        lighterGray: "#D9D9D9",
        mediumGray: "#000000B2",
      },
      fontFamily: {
        Sacramento: ["Sacramento", "cursive"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
