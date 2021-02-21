import { Field, ObjectType } from 'type-graphql'
import { Post } from '@/post/Post.entity'
import { User } from '@/user/User.entity'
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property
} from '@mikro-orm/core'
import { BaseEntity } from '@/Base.entity'
import { Planet } from '@/planet/Planet.entity'

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

  @Field(() => Planet, { nullable: true })
  @ManyToOne(() => Planet, { nullable: true })
  planet?: Planet

  @Field()
  @Property({ default: false })
  deleted: boolean

  @Property({ nullable: true })
  updatedAt?: Date
}
