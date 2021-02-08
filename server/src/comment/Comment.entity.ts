import { Field, ID, Int, ObjectType } from 'type-graphql'
import { Post } from '@/post/Post.entity'
import { User } from '@/user/User.entity'
import {
  BigIntType,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property
} from '@mikro-orm/core'
import { BaseEntity } from '@/Base.entity'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Comment extends BaseEntity {
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  author: User

  @ManyToOne(() => Post)
  post: Post

  @Field()
  @Property()
  textContent: string

  @Field(() => ID, { nullable: true })
  @Property({ nullable: true, type: BigIntType })
  parentCommentId: string

  @ManyToMany(() => User)
  rocketers = new Collection<User>(this)

  @Field(() => Int)
  @Property({ default: 1 })
  rocketCount: number

  @Field()
  isRocketed: boolean

  @Field()
  @Property({ default: false })
  pinned: boolean

  @Field({ nullable: true })
  @Property({ nullable: true })
  pinRank?: number

  @Field({ nullable: true })
  @Property({ nullable: true })
  editedAt?: Date

  @Field()
  @Property({ default: false })
  deleted: boolean

  @Field()
  @Property({ default: false })
  removed: boolean

  @Field({ nullable: true })
  @Property({ nullable: true })
  removedReason?: string
}
