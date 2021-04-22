import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'
import stringHash from 'string-hash'
import { VitePWA } from 'vite-plugin-pwa'

const pwa = VitePWA({
  manifest: {
    name: 'Comet',
    short_name: 'Comet',
    display: 'standalone',
    orientation: 'portrait',
    theme_color: '#3B82F6',
    background_color: '#202023',
    start_url: '/',
    icons: [
      {
        src: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
})

export default defineConfig(({ command }) => ({
  base: process.env.ELECTRON === 'true' ? './' : '/',
  plugins: [reactRefresh(), pwa],
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src'),
      'tailwind.config.js': resolve(__dirname, 'tailwind.config.js')
    }
  },
  server: {
    port: process.env.PORT ? +process.env.PORT : 3000
  },
  optimizeDeps: {
    exclude: ['path'],
    include: ['tailwind.config.js']
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
  }
}))
