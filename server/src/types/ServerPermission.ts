import { registerEnumType } from 'type-graphql'

export enum ServerPermission {
  Admin = 'ADMIN',
  ViewChannels = 'VIEW_CHANNELS',
  ManageChannels = 'MANAGE_CHANNELS',
  ManageRoles = 'MANAGE_ROLES',
  ManageServer = 'MANAGE_SERVER',
  CreateInvite = 'CREATE_INVITE',
  ChangeNickname = 'CHANGE_NICKNAME',
  ManageNicknames = 'MANAGE_NICKNAMES',
  KickUser = 'KICK_USER',
  BanUser = 'BAN_USER',
  SendMessages = 'SEND_MESSAGES',
  EmbedLinks = 'EMBED_LINKS',
  AttachFiles = 'ATTACH_FILES',
  ManageMessages = 'MANAGE_MESSAGES'
}

registerEnumType(ServerPermission, { name: 'ServerPermission' })
