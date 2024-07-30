/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/Global/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "2xs": "400px",
      xs: "479px",
      sm: "575px",
      md: "768px",
      lg: "991px",
      xl: "1200px",
      "2xl": "1400px",
      "3xl": "1600px",
    },
    extend: {
      backgroundImage: {
        banner: 'url("/assets/images/new-banner.png");',
      },
    },
  },
  plugins: [],
};
