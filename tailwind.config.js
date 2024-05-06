/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      colors:{
        body: '#ebebeb00',
        lightBlack: '#333333',
        primary: '#0073b1',
        secondary: '#6b7280',
        alert: '#dc3545',
        success: '#198754',
        warn: '#ffc107',
      }
    },
  },
  plugins: [],
}

