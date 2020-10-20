import { resolve } from 'path'
import { promises as fsp } from 'fs'

export default async function(moduleOptions) {
  const options = {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    cookie: {
      key: 'theme',
      options: {
        path: this.options.router.base,
        sameSite: 'lax'
      }
    }
  }

  // Add script to head to detect user or system preference before loading Nuxt (for SSR)
  const scriptPath = resolve(__dirname, 'script.js')
  const script = await fsp.readFile(scriptPath, 'utf-8')

  this.options.head.script = this.options.head.script || []
  this.options.head.script.push({
    hid: options.hid,
    innerHTML: script,
    pbody: true
  })

  const serializeProp = '__dangerouslyDisableSanitizersByTagID'
  this.options.head[serializeProp] = this.options.head[serializeProp] || {}
  this.options.head[serializeProp][options.hid] = ['innerHTML']
}
