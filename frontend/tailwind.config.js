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
    content: [
      'content/**/*.md'
    ]
  }
}
