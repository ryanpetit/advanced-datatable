/**
 * Tailwind dark mode config for shadcn
 * Add this file if not present, and ensure tailwind.config.js extends it.
 */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
