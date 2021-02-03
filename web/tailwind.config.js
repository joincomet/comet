const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./src/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  presets: [require('@comet/core/tailwind-preset.js')],
  variants: {
    extend: {
      inset: ['electron'],
      padding: ['electron'],
      margin: ['electron']
    },
    scrollbar: ['dark', 'rounded']
  },
  plugins: [
    require('tailwind-scrollbar'),
    plugin(function ({ addVariant, e }) {
      addVariant('electron', ({ modifySelectors, separator }) => {
        const modified = modifySelectors(({ className }) => {
          return `.${e(`electron${separator}${className}`)}`
        })

        modified.walkRules(rule => {
          rule.selectors = rule.selectors.map(selector => {
            return `.electron ${selector}`
          })
        })

        return modified
      })
    })
  ]
}
