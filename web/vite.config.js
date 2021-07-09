import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'
import stringHash from 'string-hash'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ command }) => ({
  base: process.env.ELECTRON === 'true' ? './' : '/',
  plugins: [
    reactRefresh(),
    VitePWA({
      manifest: {
        theme_color: '#1C2027',
        background_color: '#262A32',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        name: 'Comet',
        short_name: 'Comet',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: '/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {}
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src')
    }
  },
  server: {
    port: process.env.PORT ? +process.env.PORT : 3000
  },
  optimizeDeps: {
    exclude: ['path']
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: (name, filename, css) => {
        if (name === 'dark') return 'dark'
        const i = css.indexOf(`.${name}`)
        const lineNumber = css.substr(0, i).split(/[\r\n]/).length
        const hash = stringHash(css).toString(36).substr(0, 5)

        return `_${name}_${hash}_${lineNumber}`
      }
    }
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  build: {
    target: 'es2018',
    outDir: process.env.ELECTRON === 'true' ? '../electron/dist' : 'dist'
  }
}))
