/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        colors: {
          'backgroundRegister': ' linear-gradient(180deg, #A855F7 0%, #7C3AED 100%)',
          'radial1':' radial-gradient(42.99% 42.99% at 30.18% 57.01%, #444CE4 0%, #037E82 100%)',
          'bgPrimHover': '#22D3EE',
        },
        backgroundImage:{
          'iconSersow' : "url('/public/images/Icon.svg')",
          'bgPrimMaster': 'linear-gradient(180deg, #22D3EE 0%, #0EA5E9 100%)',
        },
    },
  },
  plugins: [],
};
