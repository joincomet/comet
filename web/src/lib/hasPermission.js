import { useUser } from '@/components/providers/UserProvider'
import { useQuery } from 'urql'
import { GET_SERVER_PERMISSIONS } from '@/graphql/queries'
import { useParams } from 'react-router-dom'

export const useHasServerPermissions = (permissions, serverId) => {
  if (!serverId) serverId = useParams().serverId
  if (!serverId) return permissions.map(_ => false)
  const [user] = useUser()
  const [{ data }] = useQuery({
    query: GET_SERVER_PERMISSIONS,
    variables: { serverId }
  })
  const perms = data?.getServerPermissions ?? []
  const res = []
  for (const perm of permissions) {
    res.push(user.isAdmin || perms.includes(perm))
  }
  return res
}

export const ServerPermission = {
  ServerAdmin: 'SERVER_ADMIN',

  ViewChannels: 'VIEW_CHANNELS',
  ManageChannels: 'MANAGE_CHANNELS',

  ManageRoles: 'MANAGE_ROLES',
  ManageServer: 'MANAGE_SERVER',
  CreateInvite: 'CREATE_INVITE',

  ChangeNickname: 'CHANGE_NICKNAME',
  ManageNicknames: 'MANAGE_NICKNAMES',

  KickUser: 'KICK_USER',
  BanUser: 'BAN_USER',

  SendMessages: 'SEND_MESSAGES',
  EmbedLinks: 'EMBED_LINKS',
  AttachFiles: 'ATTACH_FILES',
  PinMessages: 'PIN_MESSAGES',
  ManageMessages: 'MANAGE_MESSAGES',

  CreatePost: 'CREATE_POST',
  VotePost: 'VOTE_POST',
  ManagePosts: 'MANAGE_POSTS',
  PinPosts: 'PIN_POSTS',
  ViewPosts: 'VIEW_POSTS',

  AddPostsToFolder: 'ADD_POSTS_TO_FOLDER',
  ManageFolders: 'MANAGE_FOLDERS',
  ViewFolders: 'VIEW_FOLDERS',

  CreateComment: 'CREATE_COMMENT',
  VoteComment: 'VOTE_COMMENT',
  ManageComments: 'MANAGE_COMMENTS',
  PinComments: 'PIN_COMMENTS',
  ViewComments: 'VIEW_COMMENTS',

  DisplayRoleSeparately: 'DISPLAY_ROLE_SEPARATELY'
}
