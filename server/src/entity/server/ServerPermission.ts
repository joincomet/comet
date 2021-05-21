import { registerEnumType } from 'type-graphql'

export enum ServerPermission {
  ManageChannels = 'ManageChannels',
  PrivateChannels = 'PrivateChannels',
  RestrictedChannels = 'RestrictedChannels',
  ManageServer = 'ManageServer',
  ManageUsers = 'ManageUsers',
  SendMessages = 'SendMessages',
  ManageMessages = 'ManageMessages',
  ManagePosts = 'ManagePosts',
  ManageComments = 'ManageComments',
  ManageFolders = 'ManageFolders',
  AddPostToFolder = 'AddPostToFolder',
  DisplayRoleSeparately = 'DisplayRoleSeparately',
  Admin = 'Admin'
}

registerEnumType(ServerPermission, { name: 'ServerPermission' })

export const defaultServerPermissions = [ServerPermission.SendMessages]
