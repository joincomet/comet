import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  ChatChannel,
  Post,
  ServerFolder,
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
import { ServerUserBan } from '@/entity/ServerUserBan'
import { ServerUserJoin } from '@/entity/ServerUserJoin'
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

  @OneToMany(() => ServerUserJoin, 'server', {
    orderBy: { createdAt: QueryOrder.DESC }
  })
  userJoins = new Collection<ServerUserJoin>(this)

  @OneToMany(() => ServerFolder, 'server', {
    orderBy: { position: QueryOrder.ASC, createdAt: QueryOrder.DESC }
  })
  folders = new Collection<ServerFolder>(this)

  @Field(() => ServerCategory)
  @Enum({ items: () => ServerCategory, default: ServerCategory.Uncategorized })
  category: ServerCategory

  @OneToMany(() => ServerUserBan, 'server')
  userBans = new Collection<ServerUserBan>(this)

  @Field()
  @Property({ default: 0 })
  userCount: number

  @Field({ nullable: true })
  @Property({ nullable: true })
  avatarUrl?: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  bannerUrl?: string

  @Field()
  @Property({ default: false })
  isBanned: boolean

  @OneToMany(() => ChatChannel, 'server', {
    orderBy: { position: QueryOrder.ASC, createdAt: QueryOrder.DESC }
  })
  channels = new Collection<ChatChannel>(this)

  @Field()
  @Property({ default: false })
  isSearchable: boolean

  @Field()
  @Property({ default: false })
  isFeatured: boolean

  @Property({ default: Lexico.FIRST_POSITION })
  featuredPosition: string

  @OneToMany(() => ServerInvite, 'server')
  invites = new Collection<ServerInvite>(this)
}
