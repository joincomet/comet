import { Field, Int, ObjectType } from 'type-graphql'
import {
  Channel,
  Folder,
  Post,
  ServerCategory,
  ServerFolder,
  ServerInvite,
  User
} from '@/entity'
import { BaseEntity } from '@/entity/BaseEntity'
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
import { ServerUser } from '@/entity/server/ServerUser'
import { Role } from '@/entity/server/Role'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Server extends BaseEntity {
  @Field()
  @Property({ columnType: 'text' })
  name: string

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  description?: string

  @Field(() => User)
  @ManyToOne(() => User)
  owner: User

  @OneToMany(() => Post, 'server')
  posts = new Collection<Post>(this)

  @Field(() => [Role])
  @OneToMany(() => Role, 'server', {
    orderBy: { position: QueryOrder.ASC }
  })
  roles = new Collection<Role>(this)

  @Field(() => [Role])
  myRoles: Role[]

  @OneToMany(() => ServerUser, 'server', {
    orderBy: { position: QueryOrder.ASC }
  })
  userJoins = new Collection<ServerUser>(this)

  @OneToMany(() => ServerFolder, 'server', {
    orderBy: { position: QueryOrder.ASC }
  })
  serverFolders = new Collection<ServerFolder>(this)

  @Field(() => [Folder])
  folders: Folder[]

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

  @Field()
  @Property()
  isDeleted: boolean = false

  @Field()
  @Property()
  sendWelcomeMessage: boolean = true

  @Field(() => [Channel])
  @OneToMany(() => Channel, 'server', {
    orderBy: { position: QueryOrder.ASC }
  })
  channels = new Collection<Channel>(this)

  @Field(() => Channel)
  @OneToOne(() => Channel, undefined, { nullable: true })
  systemMessagesChannel?: Channel

  @Field()
  @Property()
  isPublic: boolean = false

  @Field()
  @Property()
  isFeatured: boolean = false

  @Property({ nullable: true, columnType: 'text' })
  featuredPosition?: string

  @OneToMany(() => ServerInvite, 'server')
  invites = new Collection<ServerInvite>(this)
}
