/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';
import colors from 'tailwindcss/colors';

export default withMT({
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
});
