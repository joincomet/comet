import { useMemo } from 'react'
import { useChannel } from '@/hooks/graphql/useChannel'

/**
 * @param channelId The ID of the channel to check permissions
 * @param permissions Channel permissions to check
 * @return {boolean[]} Array of booleans representing if user has permission, same length and order as input permissions
 */
export const useHasChannelPermissions = ({ channelId, permissions }) => {
  const channel = useChannel(channelId)

  return useMemo(() => {
    if (!channel) return permissions.map(_ => false)
    return permissions.map(perm => channel.permissions.includes(perm))
  }, [channel, permissions])
}
