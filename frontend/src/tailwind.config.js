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
        .map(path => join('src/', path))
    }
  }
}
