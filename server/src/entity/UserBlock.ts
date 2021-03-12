import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core'
import { BaseEntity, Post, User } from '@/entity'

@Entity()
export class UserBlock {
  @ManyToOne({
    entity: () => User,
    primary: true,
    inversedBy: 'outgoingBlocks'
  })
  user: User

  @ManyToOne({
    entity: () => User,
    primary: true,
    inversedBy: 'incomingBlocks'
  })
  blockedUser: User;

  [PrimaryKeyType]: [string, string]

  @Property({ default: true })
  isActive: boolean

  @Property()
  createdAt: Date = new Date()
}
