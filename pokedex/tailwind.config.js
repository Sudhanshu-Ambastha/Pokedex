/** @type {import('tailwindcss').Config} */
export default { 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'PokeSolid': ['PokeSolid', 'sans-serif'], 
        'PokeHollow': ['PokeHollow', 'sans-serif'],
      },
    },
  },
  plugins: [],
}