import { registerEnumType } from 'type-graphql'

export enum Color {
  Red = 'red',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
  Indigo = 'indigo',
  Purple = 'purple',
  Pink = 'pink'
}

registerEnumType(Color, { name: 'Color' })
