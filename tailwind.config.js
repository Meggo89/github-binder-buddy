/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#0A2647',
          light: '#1B3B67',
          dark: '#061830',
          deepest: '#050E1F',
        },
        sand: {
          DEFAULT: '#D4C5B2',
          light: '#E5DCD1',
          dark: '#B8A99A',
        },
        accent: {
          DEFAULT: '#C9A227',
          light: '#D4B545',
          dark: '#A88A1F',
        },
        ink: {
          DEFAULT: '#0F1419',
          light: '#1A1F26',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F7F4EE',
          elevated: '#FFFFFF',
          inverse: '#0A2647',
        },
        border: {
          subtle: 'rgba(10, 38, 71, 0.08)',
          default: 'rgba(10, 38, 71, 0.16)',
        },
      },
      textColor: {
        primary: '#0A2647',
        muted: '#1B3B67',
        inverse: '#FFFFFF',
        subtle: '#6B7A8F',
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6vw + 1rem, 5.25rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 4vw + 1rem, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 3vw + 0.5rem, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'heading-lg': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-md': ['1.5rem', { lineHeight: '1.3' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.35' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.65' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.04em' }],
      },
      spacing: {
        'section-sm': '3rem',
        'section-md': '5rem',
        'section-lg': '7.5rem',
        'section-xl': '10rem',
      },
      maxWidth: {
        'content': '72rem',
        'prose-wide': '65ch',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
