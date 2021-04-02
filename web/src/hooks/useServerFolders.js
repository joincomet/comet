import { useServerFoldersQuery } from '@/graphql/queries'
import { useRefetchServerChannelsSubscription } from '@/graphql/subscriptions/channel'

export const useServerFolders = serverId => {
  const [{ data }, refetch] = useServerFoldersQuery(serverId)
  useRefetchServerChannelsSubscription(refetch)
  return data?.getServerFolders ?? []
}
