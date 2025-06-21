/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "custom-bg": "#09090B"
      },
      fontFamily: {
        "varela": ["Varela Round", "sans-serif"]
      }
    }
  },
  plugins: []
};
