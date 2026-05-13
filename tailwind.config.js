/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FBF6E9',
          100: '#F4ECD5',
          200: '#E9DDB8',
          300: '#D9C68C',
          400: '#C4AC65',
          500: '#A88E48',
          600: '#856E33',
        },
        ink: {
          50: '#EFEAE0',
          100: '#D9CFB8',
          200: '#A99878',
          400: '#6B5B3E',
          600: '#4A3E29',
          800: '#2C2419',
          900: '#1A140C',
        },
        vermilion: {
          500: '#B43232',
          600: '#8E2828',
        },
        forest: {
          500: '#2D5530',
          600: '#1F3D22',
        },
        gilt: {
          400: '#D4B568',
          500: '#B8954A',
          600: '#8E7036',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        serif: ['EB Garamond', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
