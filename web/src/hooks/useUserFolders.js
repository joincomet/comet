import { useUserFoldersQuery } from '@/graphql/queries'
import { useRefetchUserFoldersSubscription } from '@/graphql/subscriptions/folder'

export const useUserFolders = () => {
  const [{ data }, refetch] = useUserFoldersQuery()
  useRefetchUserFoldersSubscription(refetch)
  return data?.getUserFolders ?? []
}
