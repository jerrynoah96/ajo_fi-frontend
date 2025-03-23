/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#9333ea',
          dark: '#a855f7',
        },
        dark: {
          bg: '#111827',
          card: '#1f2937',
          text: '#f3f4f6',
          muted: '#9ca3af',
        }
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
    },
  },
  plugins: [],
} 