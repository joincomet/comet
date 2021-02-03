import { registerEnumType } from 'type-graphql'

export enum Color {
  red = 'red',
  yellow = 'yellow',
  green = 'green',
  blue = 'blue',
  indigo = 'indigo',
  purple = 'purple',
  pink = 'pink'
}

registerEnumType(Color, { name: 'Color' })
