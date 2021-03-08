import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  ChatChannel,
  Folder,
  Post,
  ServerInvite,
  User
} from '@/entity'
import { ServerCategory } from '@/resolver/server'
import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
  QueryOrder
} from '@mikro-orm/core'
import { UserBanServer } from '@/entity/UserBanServer'
import { UserJoinServer } from '@/entity/UserJoinServer'
import { ServerRole } from '@/entity/ServerRole'
import { Lexico } from '@/util/Lexico'

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

  @OneToMany(() => ServerRole, 'server', {
    orderBy: { position: QueryOrder.ASC, createdAt: QueryOrder.DESC }
  })
  roles = new Collection<ServerRole>(this)

  @OneToMany(() => UserJoinServer, 'server', {
    orderBy: { createdAt: QueryOrder.DESC }
  })
  userJoins = new Collection<UserJoinServer>(this)

  @OneToMany(() => Folder, 'server', {
    orderBy: { position: QueryOrder.ASC, createdAt: QueryOrder.DESC }
  })
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

  @OneToMany(() => ChatChannel, 'server', {
    orderBy: { position: QueryOrder.ASC, createdAt: QueryOrder.DESC }
  })
  channels = new Collection<ChatChannel>(this)

  @Field()
  @Property({ default: false })
  searchable: boolean

  @Field()
  @Property({ default: false })
  featured: boolean

  @Property({ default: Lexico.FIRST_POSITION })
  featuredPosition: string

  @OneToMany(() => ServerInvite, 'server')
  invites = new Collection<ServerInvite>(this)
}
