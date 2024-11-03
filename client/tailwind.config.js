// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          200: "#D5DAE1"
        },
        black: {
          DEFAULT: "#000",
          500: "#1D2235"
        },
        blue: {
          500: "#d12c2c"
        }
      },
      fontFamily: {
        worksans: ["Work Sans", "sans-serif"],
        poppins: ['Poppins', "sans-serif"],
        retro: ['"Press Start 2P"', 'cursive']
      },
      boxShadow: {
        card: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)'
      },
      backgroundImage: {
        'sparkle-pattern': "radial-gradient(circle, rgba(255,255,255,0.5) 2px, transparent 2px)"
      },
      animation: {
        sparkles: 'sparkles 5s infinite alternate',
        pulseGlow: 'pulseGlow 3s infinite alternate'
      },
      keyframes: {
        sparkles: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
