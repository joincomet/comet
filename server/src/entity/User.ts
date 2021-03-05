import { Authorized, Field, ObjectType } from 'type-graphql'
import {
  ArrayType,
  Collection,
  Entity,
  Formula,
  ManyToMany,
  OneToMany,
  Property,
  QueryOrder,
  Unique
} from '@mikro-orm/core'
import { Server, ChatGroup, Folder, BaseEntity } from '@/entity'

@ObjectType({ implements: BaseEntity })
@Entity()
export class User extends BaseEntity {
  @Field()
  @Property()
  name: string

  @Field()
  @Property()
  tag: string

  @Field()
  @Formula("name || '#' || tag")
  username: string

  @Authorized('USER')
  @Field()
  @Property()
  @Unique()
  email: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  lastLogin?: Date

  @Field()
  get isOnline(): boolean {
    if (!this.lastLogin) return false
    const timeout = 5 * 60 * 1000 // five minutes
    return new Date().getTime() - this.lastLogin.getTime() < timeout
  }

  @Property()
  passwordHash: string

  @Property({ default: false })
  deleted: boolean

  @Field()
  @Property({ default: false })
  admin: boolean

  @OneToMany(() => Folder, 'owner')
  folders = new Collection<Folder>(this)

  @Property({ type: ArrayType, default: [] })
  foldersSort: string[]

  @ManyToMany(() => Server, 'users')
  servers = new Collection<Server>(this)

  @Property({ type: ArrayType, default: [] })
  serversSort: string[]

  @ManyToMany(() => ChatGroup, group => group.users, {
    orderBy: { updatedAt: QueryOrder.DESC }
  })
  groups = new Collection<ChatGroup>(this)

  @Field()
  @Property({ default: false })
  banned: boolean

  @Field({ nullable: true })
  @Property({ nullable: true })
  banReason?: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  avatarUrl?: string

  @Field()
  isCurrentUser: boolean
}
