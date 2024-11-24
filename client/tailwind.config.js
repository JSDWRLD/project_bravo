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
      maxWidth: {
        '7xl': '80rem', // Default max-w-7xl
        '8xl': '88rem', // New custom size
        '9xl': '96rem', // New custom size
        '10xl': '104rem', // Extra-large size
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
        pulseGlow: 'pulseGlow 3s infinite alternate',
        borderGlow: 'borderGlow 3s linear infinite',
        textGlow: 'textGlow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        sparkles: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px #6366f1, 0 0 30px #6366f1' },
          '50%': { boxShadow: '0 0 25px #6366f1, 0 0 50px #6366f1' },
        },
        borderGlow: {
          '0%': { boxShadow: '0 0 10px rgba(99, 102, 241, 0.8)' },
          '50%': { boxShadow: '0 0 20px rgba(99, 102, 241, 1)' },
          '100%': { boxShadow: '0 0 10px rgba(99, 102, 241, 0.8)' },
        },
        textGlow: {
          '0%': { textShadow: '0 0 5px rgba(99, 102, 241, 0.8), 0 0 10px rgba(99, 102, 241, 0.6)' },
          '100%': { textShadow: '0 0 10px rgba(99, 102, 241, 1), 0 0 20px rgba(99, 102, 241, 0.8)' },
        },
      }
    },
  },
  plugins: [],
}
