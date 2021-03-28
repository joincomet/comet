import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'
import stringHash from 'string-hash'

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/dist/',
  plugins: [reactRefresh()],
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
    jsxInject: ``
  }
}))
