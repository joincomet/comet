import { registerEnumType } from 'type-graphql'

export enum MessageType {
  Normal = 'Normal',
  Join = 'Join',
  Left = 'Left'
}

registerEnumType(MessageType, { name: 'MessageType' })
