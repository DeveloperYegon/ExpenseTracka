/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#1e3a8a',   // Custom color 1
        customGreen: '#10b981',  // Custom color 2
      },
      gradientColorStops: theme => ({
        'start': '#ff7e5f',
        'middle': '#feb47b',
        'end': '#ffcc33',
      }),
    },
  },
  plugins: [],
}