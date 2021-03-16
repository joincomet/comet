import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core'
import { BaseEntity, Post, User } from '@/entity'

@Entity()
export class DirectMessage {
  @ManyToOne({
    entity: () => User,
    primary: true,
    inversedBy: 'dms'
  })
  user: User

  @ManyToOne({ entity: () => User, primary: true })
  toUser: User;

  [PrimaryKeyType]: [string, string]

  @Property()
  createdAt: Date = new Date()

  @Property()
  updatedAt: Date = new Date()

  @Property({ default: false })
  isHidden: boolean = false
}
