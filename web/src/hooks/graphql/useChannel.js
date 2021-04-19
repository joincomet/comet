import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useMemo } from 'react'

export const useChannel = channelId => {
  const [user] = useCurrentUser()
  return useMemo(
    () =>
      (user?.servers?.flatMap(s => s.channels) ?? []).find(
        c => c.id === channelId
      ),
    [channelId, user?.servers]
  )
}
