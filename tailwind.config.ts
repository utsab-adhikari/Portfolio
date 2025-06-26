/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'ui-sans-serif', 'system-ui'], // overwrite sans
        devanagari: ['Noto Sans Devanagari', 'sans-serif'], // custom name
        poppins: ['Poppins', 'sans-serif'], // another example
      },
    },
  },
  plugins: [],
};
