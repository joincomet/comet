import { registerEnumType } from 'type-graphql'

export enum FriendStatus {
  None = 'None',
  FriendRequestOutgoing = 'FriendRequestOutgoing',
  FriendRequestIncoming = 'FriendRequestIncoming',
  Friends = 'Friends',
  Blocking = 'Blocking',
  Blocked = 'Blocked'
}

registerEnumType(FriendStatus, { name: 'FriendStatus' })
