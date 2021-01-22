const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette')
  .default

const round = num =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const rem = px => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`

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
            color: theme('colors.black'),
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
            h1: {
              color: theme('colors.black')
            },
            h2: {
              color: theme('colors.black')
            },
            h3: {
              color: theme('colors.black')
            },
            h4: {
              color: theme('colors.black')
            },
            h5: {
              color: theme('colors.black')
            },
            h6: {
              color: theme('colors.black')
            },
            strong: {
              color: theme('colors.black')
            },
            code: {
              color: theme('colors.black')
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.300'),
              backgroundColor: theme('colors.gray.200'),
              color: theme('colors.gray.600'),
              paddingLeft: '1rem',
              paddingRight: '1rem',
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem',
              borderRadius: '0.25rem'
            }
          }
        },

        dark: {
          css: {
            color: theme('colors.white'),
            'a strong': {
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
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.gray.400')
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
