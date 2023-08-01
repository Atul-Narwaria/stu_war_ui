/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors:{
      'primary':'#00b5ad',
      'secondary':'#17a2b8',
      "dark-purple": "#111c43",
      "light-white": "rgba(255,255,255,0.17)",
      "white":colors.white,
      'blue': colors.blue,
      'cyan': colors.cyan,
      'gray':colors.gray,
      'dark':colors.black,
      'red':colors.red,
      'green':colors.green,
      'yellow':colors.yellow,
      'purple':colors.purple,
      'dark-blue':'#0B2447'
    },
    extend: {
      fontFamily: {
        poppins: "Poppins",
        kaushan: "Kaushan Script",
      },
    },
  },
  plugins: [],
  darkMode: ['class', '[data-mode="dark"]'],
}