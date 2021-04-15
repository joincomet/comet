import { registerEnumType } from 'type-graphql'

export enum ChannelPermission {
  ViewChannel = 'ViewChannel',
  SendMessages = 'SendMessages'
}

registerEnumType(ChannelPermission, { name: 'ChannelPermission' })
