import { useMemo } from 'react'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'urql'

/**
 * @param channelId The ID of the channel to check permissions
 * @param serverId The ID of the server to check permissions
 * @param channelPermissions Channel permissions to check
 * @param serverPermissions Fallback ServerPermissions, if ChannelPermission is neither allowed nor denied
 * @return {boolean[]} Array of booleans representing if user has permission, same length and order as input permissions
 */
export const useHasChannelPermissions = ({
  channelId,
  serverId,
  channelPermissions,
  serverPermissions
}) => {
  const [user] = useCurrentUser()

  return useMemo(() => {
    const allTrue = channelPermissions.map(_ => true)
    const allFalse = channelPermissions.map(_ => false)
    if (!user) return allFalse
    if (user?.isAdmin) return allTrue
    const server = user?.servers.find(s => s.server.id === serverId)
    if (!server) return allFalse
    if (server.owner.id === user.id) return allTrue
    const roles = server.roles
    const channelPerms = roles.map(role =>
      role.channelPermissions.find(c => c.channel.id === channelId)
    )
    const res = []
    for (let i = 0; i < channelPermissions.length; i++) {
      const channelPermission = channelPermissions[i]
      const serverPermission = serverPermissions[i]
      const hasServerPerm =
        !!serverPermission &&
        !!roles.find(role => role.hasPermission(serverPermission))
      const channelPerm = channelPerms.find(
        perm =>
          perm.deniedPermissions.includes(channelPermission) ||
          perm.allowedPermissions.includes(channelPermission)
      )
      if (!channelPerm) return hasServerPerm
      res[i] = channelPerm.allowedPermissions.includes(channelPermission)
    }
    return res
  }, [channelPermissions, user, serverId, channelId, serverPermissions])
}
