import { ChatChannel, User, BaseEntity, ChatMessage } from '@/entity'
import { Field, ObjectType } from 'type-graphql'
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property
} from '@mikro-orm/core'

@ObjectType({ implements: BaseEntity })
@Entity()
export class ChatGroup extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  owner: User

  @Field()
  @Property()
  name: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  avatarUrl: string

  @Field()
  @Property()
  updatedAt: Date = new Date()

  @Field(() => [User])
  @ManyToMany(() => User, 'groups', { owner: true })
  users = new Collection<User>(this)

  @OneToMany(() => ChatMessage, 'group')
  messages = new Collection<ChatMessage>(this)
}
