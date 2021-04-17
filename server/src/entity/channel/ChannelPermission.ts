import { registerEnumType } from 'type-graphql'

export enum ChannelPermission {
  ViewChannel = 'ViewChannel',
  SendMessages = 'SendMessages',
  ManageMessages = 'ManageMessages',
  ManagePermissions = 'ManagePermissions'
}

registerEnumType(ChannelPermission, { name: 'ChannelPermission' })
