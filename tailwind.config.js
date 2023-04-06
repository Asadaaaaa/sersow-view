/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        colors: {
          'backgroundRegister': ' linear-gradient(180deg, #A855F7 0%, #7C3AED 100%)',
        },
        backgroundImage:{
          'iconSersow' : "url('/public/images/Icon.svg')"
        },
    },
  },
  plugins: [],
};
