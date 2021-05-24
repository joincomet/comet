import { Field, ObjectType } from 'type-graphql'
import { FolderVisibility, Server, User } from '@/entity'
import { BaseEntity } from '@/entity/BaseEntity'
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core'
import { GraphQLNonNegativeInt } from 'graphql-scalars'

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

  @Field(() => Server, { nullable: true })
  @ManyToOne({ entity: () => Server, nullable: true })
  server?: Server

  @Property()
  isDeleted: boolean = false

  @Field(() => GraphQLNonNegativeInt)
  @Property({ unsigned: true })
  postCount: number = 0

  @Field(() => GraphQLNonNegativeInt)
  @Property()
  followerCount: number = 0

  @Field()
  isFollowing: boolean

  @Field()
  @Property()
  isCollaborative: boolean = false

  @Field(() => FolderVisibility)
  @Enum({ items: () => FolderVisibility })
  visibility: FolderVisibility = FolderVisibility.Public
}
