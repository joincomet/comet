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
import { NativeBigIntType } from '@/NativeBigIntType'
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

  @Field({ nullable: true })
  @Property({ nullable: true })
  customName?: string

  @Field(() => User, { nullable: true })
  @ManyToOne({ entity: () => User, nullable: true })
  creator?: User

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
  @ManyToMany(() => User, 'moderatedPlanets', { owner: true })
  moderators = new Collection<User>(this)

  @Field()
  isJoined: boolean

  @Field(() => Int)
  @Property({ type: NativeBigIntType })
  userCount: bigint = 1n

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
