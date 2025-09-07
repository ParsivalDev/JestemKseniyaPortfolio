// =========================
// FILE: tailwind.config.js
// =========================
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blush: '#f6d2e1',
        lilac: '#d9c9ff',
        sky: '#c6e7ff',
        glassBorder: 'rgba(255,255,255,0.45)',
      },
      boxShadow: {
        glass: '0 10px 30px rgba(0,0,0,0.15)'
      },
      borderRadius: {
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}