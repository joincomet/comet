import { useJoinedServersQuery } from '@/graphql/queries'
import { useRefetchJoinedServersSubscription } from '@/graphql/subscriptions'

export const useJoinedServers = () => {
  const [{ data }, refetch] = useJoinedServersQuery()
  useRefetchJoinedServersSubscription(refetch)
  return data?.getJoinedServers ?? []
}
