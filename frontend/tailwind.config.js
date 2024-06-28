/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
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
        border: 'linear-gradient(90deg, rgba(255, 255, 255) 100%, rgba(106, 106, 106) 0)',
        custombg: '#FFFDF6F7',
        customBoxInside: '#FFFFE5E5',
        customMain : '#800000',
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
      }, keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        "spin-slow": "spin 40s linear infinite",
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
}
