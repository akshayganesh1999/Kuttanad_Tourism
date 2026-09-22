/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Kuttanad / Kerala backwaters inspired palette (used later phases)
        emerald: {
          950: '#052e24',
        },
        coconut: {
          50: '#f7f5ee',
          100: '#efe9d8',
          500: '#8a7b4f',
        },
        backwater: {
          50: '#eef6f2',
          100: '#d3e9de',
          300: '#8fc4a9',
          500: '#2f7a5b',
          700: '#1c4d3a',
          900: '#0e2e22',
        },
        sand: {
          50: '#fbf8f2',
          100: '#f3ecdd',
        },
        gold: {
          400: '#c9a24b',
          500: '#b6902f',
        },
        charcoal: {
          800: '#2a2a28',
          900: '#1b1b19',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
