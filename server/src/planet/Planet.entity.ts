import { Field, Int, ObjectType } from 'type-graphql'
import { User } from '@/user/User.entity'
import { Post } from '@/post/Post.entity'
import { Galaxy } from '@/Galaxy'
import { Channel } from '@/chat/Channel.entity'
import {
  ArrayType,
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
  QueryOrder
} from '@mikro-orm/core'
import { BaseEntity } from '@/Base.entity'
import { PlanetInvite } from '@/planet/PlanetInvite.entity'
import { Folder } from '@/folder/Folder.entity'

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

  @ManyToMany(() => User, 'planets', { owner: true })
  users = new Collection<User>(this)

  @Field(() => [Folder])
  @OneToMany(() => Folder, 'planet', { orderBy: { createdAt: QueryOrder.ASC } })
  folders = new Collection<Folder>(this)

  @Property({ type: ArrayType, default: [] })
  foldersSort: string[]

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

  @Field(() => [Channel])
  @OneToMany(() => Channel, 'planet', {
    orderBy: { createdAt: QueryOrder.ASC }
  })
  channels = new Collection<Channel>(this)

  @Property({ type: ArrayType, default: [] })
  channelsSort: string[]

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
