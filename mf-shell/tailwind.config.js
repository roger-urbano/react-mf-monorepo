module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}', 
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        test: '#ff00ff',
      },
    },
  },
  plugins: [],
};
