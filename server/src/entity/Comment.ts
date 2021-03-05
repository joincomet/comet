import { Field, ID, Int, ObjectType } from 'type-graphql'
import { Post } from '@/entity/Post'
import { User } from '@/entity/User'
import {
  BigIntType,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property
} from '@mikro-orm/core'
import { BaseEntity } from '@/entity/BaseEntity'

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
  text: string

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
