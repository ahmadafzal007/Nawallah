

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {

      transitionDelay: {
        '600': '2000ms',
      },

      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        cursive: ["Pacifico", "Sriracha", "cursive"],
        cursive2: ["Sriracha", "cursive"],
      },
      colors: {
        custombg: '#0xFFFDF6F7',
        customBoxInside: '#0xFFFFE5E5',
        customMain : '#0xFF800000',
        costomFont : '#f10057',
        primary: "#854d3d",
        secondary: "#560000",
        brandDark: "#802525",
        dark: "#1e1e1e",
        light: "#f5f5f5",
        card : "#802525",
        footer: "#530102",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
      animation: {
        "spin-slow": "spin 40s linear infinite",
      },

    },
  },
  plugins: [],
}
