/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "dark-purple": "#081551",
        "light-white": 'rgba(255, 255, 255, 0.18)'
      }
    },
  },
  plugins: [],
}