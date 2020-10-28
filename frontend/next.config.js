const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  compress: false,
  images: {
    domains: [process.env.DOMAIN, process.env.IMAGES_DOMAIN]
  }
})
