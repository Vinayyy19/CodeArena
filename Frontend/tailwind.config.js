/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        osu: '#b73100',
        'osu-light': '#dc4405',
        'osu-text': '#ff8a5c',
        'arena-dark': '#0a0a0a',
        'arena-card': 'rgba(0, 0, 0, 0.8)',
        'arena-border': 'rgba(220, 68, 5, 0.6)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(220, 68, 5, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(220, 68, 5, 0.6)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'slide-in': 'slideInRight 0.4s ease-out forwards',
        shimmer: 'shimmer 2s infinite',
        blob: 'blob 7s infinite',
      },
    },
  },
  plugins: [],
}
