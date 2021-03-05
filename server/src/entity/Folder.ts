import { Field, ObjectType } from 'type-graphql'
import { Post } from '@/entity/Post'
import { User } from '@/entity/User'
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property
} from '@mikro-orm/core'
import { BaseEntity } from '@/entity/BaseEntity'
import { Server } from '@/entity/Server'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Folder extends BaseEntity {
  @Field()
  @Property()
  name: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  avatarUrl?: string

  @Field(() => [Post])
  @ManyToMany(() => Post, 'folders', { owner: true })
  posts = new Collection<Post>(this)

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  owner?: User

  @Field(() => Server, { nullable: true })
  @ManyToOne(() => Server, { nullable: true })
  server?: Server

  @Field()
  @Property({ default: false })
  deleted: boolean

  @Property({ nullable: true })
  updatedAt?: Date
}
