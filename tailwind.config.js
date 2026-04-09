module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000', // Black
        secondary: '#FFFFFF', // White
        accent: {
          light: '#3B82F6', // Light/Royal Blue
          dark: '#FF8C00', // Orange
        },
      },
      borderRadius: {
        DEFAULT: '15px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};