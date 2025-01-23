/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "w-20", // Ensure this class is always available
    "w-64", // Ensure this class is always available
    "transition-all",
    "duration-300",
  ],
};
