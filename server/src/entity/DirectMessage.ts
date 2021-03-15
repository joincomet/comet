import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKeyType,
  Property
} from '@mikro-orm/core'
import { Channel, Message, User } from '@/entity'
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

  @OneToMany(() => Message, 'directMessage')
  messages = new Collection<Message>(this)

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
