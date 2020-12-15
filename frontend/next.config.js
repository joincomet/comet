const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  compress: false,
  experimental: {
    scrollRestoration: true
  },
  images: {
    domains: ['media.cometx.io', 'i.getcomet.net'],
    deviceSizes: [640, 768, 1024, 1280, 1536]
  }
})
