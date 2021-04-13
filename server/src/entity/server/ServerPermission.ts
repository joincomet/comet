import { registerEnumType } from 'type-graphql'

export enum ServerPermission {
  ViewChannels = 'ViewChannels',
  ManageChannels = 'ManageChannels',
  Mention = 'Mention',

  ManageRoles = 'ManageRoles',
  ManageServer = 'ManageServer',
  CreateInvite = 'CreateInvite',

  ChangeNickname = 'ChangeNickname',
  ManageNicknames = 'ManageNicknames',

  KickUser = 'KickUser',
  BanUser = 'BanUser',

  SendMessages = 'SendMessages',
  EmbedLinks = 'EmbedLinks',
  AttachFiles = 'AttachFiles',
  ManageMessages = 'ManageMessages',

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
  ServerPermission.EmbedLinks,
  ServerPermission.AttachFiles,
  ServerPermission.CreatePost,
  ServerPermission.VotePost,
  ServerPermission.CreateComment,
  ServerPermission.VoteComment,
  ServerPermission.ViewComments
]
