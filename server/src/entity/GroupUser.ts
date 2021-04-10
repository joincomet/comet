import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core'
import { Group, User } from '@/entity'

@Entity()
export class GroupUser {
  @ManyToOne({ entity: () => User, primary: true })
  user: User

  @ManyToOne({ entity: () => Group, primary: true })
  group: Group;

  [PrimaryKeyType]: [string, string]

  @Property()
  lastViewAt: Date = new Date()

  @Property()
  unreadCount: number = 0
}
