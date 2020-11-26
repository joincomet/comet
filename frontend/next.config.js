const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  compress: false,
  experimental: {
    polyfillsOptimization: true
  },
  images: {
    domains: [
      'media.cometx.io',
      'i.getcomet.net'
    ]
  }
})
