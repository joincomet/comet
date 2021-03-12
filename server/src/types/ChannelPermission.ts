import { registerEnumType } from 'type-graphql'

export enum ChannelPermission {
  ViewChannel = 'VIEW_CHANNEL',
  ManageChannel = 'MANAGE_CHANNEL',
  ManagePermissions = 'MANAGE_PERMISSIONS',
  SendMessages = 'SEND_MESSAGES',
  EmbedLinks = 'EMBED_LINKS',
  AttachFiles = 'ATTACH_FILES',
  ManageMessages = 'MANAGE_MESSAGES',
  PinMessages = 'PIN_MESSAGES'
}

registerEnumType(ChannelPermission, { name: 'ChannelPermission' })
