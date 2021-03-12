import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKeyType,
  Property
} from '@mikro-orm/core'
import { ChatChannel, User } from '@/entity'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export class DirectMessage {
  @Field(() => User)
  @ManyToOne({
    entity: () => User,
    primary: true
  })
  user1: User

  @Field(() => User)
  @ManyToOne({
    entity: () => User,
    primary: true
  })
  user2: User;

  [PrimaryKeyType]: [string, string]

  @Field(() => ChatChannel)
  @OneToOne(() => ChatChannel, 'directMessage')
  channel: ChatChannel

  @Field()
  @Property()
  createdAt: Date = new Date()

  @Field()
  @Property()
  updatedAt: Date = new Date()

  @Property({ default: false })
  isHiddenByUser1: boolean

  @Property({ default: false })
  isHiddenByUser2: boolean
}
