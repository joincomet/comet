const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette')
  .default

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'Inter', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        xxs: '.6875rem',
        tiny: '.625rem'
      },
      spacing: {
        18: '4.5rem',
        prose: '65ch',
        nav: '17.5rem'
      },
      transitionDelay: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
        900: '900ms'
      },
      scale: {
        101: '1.01',
        102: '1.02',
        103: '1.03',
        104: '1.04'
      },
      cursor: {
        grab: 'grab',
        grabbing: 'grabbing'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,

      red: colors.red,
      amber: colors.amber,
      yellow: colors.yellow,
      green: colors.green,
      blue: colors.blue,
      purple: colors.purple,
      pink: colors.pink
    }
  },
  variants: {
    extend: {
      backgroundColor: ['hover_before', 'hover_after']
    }
  },
  darkMode: 'class',
  experimental: 'all',
  future: 'all',
  plugins: [
    require('tailwindcss-pseudo-elements'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    plugin(function ({ addUtilities }) {
      addUtilities(
        {
          '.empty-content': {
            content: "''"
          }
        },
        ['before']
      )
    }),
    plugin(({ addUtilities, e, theme, variants }) => {
      const colors = flattenColorPalette(theme('borderColor'))
      delete colors['default']

      const colorMap = Object.keys(colors).map(color => ({
        [`.border-t-${color}`]: { borderTopColor: colors[color] },
        [`.border-r-${color}`]: { borderRightColor: colors[color] },
        [`.border-b-${color}`]: { borderBottomColor: colors[color] },
        [`.border-l-${color}`]: { borderLeftColor: colors[color] }
      }))
      const utilities = Object.assign({}, ...colorMap)

      addUtilities(utilities, variants('borderColor'))
    })
  ],
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}'
  ]
}
