import { registerEnumType } from 'type-graphql'

export enum FriendRequestStatus {
  Pending = 'PENDING',
  Accepted = 'ACCEPTED',
  Ignored = 'IGNORED',
  Revoked = 'REVOKED'
}

registerEnumType(FriendRequestStatus, { name: 'FriendRequestStatus' })
