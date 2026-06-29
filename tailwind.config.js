/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        clearsans: ['"Clear Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          yellow: '#fde047',
          magenta: '#db2777',
          dark: '#1f2937',
          primary: '#2563eb',
          light: '#f8fafc'
        }
      }
    },
  },
  plugins: [],
}
