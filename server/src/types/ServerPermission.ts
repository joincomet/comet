import { registerEnumType } from 'type-graphql'

export enum ServerPermission {
  ManageChannels = 'ManageChannels',

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
  ViewComments = 'ViewComments'
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
