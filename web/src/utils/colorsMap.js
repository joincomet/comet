import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'

const {
  theme: { colors }
} = resolveConfig(tailwindConfig)

export const colorsMap = {
  red: colors.red[500],
  yellow: colors.yellow[500],
  green: colors.green[500],
  blue: colors.blue[500],
  indigo: colors.indigo[500],
  purple: colors.purple[500],
  pink: colors.pink[500]
}
