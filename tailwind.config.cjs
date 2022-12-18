/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        sm: { max: "639px" },
        // => @media (max-width: 639px) { ... }

        xsm: { max: "358px" },
        // => @media (max-width: 358px) { ... }
      },
      colors: {
        "hover-transparent-100": "rgba(255, 255, 255, 0.1)",
        "hover-transparent-200": "rgba(255, 255, 255, 0.1)",
        "hover-transparent-300": "rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};
