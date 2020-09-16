const path = require('path')

module.exports = {
  dark: 'class',
  experimental: 'all',
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
  purge: {
    content (defaultContents) {
      return defaultContents
        .concat(['content/**/*.md'])
        .map(p => path.join('src/', p))
    }
  }
}
