import { registerEnumType } from 'type-graphql'
import { ServerPermission } from '@/entity/server/ServerPermission'

export enum ChannelPermission {
  ViewChannel = 'ViewChannel',
  SendMessages = 'SendMessages',
  ManageMessages = 'ManageMessages',
  ManagePermissions = 'ManagePermissions'
}

registerEnumType(ChannelPermission, { name: 'ChannelPermission' })

export const ChannelPermissionFallbacks = {
  [ChannelPermission.ViewChannel]: ServerPermission.ViewChannels,
  [ChannelPermission.SendMessages]: ServerPermission.SendMessages,
  [ChannelPermission.ManageMessages]: ServerPermission.ManageMessages,
  [ChannelPermission.ManagePermissions]: ServerPermission.ManageRoles
}
