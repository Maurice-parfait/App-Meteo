/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto', 'serif'],
      },

      gridTemplateColumns: {
        Grid: '0.4fr 6fr',
        Grideux: '5fr 2fr'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

