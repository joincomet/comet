import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKeyType,
  Property
} from '@mikro-orm/core'
import { BaseEntity, Post, User } from '@/entity'
import { Field } from 'type-graphql'
import { ServerCategory } from '@/resolver/server'
import { FriendRequestStatus } from '@/resolver/friend'

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
