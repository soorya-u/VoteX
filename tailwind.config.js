/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
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
      colors: {
        primary: "#fff6e9",
        secondary: "#f73859",
        link: "#B6B6B6",
      },
      fontFamily: {
        "open-sans": ["Open Sans"],
        poppins: ["Poppins"],
        tiny5: ["Tiny5"],
        cursive: ["cursive"],
      },
      backgroundImage: {
        banner: 'url("/assets/images/new-banner.png")',
        "hero-bg-vector": 'url("/assets/images/hero_bg_vector.png")',
      },
      animation: {
        push: "push 5s linear infinite",
        "preview-skew": "preview-skew 5s linear infinite",
        "preview-shape-rev-x": "preview-shape-rev-x 5s linear infinite",
        jello: "jello 10s linear infinite",
        shadow: "shadow 0.5s linear infinite",
        "loader-spinner": "loader-spinner 0.5s linear infinite",
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
        "preview-skew": {
          "0%": {
            transform: "translateX(-15px)",
          },
          "50%": {
            transform: "translateX(15px) rotate(20deg) scale(0.8)",
            opacity: 0.7,
          },
          "100%": {
            transform: "translateX(-15px)",
          },
        },
        "preview-shape-rev-x": {
          "0%": {
            transform: "translateX(15px)",
          },
          "50%": {
            transform: "translateX(0px)",
          },
          "100%": {
            transform: "translateX(15px)",
          },
        },
        shadow: {
          "0%": {
            transform: "scale(1, 1)",
          },
          "50%": {
            transform: "scale(1.2, 1)",
          },
          "100%": {
            transform: "scale(1, 1)",
          },
        },
        jello: {
          from: {
            transform: "translate3d(0, 0, 0)",
          },
          "11.1%": {
            transform: "translate3d(0, 0, 0)",
          },
          "22.2%": {
            transform: "skewX(-6deg) skewY(-6deg)",
          },
          "33.3%": {
            transform: "skewX(6.25deg) skewY(6.25deg)",
          },
          "44.4%": {
            transform: "skewX(-6.125deg) skewY(-6.125deg)",
          },
          "55.5%": {
            transform: "skewX(6deg) skewY(6.25deg)",
          },
          "66.6%": {
            transform: "skewX(-4deg) skewY(-4deg)",
          },
          "77.7%": {
            transform: "skewX(4deg) skewY(4deg)",
          },
          "88.8%": {
            transform: "skewX(-5deg) skewY(-5deg)",
          },
          to: {
            transform: "translate3d(0, 0, 0)",
          },
        },
        "loader-spinner": {
          "17%": {
            "border-bottom-right-radius": "3px",
          },
          "25%": {
            transform: "translateY(9px) rotate(22.5deg)",
          },
          "50%": {
            transform: "translateY(18px) scale(1, 0.9) rotate(45deg)",
            "border-bottom-right-radius": "40px",
          },
          "75%": {
            transform: "translateY(9px) rotate(67.5deg)",
          },
          "100%": {
            transform: " translateY(0) rotate(90deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
