/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "2xs": "0.625rem",
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.75rem",
        "4xl": "2rem",
        "5xl": "2.375rem",
        "6xl": "3rem",
        "7xl": "3.375rem",
        "8xl": "3.75rem",
        "9xl": "4.5rem",
        "10xl": "6rem",
        "11xl": "8rem",
        "12xl": "9.75rem",
      },
    },
  },
  plugins: [],
};
