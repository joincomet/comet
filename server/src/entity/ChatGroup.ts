import { ChatChannel } from '@/entity/ChatChannel'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from '@/entity/User'
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  Property
} from '@mikro-orm/core'
import { BaseEntity } from '@/entity/BaseEntity'

@ObjectType({ implements: BaseEntity })
@Entity()
export class ChatGroup extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  creator: User

  @Field({ nullable: true })
  @Property({ nullable: true })
  name: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  avatarUrl: string

  @Field()
  @Property()
  updatedAt: Date = new Date()

  @OneToOne(() => ChatChannel)
  channel: ChatChannel

  @Field(() => [User])
  @ManyToMany(() => User, 'groups', { owner: true })
  users = new Collection<User>(this)
}
