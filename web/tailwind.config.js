const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
const formsPlugin = require('@tailwindcss/forms')
const aspectRatioPlugin = require('@tailwindcss/aspect-ratio')
const typographyPlugin = require('@tailwindcss/typography')
const lineClampPlugin = require('@tailwindcss/line-clamp')
const scrollbarPlugin = require('tailwind-scrollbar')

module.exports = {
  mode: 'jit',
  purge: ['./src/index.html', './src/**/*.{js,jsx,html}'],
  theme: {
    extend: {
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        13: '3.25rem',
        17: '4.25rem',
        17.5: '4.375rem',
        18: '4.5rem',
        25: '6.25rem',
        26: '6.5rem',
        30: '7.5rem',
        31: '7.75rem',
        46: '11.5rem',
        55: '13.75rem',
        76: '19rem',
        78: '19.5rem',
        81: '20.25rem'
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
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        base: '.9375rem',
        13: '.8125rem',
        11: '0.6875rem',
        10: '0.625rem',
        9: '0.5625rem'
      },
      transitionDelay: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
        900: '900ms'
      },
      scale: {
        80: '.80',
        85: '.85',
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
        33: '0.333',
        35: '0.35'
      },
      ringWidth: {
        3: '3px',
        5: '5px',
        6: '6px',
        7: '7px',
        9: '9px',
        10: '10px'
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.blue.500'),
              'text-decoration': 'none'
            },
            strong: {
              color: theme('colors.gray.900')
            },
            h2: {
              color: theme('colors.gray.900')
            },
            h3: {
              color: theme('colors.gray.900')
            },
            code: {
              color: 'white',
              'background-color': theme('colors.gray.900'),
              '&:before, &:after': {
                display: 'none'
              }
            },
            p: {
              color: theme('colors.gray.900')
            },
            'ul > li': {
              '&::before': {
                'background-color': theme('colors.gray.900'),
                'font-weight': 'bold'
              }
            },
            'ol > li': {
              '&::before': {
                color: theme('colors.gray.900'),
                'font-weight': 'bold'
              }
            }
          }
        },

        dark: {
          css: {
            color: theme('colors.gray.100'),
            a: {
              color: theme('colors.blue.500'),
              'text-decoration': 'none'
            },
            strong: {
              color: theme('colors.gray.100')
            },
            'a > strong': {
              color: theme('colors.blue.500')
            },
            h2: {
              color: theme('colors.gray.100')
            },
            h3: {
              color: theme('colors.gray.100')
            },
            code: {
              color: theme('colors.gray.100'),
              '&:before, &:after': {
                display: 'none'
              }
            },
            p: {
              color: theme('colors.gray.100')
            },
            'ul > li': {
              '&::before': {
                'background-color': theme('colors.gray.100'),
                'font-weight': 'bold'
              }
            },
            'ol > li': {
              '&::before': {
                color: theme('colors.gray.100'),
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
      typography: ['dark']
    },
    scrollbar: ['dark', 'rounded']
  },
  darkMode: 'class',
  plugins: [
    formsPlugin,
    aspectRatioPlugin,
    typographyPlugin,
    lineClampPlugin,
    scrollbarPlugin,
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
