import tailwindColors from 'tailwindcss/colors'

export const realColors = {
  gray: tailwindColors.gray,
  red: tailwindColors.red,
  yellow: tailwindColors.amber,
  green: tailwindColors.emerald,
  blue: tailwindColors.blue,
  indigo: tailwindColors.indigo,
  purple: tailwindColors.violet,
  pink: tailwindColors.pink
}

export const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  black: tailwindColors.black,
  white: tailwindColors.white,
  ...realColors
}

export const colorsMap = {
  Red: colors.red[500],
  Yellow: colors.yellow[500],
  Green: colors.green[500],
  Blue: colors.blue[500],
  Indigo: colors.indigo[500],
  Purple: colors.purple[500],
  Pink: colors.pink[500]
}
