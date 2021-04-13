import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKeyType,
  Property
} from '@mikro-orm/core'
import { RelationshipStatus, User } from '@/entity'
import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export class Relationship {
  @ManyToOne({
    entity: () => User,
    primary: true,
    inversedBy: 'relationships'
  })
  owner: User

  @Field(() => User)
  @ManyToOne({ entity: () => User, primary: true })
  user: User;

  [PrimaryKeyType]: [string, string]

  @Property()
  createdAt: Date = new Date()

  @Field()
  @Property()
  showChat: boolean = false

  @Field(() => RelationshipStatus)
  @Enum({
    items: () => RelationshipStatus
  })
  status: RelationshipStatus = RelationshipStatus.None

  @Property()
  lastViewAt: Date = new Date()

  @Field()
  @Property()
  lastMessageAt: Date = new Date()

  @Field()
  @Property()
  updatedAt: Date = new Date()

  @Field(() => Int)
  @Property()
  unreadCount: number = 0
}
