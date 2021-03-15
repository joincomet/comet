import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core'
import { User } from '@/entity'

@Entity()
export class FriendRelationship {
  @ManyToOne({
    entity: () => User,
    primary: true
  })
  user1: User

  @ManyToOne({
    entity: () => User,
    primary: true
  })
  user2: User;

  [PrimaryKeyType]: [string, string]

  @Property()
  createdAt: Date = new Date()
}
