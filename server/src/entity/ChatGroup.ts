import { ChatChannel, User, BaseEntity } from '@/entity'
import { Field, ObjectType } from 'type-graphql'
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  Property
} from '@mikro-orm/core'

@ObjectType({ implements: BaseEntity })
@Entity()
export class ChatGroup extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  owner: User

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
