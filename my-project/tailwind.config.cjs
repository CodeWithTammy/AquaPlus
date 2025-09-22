

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      // => @media (min-width: 320px) { ... }
      'sm': '390px',
      // => @media (min-width: 390px) { ... }

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
      clipPath: {
        'banner': 'polygon(50% 0%, 0% 100%, 100% 100%)',
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        red: 'var(--red-color)',
        secondbasecolor: 'var(--second-base-color)',
        grey: 'var(--grey-color)',
        defaultfont: 'var(--default-font)',
        basecolor: 'var(--base-color)',
  
      },
      container: {
        center: true,
        padding:{
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          "2xl": '6rem',
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Add Open Sans as a font family
      },
      keyframes: {
        waveAnimation: {
          "0%": { backgroundPositionX: "0px" },
          "100%": { backgroundPositionX: "1000px" },
        },
      },
      animation: {
        wave: "waveAnimation 30s linear infinite",
      },
    },
  },
  plugins: [],
}

