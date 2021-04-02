import { useServerChannelsQuery } from '@/graphql/queries'
import { useRefetchServerChannelsSubscription } from '@/graphql/subscriptions/channel'

export const useServerChannels = serverId => {
  const [{ data }, refetch] = useServerChannelsQuery({ serverId })
  useRefetchServerChannelsSubscription(refetch)
  return data?.getServerChannels ?? []
}
