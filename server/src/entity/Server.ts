import { Field, Int, ObjectType } from 'type-graphql'
import {
  User,
  Post,
  ChatChannel,
  BaseEntity,
  ServerInvite,
  Folder
} from '@/entity'
import { ServerCategory } from '@/resolver/server'
import {
  ArrayType,
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property
} from '@mikro-orm/core'
import { UserBanServer } from '@/entity/UserBanServer'
import { UserJoinServer } from '@/entity/UserJoinServer'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Server extends BaseEntity {
  @Field()
  @Property()
  name: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string

  @ManyToOne(() => User)
  owner: User

  @OneToMany(() => Post, 'server')
  posts = new Collection<Post>(this)

  @OneToMany(() => UserJoinServer, 'server')
  userJoins = new Collection<UserJoinServer>(this)

  @OneToMany(() => Folder, 'server')
  folders = new Collection<Folder>(this)

  @Field(() => ServerCategory)
  @Enum({ items: () => ServerCategory, default: ServerCategory.Uncategorized })
  category: ServerCategory

  @OneToMany(() => UserBanServer, 'server')
  bans = new Collection<UserBanServer>(this)

  @Field()
  @Property({ default: 0 })
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

  @OneToMany(() => ChatChannel, 'server')
  channels = new Collection<ChatChannel>(this)

  @Field()
  @Property({ default: false })
  searchable: boolean

  @Field()
  @Property({ default: false })
  featured: boolean

  @Property({ nullable: true })
  featuredRank: number

  @OneToMany(() => ServerInvite, 'server')
  invites = new Collection<ServerInvite>(this)
}
