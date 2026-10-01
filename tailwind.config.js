/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8EE',
        charcoal: '#3A3A3A',
        coral: {
          DEFAULT: '#FF6B6B',
          dark: '#E85555',
          light: '#FFE3E0',
        },
        teal: {
          DEFAULT: '#2EC4B6',
          dark: '#1D9E92',
          light: '#D6F5F2',
        },
        sunshine: {
          DEFAULT: '#FFC857',
          dark: '#F5A623',
          light: '#FFF3D6',
        },
        lavender: {
          DEFAULT: '#9B8AE6',
          dark: '#6E5AC4',
          light: '#EDE9FB',
        },
      },
      fontFamily: {
        heading: ['"Baloo 2"', 'cursive'],
        body: ['Nunito', 'ui-sans-serif', 'sans-serif'],
      },
      borderRadius: {
        blob: '2rem',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(58, 58, 58, 0.12)',
      },
    },
  },
  plugins: [],
}