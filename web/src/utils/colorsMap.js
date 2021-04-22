import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from 'tailwind.config.js'

const {
  theme: { colors }
} = resolveConfig(tailwindConfig)

export const colorsMap = {
  Red: colors.red[500],
  Yellow: colors.yellow[500],
  Green: colors.green[500],
  Blue: colors.blue[500],
  Indigo: colors.indigo[500],
  Purple: colors.purple[500],
  Pink: colors.pink[500]
}
