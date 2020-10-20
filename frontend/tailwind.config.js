module.exports = {
  theme: {
    extend: {
      fontSize: {
        tiny: '.625rem',
      },
      transitionDelay: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
        900: '900ms',
      },
      scale: {
        101: '1.01',
        102: '1.02',
        103: '1.03',
        104: '1.04',
      },
    },
    colors: require('./colors'),
  },
  dark: 'class',
  experimental: 'all',
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/custom-forms'),
  ],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    options: {
      whitelist: ['dark'],
    },
    content: [
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/pages/**/*.{js,ts,jsx,tsx}',
    ],
  },
}
