import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKeyType,
  Property
} from '@mikro-orm/core'
import { RelationshipStatus, User } from '@/entity'

@Entity()
export class Relationship {
  @ManyToOne({
    entity: () => User,
    primary: true,
    inversedBy: 'relationships'
  })
  owner: User

  @ManyToOne({ entity: () => User, primary: true })
  user: User;

  [PrimaryKeyType]: [string, string]

  @Property()
  createdAt: Date = new Date()

  @Property()
  showChat: boolean = false

  @Enum({
    items: () => RelationshipStatus
  })
  status: RelationshipStatus = RelationshipStatus.None

  @Property()
  lastViewAt: Date = new Date()

  @Property()
  lastMessageAt: Date = new Date()

  @Property()
  updatedAt: Date = new Date()

  @Property()
  unreadCount: number = 0
}
