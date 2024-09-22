/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'blue-wave': '#00B2FFCC',
        'white-wave': '#FFFFFF33',
        'app-bg': '#19274A',
        'app-btn': '#EF4343'
      },
      fontFamily: {
        body: ['"PT Sans"', 'system-ui'],
      },
      width: {
        'blue-waves':'600px',
        'white-waves': '800px'
      }
    },
  },
  plugins: [],
}

