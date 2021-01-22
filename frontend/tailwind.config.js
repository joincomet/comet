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
        18: '4.5rem',
        76: '19rem'
      },
      colors: {
        gray: {
          650: '#494951',
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
        13: '.8125rem'
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
              color: theme('colors.gray.800'),
              'margin-top': '0'
            },
            h2: {
              color: theme('colors.gray.800'),
              'margin-top': '0'
            },
            h3: {
              color: theme('colors.gray.800'),
              'margin-top': '0'
            },
            h4: {
              color: theme('colors.gray.800'),
              'margin-top': '0'
            },
            code: {
              color: 'white',
              'background-color': theme('colors.gray.800'),
              '&:before, &:after': {
                display: 'none'
              }
            },
            p: {
              color: theme('colors.gray.800'),
              'margin-top': '0',
              'margin-bottom': '1em'
            },
            img: {
              'margin-top': '0',
              'margin-bottom': '0',
              'box-shadow': '0px 2px 4px -2px rgba(0, 0, 0, 30%)'
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
            color: 'white',
            a: {
              color: theme('colors.blue.500'),
              'text-decoration': 'none',
              '&:hover, &.active': {
                color: 'white',
                'background-color': theme('colors.blue.500')
              }
            },
            strong: {
              color: theme('colors.blue.500')
            },
            h1: {
              color: 'white',
              'margin-top': '0'
            },
            h2: {
              color: 'white',
              'margin-top': '0'
            },
            h3: {
              color: 'white',
              'margin-top': '0'
            },
            h4: {
              color: 'white',
              'margin-top': '0'
            },
            code: {
              color: theme('colors.gray.100'),
              '&:before, &:after': {
                display: 'none'
              }
            },
            p: {
              color: 'white',
              'margin-top': '0',
              'margin-bottom': '1em'
            },
            img: {
              'margin-top': '0',
              'margin-bottom': '0',
              'box-shadow': '0px 2px 4px -2px rgba(255, 255, 255, 30%)'
            },
            'ul > li': {
              '&::before': {
                'background-color': 'white',
                'font-weight': 'bold'
              }
            },
            'ol > li': {
              '&::before': {
                color: 'white',
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
      translate: ['focus-within'],
      scale: ['focus-within'],
      opacity: ['disabled'],
      borderRadius: ['hover', 'focus', 'first', 'last'],
      borderWidth: ['first', 'last']
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
  purge: {
    content: [
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/pages/**/*.{js,ts,jsx,tsx}'
    ],
    options: {
      safelist: [
        'transition',
        'transform',
        'ease-in',
        'ease-out',
        'duration-75',
        'duration-100',
        'opacity-0',
        'opacity-100',
        'scale-95',
        'scale-100',
        'bg-black',
        'font-medium',
        'text-blue-500',
        'bg-blue-500',
        'text-red-500',
        'bg-red-500',
        'text-yellow-500',
        'bg-yellow-500',
        'text-green-500',
        'bg-green-500',
        'text-indigo-500',
        'bg-indigo-500',
        'text-purple-500',
        'bg-purple-500',
        'text-pink-500',
        'bg-pink-500'
      ]
    }
  }
}
