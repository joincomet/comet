import { registerEnumType } from 'type-graphql'

export enum FriendStatus {
  None = 'NONE',
  FriendRequestOutgoing = 'FRIEND_REQUEST_OUTGOING',
  FriendRequestIncoming = 'FRIEND_REQUEST_INCOMING',
  Friends = 'FRIENDS',
  Blocking = 'BLOCKING',
  Blocked = 'BLOCKED'
}

registerEnumType(FriendStatus, { name: 'FriendStatus' })
