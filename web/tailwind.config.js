const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./src/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        17.5: '4.375rem',
        18: '4.5rem',
        76: '19rem',
        78: '19.5rem'
      },
      colors: {
        gray: {
          650: '#494951',
          725: '#39393F',
          750: '#333338',
          775: '#2D2D31',
          850: '#202023',
          950: '#0C0C0E'
        }
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        base: '.9375rem',
        13: '.8125rem',
        11: '0.6875rem',
        10: '0.625rem'
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
      ringWidth: {
        3: '3px',
        6: '6px'
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.blue.500'),
              'text-decoration': 'none',
              '&:hover, &.active': {
                color: 'white',
                'background-color': theme('colors.blue.500'),
                strong: {
                  color: 'white'
                }
              }
            },
            strong: {
              color: theme('colors.blue.500')
            },
            h1: {
              color: theme('colors.gray.800')
            },
            h2: {
              color: theme('colors.gray.800')
            },
            h3: {
              color: theme('colors.gray.800')
            },
            h4: {
              color: theme('colors.gray.800')
            },
            code: {
              color: 'white',
              'background-color': theme('colors.gray.800'),
              '&:before, &:after': {
                display: 'none'
              }
            },
            p: {
              color: theme('colors.gray.800')
            },
            'ul > li': {
              '&::before': {
                'background-color': theme('colors.gray.800'),
                'font-weight': 'bold'
              }
            },
            'ol > li': {
              '&::before': {
                color: theme('colors.gray.800'),
                'font-weight': 'bold'
              }
            }
          }
        },

        dark: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.blue.500'),
              'text-decoration': 'none',
              '&:hover, &.active': {
                color: theme('colors.gray.200'),
                'background-color': theme('colors.blue.500')
              }
            },
            strong: {
              color: theme('colors.blue.500')
            },
            h1: {
              color: theme('colors.gray.200')
            },
            h2: {
              color: theme('colors.gray.200')
            },
            h3: {
              color: theme('colors.gray.200')
            },
            h4: {
              color: theme('colors.gray.200')
            },
            code: {
              color: theme('colors.gray.100'),
              '&:before, &:after': {
                display: 'none'
              }
            },
            p: {
              color: theme('colors.gray.200')
            },
            'ul > li': {
              '&::before': {
                'background-color': theme('colors.gray.200'),
                'font-weight': 'bold'
              }
            },
            'ol > li': {
              '&::before': {
                color: theme('colors.gray.200'),
                'font-weight': 'bold'
              }
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
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink
    }
  },
  variants: {
    extend: {
      typography: ['dark'],
      inset: ['electron'],
      padding: ['electron'],
      margin: ['electron']
    },
    scrollbar: ['dark', 'rounded']
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
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
