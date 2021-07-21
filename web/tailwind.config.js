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
      borderWidth: {
        3: '3px'
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10'
      },
      lineHeight: {
        6.5: '1.625rem'
      },
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
      translate: {
        '1px': '1px'
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
        sm: {
          css: {
            fontSize: '.9375rem'
          }
        },
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.blue.400'),
              'text-decoration': 'none',
              'font-weight': 400,
              '&:hover': {
                'text-decoration': 'underline !important'
              }
            },
            strong: {
              color: theme('colors.gray.900')
            },
            'a > strong': {
              color: theme('colors.blue.400')
            },
            h2: {
              color: theme('colors.gray.900')
            },
            h3: {
              color: theme('colors.gray.900')
            },
            pre: {
              'background-color': theme('colors.gray.775'),
              border: '1px solid',
              'border-color': theme('colors.gray.825')
            },
            code: {
              'background-color': theme('colors.gray.775'),
              'border-radius': '.25rem',
              'padding-left': '0.25rem',
              'padding-right': '0.25rem',
              'padding-top': '0.25rem',
              'padding-bottom': '0.25rem',
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
              color: theme('colors.blue.400'),
              'text-decoration': 'none'
            },
            strong: {
              color: theme('colors.gray.100')
            },
            'a > strong': {
              color: theme('colors.blue.400')
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
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4F545F',
        650: '#454A56',
        700: '#3B404C',
        725: '#353A46',
        750: '#2F343F',
        775: '#292E38',
        800: '#232831',
        825: '#20242D',
        850: '#1C2029',
        900: '#151821',
        950: '#0B0C11'
      },
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
