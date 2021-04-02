import { useUserRelationshipsQuery } from '@/graphql/queries'
import { useRefetchUserRelationshipsSubscription } from '@/graphql/subscriptions'

export const useUserRelationships = () => {
  const [{ data }, refetch] = useUserRelationshipsQuery()
  const res = data?.getUserRelationships
  useRefetchUserRelationshipsSubscription(refetch)
  return {
    friends: res?.friends ?? [],
    outgoingFriendRequests: res?.outgoingFriendRequests ?? [],
    incomingFriendRequests: res?.incomingFriendRequests ?? [],
    blockingUsers: res?.blockingUsers ?? [],
    blockedByUsers: res?.blockedByUsers ?? []
  }
}
