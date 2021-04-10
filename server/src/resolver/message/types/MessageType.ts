import { registerEnumType } from 'type-graphql'

export enum MessageType {
  Normal = 'Normal',
  Join = 'Join'
}

registerEnumType(MessageType, { name: 'MessageType' })
