/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        skycast: {
          bg: '#0B0F19',
          surface: 'rgba(17, 24, 39, 0.75)',
          card: 'rgba(30, 41, 59, 0.60)',
          border: 'rgba(255, 255, 255, 0.10)',
          primary: '#38BDF8',
          accent: '#6366F1',
          gold: '#F59E0B',
          danger: '#EF4444',
          success: '#10B981'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
