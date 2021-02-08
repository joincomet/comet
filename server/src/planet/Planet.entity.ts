import { Field, Int, ObjectType } from 'type-graphql'
import { User } from '@/user/User.entity'
import { Post } from '@/post/Post.entity'
import { Galaxy } from '@/Galaxy'
import { ChatChannel } from '@/chat/ChatChannel.entity'
import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property
} from '@mikro-orm/core'
import { BaseEntity } from '@/Base.entity'
import { PlanetInvite } from '@/planet/PlanetInvite.entity'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Planet extends BaseEntity {
  @Field()
  @Property()
  name: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string

  @Field(() => User)
  @ManyToOne(() => User)
  owner: User

  @OneToMany(() => Post, 'planet')
  posts = new Collection<Post>(this)

  @Field(() => [User])
  @ManyToMany(() => User, 'planets', { owner: true })
  users = new Collection<User>(this)

  @Field(() => Galaxy)
  @Enum({ items: () => Galaxy, default: Galaxy.Uncategorized })
  galaxy: Galaxy

  @ManyToMany(() => User)
  bannedUsers = new Collection<User>(this)

  @Field(() => [User])
  @ManyToMany(() => User)
  moderators = new Collection<User>(this)

  @Field(() => Int)
  @Property()
  userCount: number = 0

  @Field({ nullable: true })
  @Property({ nullable: true })
  avatarUrl?: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  bannerUrl?: string

  @Field()
  @Property({ default: false })
  banned: boolean

  @Field({ nullable: true })
  @Property({ nullable: true })
  banReason?: string

  @Field(() => [ChatChannel])
  @OneToMany(() => ChatChannel, 'planet')
  channels = new Collection<ChatChannel>(this)

  @Field()
  @Property({ default: false })
  private: boolean

  @Field()
  @Property({ default: false })
  featured: boolean

  @Property({ nullable: true })
  featuredRank: number

  @OneToMany(() => PlanetInvite, 'planet')
  invites = new Collection<PlanetInvite>(this)
}
