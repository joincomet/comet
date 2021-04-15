import { registerEnumType } from 'type-graphql'

export enum ServerPermission {
  ViewChannels = 'ViewChannels',
  ManageChannels = 'ManageChannels',

  ManageServer = 'ManageServer',
  CreateInvite = 'CreateInvite',

  ChangeNickname = 'ChangeNickname',
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
  ViewComments = 'ViewComments',

  ManageFolders = 'ManageFolders',
  AddPostToFolder = 'AddPostToFolder',

  DisplayRoleSeparately = 'DisplayRoleSeparately',
  Mentionable = 'Mentionable',
  Admin = 'Admin'
}

registerEnumType(ServerPermission, { name: 'ServerPermission' })

export const defaultServerPermissions = [
  ServerPermission.CreateInvite,
  ServerPermission.ChangeNickname,
  ServerPermission.SendMessages,
  ServerPermission.Mention,
  ServerPermission.CreatePost,
  ServerPermission.VotePost,
  ServerPermission.CreateComment,
  ServerPermission.VoteComment,
  ServerPermission.ViewComments
]
