const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Space Mono', ...defaultTheme.fontFamily.mono]
      },
      fontSize: {
        xxs: '.6875rem',
        tiny: '.625rem'
      },
      spacing: {
        18: '4.5rem'
      },
      transitionDelay: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
        900: '900ms'
      },
      scale: {
        101: '1.01',
        102: '1.02',
        103: '1.03',
        104: '1.04'
      },
      cursor: {
        grab: 'grab',
        grabbing: 'grabbing'
      },
      opacity: {
        45: '.45',
        40: '.40',
        35: '.35',
        30: '.30',
        20: '.20',
        15: '.15',
        10: '.10',
        5: '.05'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: '#000',
      white: '#fff',

      ...colors
    }
  },
  darkMode: 'class',
  experimental: 'all',
  future: 'all',
  plugins: [require('@tailwindcss/typography')],
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}'
  ]
}
