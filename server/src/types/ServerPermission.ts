import { registerEnumType } from 'type-graphql'

export enum ServerPermission {
  ServerAdmin = 'SERVER_ADMIN',
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
  ManageMessages = 'MANAGE_MESSAGES',
  CreatePost = 'CREATE_POST',
  VotePost = 'VOTE_POST',
  ManagePosts = 'MANAGE_POSTS',
  ViewPosts = 'VIEW_POSTS',
  CreateComment = 'CREATE_COMMENT',
  VoteComment = 'VOTE_COMMENT',
  ManageComments = 'MANAGE_COMMENTS',
  ViewComments = 'VIEW_COMMENTS'
}

registerEnumType(ServerPermission, { name: 'ServerPermission' })

export const defaultServerPermissions = [
  ServerPermission.ViewChannels,
  ServerPermission.CreateInvite,
  ServerPermission.ChangeNickname,
  ServerPermission.SendMessages,
  ServerPermission.EmbedLinks,
  ServerPermission.AttachFiles,
  ServerPermission.CreatePost,
  ServerPermission.VotePost,
  ServerPermission.ViewPosts,
  ServerPermission.CreateComment,
  ServerPermission.VoteComment,
  ServerPermission.ViewComments
]
