/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandRed: '#d9232a', // Rojo inspirado en el logo
        brandYellow: '#f5a623', // Amarillo de los acentos
      }
    },
  },
  plugins: [],
}