/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        zinc: colors.zinc,
        slate: colors.slate,
        neutral: colors.neutral,
        amber: colors.amber,
        blue: colors.blue,
        indigo: colors.indigo,
        red: colors.red,
      },
    },
  },
  plugins: [],
};
