import { RelationshipStatus } from '@/entity'

export interface FriendStatusChangedPayload {
  userId: string
  friendId: string
  status: RelationshipStatus
}
