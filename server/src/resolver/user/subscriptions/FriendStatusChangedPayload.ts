import { FriendStatus } from '@/resolver/user'

export interface FriendStatusChangedPayload {
  userId: string
  friendId: string
  status: FriendStatus
}
