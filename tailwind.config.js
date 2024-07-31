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
        banner: 'url("/assets/images/new-banner.png")',
      },
      animation: {
        push: "push 5s linear infinite",
      },
      keyframes: {
        push: {
          "0%": {
            transform: "scale(0.9)",
            opacity: "0.7",
          },
          "50%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(0.9)",
            opacity: "0.7",
          },
        },
      },
    },
  },
  plugins: [],
};
