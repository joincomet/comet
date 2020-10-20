module.exports = {
  theme: {
    extend: {
      fontSize: {
        tiny: '.625rem'
      },
      transitionDelay: {
        400: '400ms'
      },
      scale: {
        101: '1.01',
        102: '1.02',
        103: '1.03',
        104: '1.04'
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
