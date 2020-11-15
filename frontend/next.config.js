const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  compress: false,
  experimental: {
    modern: true,
    polyfillsOptimization: true
  },
  images: {
    domains: [
      'media.cometx.io',
      'media-staging.cometx.io',
      'media-dev.cometx.io',
      'i.getcomet.net'
    ]
  }
})
