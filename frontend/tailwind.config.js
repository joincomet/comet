const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette')
  .default

module.exports = {
  theme: {
    extend: {
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        18: '4.5rem'
      },
      colors: {
        gray: {
          850: '#202023'
        }
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        xxs: '.6875rem',
        tiny: '.625rem',
        base: '.9375rem'
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
      },
      opacity: {
        33: '0.333'
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.500'),
                textDecoration: 'underline'
              }
            },
            'h2 a': {
              color: theme('colors.gray.800'),
              textDecoration: 'none'
            },
            '.tag a': {
              textDecoration: 'none'
            }
          }
        },

        dark: {
          css: {
            color: theme('colors.white'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.500'),
                textDecoration: 'underline'
              }
            },

            'a strong': {
              color: theme('colors.blue.500')
            },

            'h2 a': {
              color: theme('colors.blue.500')
            },

            h1: {
              color: theme('colors.white')
            },
            h2: {
              color: theme('colors.white')
            },
            h3: {
              color: theme('colors.white')
            },
            h4: {
              color: theme('colors.white')
            },
            h5: {
              color: theme('colors.white')
            },
            h6: {
              color: theme('colors.white')
            },

            strong: {
              color: theme('colors.white')
            },

            code: {
              color: theme('colors.white')
            },

            figcaption: {
              color: theme('colors.white')
            }
          }
        }
      })
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
      typography: ['dark'],
      translate: ['focus-within'],
      scale: ['focus-within'],
      opacity: ['disabled']
    }
  },
  darkMode: 'class',
  experimental: 'all',
  future: 'all',
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
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
