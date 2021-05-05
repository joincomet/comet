import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { RelationshipStatus } from '@/graphql/hooks'

export const useUserRelationships = () => {
  const [user] = useCurrentUser()
  return {
    friends:
      user?.relatedUsers.filter(
        u => u.relationshipStatus === RelationshipStatus.Friends
      ) ?? [],
    blocking:
      user?.relatedUsers.filter(
        u => u.relationshipStatus === RelationshipStatus.Blocking
      ) ?? [],
    blockedBy:
      user?.relatedUsers.filter(
        u => u.relationshipStatus === RelationshipStatus.Blocked
      ) ?? [],
    outgoingFriendRequests:
      user?.relatedUsers.filter(
        u => u.relationshipStatus === RelationshipStatus.FriendRequestOutgoing
      ) ?? [],
    incomingFriendRequests:
      user?.relatedUsers.filter(
        u => u.relationshipStatus === RelationshipStatus.FriendRequestIncoming
      ) ?? []
  }
}
