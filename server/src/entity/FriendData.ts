import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKeyType,
  Property
} from '@mikro-orm/core'
import { User } from '@/entity'
import { FriendStatus } from '@/resolver/user'

@Entity()
export class FriendData {
  @ManyToOne({
    entity: () => User,
    primary: true,
    inversedBy: 'friendData'
  })
  user: User

  @ManyToOne({ entity: () => User, primary: true })
  friend: User;

  [PrimaryKeyType]: [string, string]

  @Property()
  createdAt: Date = new Date()

  @Property()
  showChat: boolean = false

  @Enum({
    items: () => FriendStatus
  })
  status: FriendStatus = FriendStatus.None

  @Property()
  lastViewAt: Date = new Date()

  @Property()
  lastMessageAt: Date = new Date()

  @Property()
  updatedAt: Date = new Date()

  @Property()
  unreadCount: number = 0
}
