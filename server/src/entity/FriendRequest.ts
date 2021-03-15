import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKeyType,
  Property
} from '@mikro-orm/core'
import { User } from '@/entity'
import { FriendRequestStatus } from '@/resolver/friend'

@Entity()
export class FriendRequest {
  @ManyToOne({
    entity: () => User,
    primary: true,
    inversedBy: 'outgoingFriendRequests'
  })
  fromUser: User

  @ManyToOne({
    entity: () => User,
    primary: true,
    inversedBy: 'incomingFriendRequests'
  })
  toUser: User;

  [PrimaryKeyType]: [string, string]

  @Enum({
    items: () => FriendRequestStatus,
    default: FriendRequestStatus.Pending
  })
  status: FriendRequestStatus

  @Property()
  createdAt: Date = new Date()
}
