import { Authorized, Field, ObjectType } from 'type-graphql'
import {
  ArrayType,
  Collection,
  Embedded,
  Entity,
  Enum,
  Formula,
  ManyToMany,
  OneToMany,
  Property,
  QueryOrder
} from '@mikro-orm/core'
import { Planet } from '@/planet/Planet.entity'
import { Group } from '@/chat/Group.entity'
import { Folder } from '@/folder/Folder.entity'
import { BaseEntity } from '@/Base.entity'

@ObjectType({ implements: BaseEntity })
@Entity()
export class User extends BaseEntity {
  @Field()
  @Property()
  username: string

  @Field()
  @Property()
  tag: string

  @Field()
  @Formula("username || '#' || tag")
  name: string

  @Authorized('USER')
  @Field()
  @Property({ nullable: true })
  email?: string

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

  @Field(() => [Folder])
  @OneToMany(() => Folder, 'owner', { orderBy: { createdAt: QueryOrder.DESC } })
  folders = new Collection<Folder>(this)

  @Property({ type: ArrayType, default: [] })
  foldersSort: string[]

  @Field(() => [Planet])
  @ManyToMany(() => Planet, 'users')
  planets = new Collection<Planet>(this)

  @Property({ type: ArrayType, default: [] })
  planetsSort: string[]

  @Field(() => [Group])
  @ManyToMany(() => Group, group => group.users, {
    orderBy: { updatedAt: QueryOrder.DESC }
  })
  groups = new Collection<Group>(this)

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
