import { useCurrentUserQuery } from '@/graphql/hooks'
import { wsStatus } from '@/graphql/WebSocketLink'

export const useCurrentUser = () => {
  const { data, loading } = useCurrentUserQuery()
  const user = data?.user
  return [user, (loading || wsStatus.status !== 'connected') && !user]
}
