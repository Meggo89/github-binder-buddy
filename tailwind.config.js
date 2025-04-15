/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A2647',
          light: '#1B3B67',
          dark: '#061830',
        },
        sand: {
          DEFAULT: '#D4C5B2',
          light: '#E5DCD1',
          dark: '#B8A99A',
        }
      }
    },
  },
  plugins: [],
};