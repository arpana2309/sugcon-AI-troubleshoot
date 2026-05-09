/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sitecore-blue': '#0068B5',
        'sitecore-dark': '#1a1a1a',
        'sitecore-light': '#f5f5f5',
      },
    },
  },
  plugins: [],
}
