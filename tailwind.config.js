/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/Global/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        banner: 'url("/assets/images/new-banner.png");',
      },
    },
  },
  plugins: [],
};
