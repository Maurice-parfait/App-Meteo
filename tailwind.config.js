/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // pour la police Roboto
      fontFamily: {
        Roboto: ['Roboto', 'serif'],
      },

      // pour le grid dans l'application
      gridTemplateColumns: {
        Grid: '0.4fr 6fr',
        Grideux: '5fr 2fr'
      },
    },
  },
  plugins: [
    // pour bien personaliser le scrollbar 
    require('tailwind-scrollbar')
  ],
}

