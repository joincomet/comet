import { registerEnumType } from 'type-graphql'

export enum ChannelPermission {
  ViewChannel = 'ViewChannel',
  ManageChannel = 'ManageChannel',
  ManagePermissions = 'ManagePermissions',
  SendMessages = 'SendMessages',
  EmbedLinks = 'EmbedLinks',
  AttachFiles = 'AttachFiles',
  ManageMessages = 'ManageMessages',
  Mention = 'Mention'
}

registerEnumType(ChannelPermission, { name: 'ChannelPermission' })
