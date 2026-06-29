/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./download.html",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#ED1C24',
        'brand-dark': '#111111',
        'brand-darker': '#0a0a0a',
        'brand-light': '#F8F8F7',
        'brand-gray-100': '#F3F4F6',
        'brand-gray-200': '#E5E7EB',
        'brand-gray-400': '#9CA3AF',
        'brand-gray-600': '#4B5563',
        'brand-gray-800': '#1F2937',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}
