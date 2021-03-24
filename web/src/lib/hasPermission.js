import { useUser } from '@/components/providers/UserProvider'
import { useQuery } from 'urql'
import { GET_SERVER_PERMISSIONS } from '@/graphql/queries'
import { useParams } from 'react-router-dom'

export const useHasServerPermissions = (permissions, serverId) => {
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
  ManageChannels: 'ManageChannels',

  ManageRoles: 'ManageRoles',
  ManageServer: 'ManageServer',
  CreateInvite: 'CreateInvite',

  ChangeNickname: 'ChangeNickname',
  ManageNicknames: 'ManageNicknames',

  KickUser: 'KickUser',
  BanUser: 'BanUser',

  SendMessages: 'SendMessages',
  EmbedLinks: 'EmbedLinks',
  AttachFiles: 'AttachFiles',
  ManageMessages: 'ManageMessages',

  CreatePost: 'CreatePost',
  VotePost: 'VotePost',
  ManagePosts: 'ManagePosts',

  CreateComment: 'CreateComment',
  VoteComment: 'VoteComment',
  ManageComments: 'ManageComments',
  ViewComments: 'ViewComments',

  DisplayRoleSeparately: 'DisplayRoleSeparately'
}
