/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        Gradient1:
          "linear-gradient(180deg, #020617 0%, rgba(2, 6, 23, 0) 47.93%, #020617 100%)",
      },
      screens: {
        xl: "1393px",
      },
    },
  },
  plugins: [],
};
