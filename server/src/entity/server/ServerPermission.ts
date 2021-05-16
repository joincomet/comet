import { registerEnumType } from 'type-graphql'

export enum ServerPermission {
  ManageChannels = 'ManageChannels',
  PrivateChannels = 'PrivateChannels',
  RestrictedChannels = 'RestrictedChannels',

  ManageServer = 'ManageServer',

  ManageUsers = 'ManageUsers',

  SendMessages = 'SendMessages',
  ManageMessages = 'ManageMessages',
  Mention = 'Mention',

  CreatePost = 'CreatePost',
  VotePost = 'VotePost',
  ManagePosts = 'ManagePosts',

  CreateComment = 'CreateComment',
  VoteComment = 'VoteComment',
  ManageComments = 'ManageComments',

  ManageFolders = 'ManageFolders',
  AddPostToFolder = 'AddPostToFolder',

  DisplayRoleSeparately = 'DisplayRoleSeparately',
  Mentionable = 'Mentionable',
  Admin = 'Admin'
}

registerEnumType(ServerPermission, { name: 'ServerPermission' })

export const defaultServerPermissions = [
  ServerPermission.SendMessages,
  ServerPermission.Mention,
  ServerPermission.CreatePost,
  ServerPermission.VotePost,
  ServerPermission.CreateComment,
  ServerPermission.VoteComment
]
