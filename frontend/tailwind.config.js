module.exports = {
  theme: {
    extend: {
      borderRadius: {
        xl: '1rem',
        full: '9999px'
      },
      fontSize: {
        tiny: '.625rem'
      }
    }
  },
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
