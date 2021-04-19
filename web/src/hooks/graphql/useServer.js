import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useMemo } from 'react'

export const useServer = serverId => {
  const [user] = useCurrentUser()
  return useMemo(() => (user?.servers ?? []).find(s => s.id === serverId), [
    serverId,
    user?.servers
  ])
}
