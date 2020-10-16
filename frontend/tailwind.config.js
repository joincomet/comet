module.exports = {
  theme: {
    extend: {
      fontSize: {
        tiny: '.625rem'
      },
      transitionDelay: {
        400: '400ms'
      }
    }
  },
  dark: 'class',
  experimental: 'all',
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
  purge: {
    content: [
      'content/**/*.md'
    ]
  }
}
