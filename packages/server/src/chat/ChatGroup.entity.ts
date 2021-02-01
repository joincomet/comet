import { ChatChannel } from '@/chat/ChatChannel.entity'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from '@/user/User.entity'
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property
} from '@mikro-orm/core'
import { NativeBigIntType } from '@/NativeBigIntType'
import { BaseEntity } from '@/Base.entity'

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
  @Property({ onCreate: () => new Date() })
  createdAt: Date

  @OneToOne(() => ChatChannel)
  channel: ChatChannel

  @ManyToMany(() => User, 'chatGroups', { owner: true })
  users = new Collection<User>(this)
}
