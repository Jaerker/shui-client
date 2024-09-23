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
        'app-bg-tint': '#19274A88',
        'app-btn': '#EF4343'
      },
      fontFamily: {
        body: ['"PT Sans"', 'system-ui'],
      },
      width: {
        'blue-waves':'600px',
        'white-waves': '800px',
        '50px': '50px'
      },
      height: {
        '50px': '50px'

      },
      gridTemplateRows:{
          'form': '14fr 2fr 2fr 1fr'
      },
      skew:{
        '45': '45deg'
      }
    },
  },
  plugins: [],
}

