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

  @Field(() => User)
  @ManyToOne(() => User)
  creator: User

  @Field()
  @Property({ default: false })
  deleted: boolean

  @Property({ nullable: true })
  updatedAt?: Date
}
