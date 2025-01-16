const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poke: ['PokeFont', ...defaultTheme.fontFamily.sans],
        poke2: ['PokeFont2', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
