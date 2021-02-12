import { Channel } from '@/chat/Channel.entity'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from '@/user/User.entity'
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  Property
} from '@mikro-orm/core'
import { BaseEntity } from '@/Base.entity'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Group extends BaseEntity {
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

  @OneToOne(() => Channel)
  channel: Channel

  @Field(() => [User])
  @ManyToMany(() => User, 'groups', { owner: true })
  users = new Collection<User>(this)
}
