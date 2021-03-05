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

  @ManyToMany(() => User, 'servers', { owner: true })
  users = new Collection<User>(this)

  @OneToMany(() => Folder, 'server')
  folders = new Collection<Folder>(this)

  @Property({ type: ArrayType, default: [] })
  foldersSort: string[]

  @Field(() => ServerCategory)
  @Enum({ items: () => ServerCategory, default: ServerCategory.Uncategorized })
  category: ServerCategory

  @ManyToMany(() => User)
  bannedUsers = new Collection<User>(this)

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

  @OneToMany(() => ChatChannel, 'server')
  channels = new Collection<ChatChannel>(this)

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

  @OneToMany(() => ServerInvite, 'server')
  invites = new Collection<ServerInvite>(this)
}
