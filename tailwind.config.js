/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          dark: '#6D28D9',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
        },
        secondary: {
          DEFAULT: '#06B6D4',
          50: '#ECFEFF',
          100: '#CFFAFE',
        },
        surface: '#FFFFFF',
        background: '#F8FAFC',
        text: {
          DEFAULT: '#0F172A',
          muted: '#64748B',
        },
        success: {
          DEFAULT: '#10B981',
          50: '#ECFDF5',
          100: '#D1FAE5',
        },
        brand: {
          50: '#F5F3FF',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'card-hover': '0 10px 25px -5px rgb(0 0 0 / 0.08), 0 4px 10px -4px rgb(124 58 237 / 0.1)',
        'card-lg': '0 10px 40px -10px rgb(124 58 237 / 0.15)',
        'glow-primary': '0 0 24px rgba(124, 58, 237, 0.28), 0 8px 32px rgba(124, 58, 237, 0.12)',
        'glow-primary-sm': '0 0 16px rgba(124, 58, 237, 0.2)',
        'focus-input': '0 0 0 3px rgba(124, 58, 237, 0.15)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, #7C3AED15 0%, #06B6D415 100%)',
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
