/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "200": "200px",
        "250": "250px",
        "300": "300px",
        "350": "350px",
        "400": "400px",
        "450": "450px",
        "500": "500px",
        "550": "550px",
        "600": "600px",
        "650": "650px",
      },
      colors: {
        'custom-purple': '#43467F',
        'custom-gray': '#F9FAFB',
        'custom-btn-gray': '#637381',
        'custom-cyan': '#47C1BF',
        'custom-blue': '#394aea',
        'custom-background': '#f1f6f7',
        'custom-dark-blue': '#002347',
        'custom-dark-blue-shade': '#05274a',
      },
      boxShadow: {
        'custom-shadow': '0px 0px 7px #c0c0c0'
      }
    },
  },
  plugins: [],
}
