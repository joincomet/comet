import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export const useUserRelationships = () => {
  const [user] = useCurrentUser()
  return {
    friends:
      user?.relatedUsers.filter(u => u.relationshipStatus === 'Friends') ?? [],
    blocking:
      user?.relatedUsers.filter(u => u.relationshipStatus === 'Blocking') ?? [],
    blockedBy:
      user?.relatedUsers.filter(u => u.relationshipStatus === 'Blocked') ?? [],
    outgoingFriendRequests:
      user?.relatedUsers.filter(
        u => u.relationshipStatus === 'FriendRequestOutgoing'
      ) ?? [],
    incomingFriendRequests:
      user?.relatedUsers.filter(
        u => u.relationshipStatus === 'FriendRequestIncoming'
      ) ?? []
  }
}
