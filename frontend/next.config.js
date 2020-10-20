const withPWA = require('next-pwa')
const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
})

module.exports = withMDX(withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV !== 'production',
  },
  compress: false
}))
