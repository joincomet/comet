import { Field, Int, ObjectType } from 'type-graphql'
import { BaseEntity, Post, Server, ServerFolder, User } from '@/entity'
import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToOne,
  Property
} from '@mikro-orm/core'
import { FolderVisibility } from '@/resolver/folder'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Folder extends BaseEntity {
  @Field()
  @Property({ columnType: 'text' })
  name: string

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  description?: string

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  avatarUrl?: string

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  owner?: User

  @OneToOne(() => ServerFolder, 'folder', { nullable: true })
  serverFolder?: ServerFolder

  @Field(() => Server, { nullable: true })
  server?: Server

  @Property()
  isDeleted: boolean = false

  @Field()
  @Property()
  isCollaborative: boolean = false

  @Property({ nullable: true })
  updatedAt?: Date

  @Field(() => Int)
  @Property()
  postCount: number = 0

  @Field(() => Int)
  @Property()
  followerCount: number = 0

  @Field(() => FolderVisibility)
  @Enum({ items: () => FolderVisibility })
  visibility: FolderVisibility = FolderVisibility.Public
}
