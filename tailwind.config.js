/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.ts",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E2C97A',
          dark: '#A07830',
        },
        nero: {
          DEFAULT: '#0A0A0A',
          soft: '#111111',
          muted: '#1A1A1A',
        },
        cream: {
          DEFAULT: '#F5F0EB',
          soft: '#FAF7F4',
        },
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body:    ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
