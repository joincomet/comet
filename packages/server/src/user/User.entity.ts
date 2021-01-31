import { Authorized, Field, ObjectType } from 'type-graphql'
import {
  Property,
  Entity,
  OneToMany,
  ManyToMany,
  Collection,
  Formula
} from '@mikro-orm/core'
import { Planet } from '@/planet/Planet.entity'
import { ChatGroup } from '@/chat/ChatGroup.entity'
import { Folder } from '@/folder/Folder.entity'
import { BaseEntity } from '@/Base.entity'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @Property()
  username: string

  @Field()
  @Property({ default: '0001' })
  tag: string

  @Field()
  @Formula('concat(username, #, tag)')
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

  @OneToMany(() => Folder, 'creator')
  folders = new Collection<Folder>(this)

  @ManyToMany(() => Planet, 'users')
  joinedPlanets = new Collection<Planet>(this)

  @ManyToMany(() => ChatGroup, group => group.users)
  chatGroups = new Collection<ChatGroup>(this)

  @Field(() => [Planet])
  @ManyToMany(() => Planet, 'moderators')
  moderatedPlanets = new Collection<Planet>(this)

  @Field()
  @Property({ default: false })
  banned: boolean

  @Field({ nullable: true })
  @Property({ nullable: true })
  banReason?: string

  @Field()
  isCurrentUser: boolean

  @Field({ nullable: true })
  @Property({ nullable: true })
  avatarUrl?: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  bannerUrl?: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  bio?: string
}
