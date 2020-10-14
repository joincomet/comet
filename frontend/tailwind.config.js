module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      fontSize: {
        tiny: '.625rem'
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
