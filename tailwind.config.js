/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js}'],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // darkMode: false, // or 'media' or 'class'
  darkMode: 'selector',
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
