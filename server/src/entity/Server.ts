import { Field, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Channel,
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
  OneToOne,
  Property,
  QueryOrder
} from '@mikro-orm/core'
import { ServerUser } from '@/entity/ServerUser'
import { ServerRole } from '@/entity/ServerRole'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Server extends BaseEntity {
  @Field()
  @Property({ columnType: 'text' })
  name: string

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  description?: string

  @ManyToOne(() => User)
  owner: User

  @OneToMany(() => Post, 'server')
  posts = new Collection<Post>(this)

  @OneToMany(() => ServerRole, 'server', {
    orderBy: { position: QueryOrder.ASC, createdAt: QueryOrder.DESC }
  })
  roles = new Collection<ServerRole>(this)

  @OneToMany(() => ServerUser, 'server', {
    orderBy: { createdAt: QueryOrder.DESC }
  })
  userJoins = new Collection<ServerUser>(this)

  @OneToMany(() => ServerFolder, 'server', {
    orderBy: { position: QueryOrder.ASC, createdAt: QueryOrder.DESC }
  })
  folders = new Collection<ServerFolder>(this)

  @Field(() => ServerCategory)
  @Enum({ items: () => ServerCategory })
  category: ServerCategory = ServerCategory.Other

  @Field(() => Int)
  @Property({ unsigned: true })
  userCount: number = 0

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  avatarUrl?: string

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  bannerUrl?: string

  @Field()
  @Property()
  isBanned: boolean = false

  @Field(() => [Channel])
  @OneToMany(() => Channel, 'server', {
    orderBy: { position: QueryOrder.ASC }
  })
  channels = new Collection<Channel>(this)

  @OneToOne(() => Channel, undefined, { nullable: true })
  systemMessagesChannel?: Channel

  @Field()
  @Property()
  isPublic: boolean = false

  @Field()
  @Property()
  isPostsEnabled: boolean = true

  @Field()
  @Property()
  isChatEnabled: boolean = true

  @Field()
  @Property()
  isFeatured: boolean = false

  @Property({ nullable: true, columnType: 'text' })
  featuredPosition?: string

  @OneToMany(() => ServerInvite, 'server')
  invites = new Collection<ServerInvite>(this)
}
