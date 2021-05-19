import { registerEnumType } from 'type-graphql'

export enum MessageType {
  Normal = 'Normal',
  Join = 'Join',
  Left = 'Left',
  FriendRequestReceived = 'FriendRequestReceived',
  Initial = 'Initial'
}

registerEnumType(MessageType, { name: 'MessageType' })
