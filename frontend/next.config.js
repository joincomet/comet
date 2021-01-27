const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  compress: false,
  experimental: {
    scrollRestoration: true
  },
  future: {
    webpack5: true
  }
})
