import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export const useUserRelationships = () => {
  const [user] = useCurrentUser()
  return {
    friends:
      user?.relationships
        .filter(r => r.status === 'Friends')
        .map(r => r.user) ?? [],
    blocking:
      user?.relationships
        .filter(r => r.status === 'Blocking')
        .map(r => r.user) ?? [],
    blockedBy:
      user?.relationships
        .filter(r => r.status === 'Blocked')
        .map(r => r.user) ?? [],
    outgoingFriendRequests:
      user?.relationships
        .filter(r => r.status === 'FriendRequestOutgoing')
        .map(r => r.user) ?? [],
    incomingFriendRequests:
      user?.relationships
        .filter(r => r.status === 'FriendRequestIncoming')
        .map(r => r.user) ?? []
  }
}
