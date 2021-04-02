import { useMemo } from 'react'
import {
  GET_CHANNEL_PERMISSIONS,
  GET_SERVER_PERMISSIONS
} from '@/graphql/queries'
import { useCurrentUser } from '@/providers/UserProvider'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'urql'

/**
 * @param channelId The ID of the channel to check permissions
 * @param serverId The ID of the server to check permissions
 * @param channelPermissions Channel permissions to check
 * @param serverPermissions Fallback ServerPermissions, if ChannelPermission is neither allowed nor denied
 * @return {boolean[]} Array of booleans representing if user has permission, same length and order as input permissions
 */
export const useHasChannelPermissions = (
  channelId,
  serverId,
  channelPermissions,
  serverPermissions
) => {
  const { t } = useTranslation()
  const user = useCurrentUser()
  const [{ data: serverData }] = useQuery({
    query: GET_SERVER_PERMISSIONS,
    variables: { serverId }
  })
  const [{ data: channelData }] = useQuery({
    query: GET_CHANNEL_PERMISSIONS,
    variables: { channelId }
  })
  if (channelPermissions.length !== serverPermissions.length)
    throw new Error(t('error.channelPermissions'))
  return useMemo(() => {
    const serverPerms = serverData?.getServerPermissions ?? []
    const channelPerms = channelData?.getChannelPermissions ?? {
      allowedPermissions: [],
      deniedPermissions: []
    }
    if (user.isAdmin) return channelPermissions.map(_ => true)
    const res = []
    for (let i = 0; i < channelPermissions.length; i++) {
      const channelPerm = channelPermissions[i]
      const serverPerm = serverPermissions[i]
      if (channelPerms.allowedPermissions.includes(channelPerm)) res.push(true)
      else if (channelPerms.deniedPermissions.includes(channelPerm))
        res.push(false)
      else if (serverPerms.includes(serverPerm)) res.push(true)
      else res.push(false)
    }
    return res
  }, [
    serverData?.getServerPermissions,
    channelData?.getChannelPermissions,
    user.isAdmin,
    channelPermissions,
    serverPermissions
  ])
}
