import { Field, ID, Int, ObjectType } from 'type-graphql'
import { Post, User, BaseEntity } from '@/entity'
import {
  BigIntType,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property
} from '@mikro-orm/core'
import { CommentVote } from '@/entity/CommentVote'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Comment extends BaseEntity {
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  author: User

  @Field(() => Post)
  @ManyToOne(() => Post)
  post: Post

  @Field()
  @Property({ columnType: 'text' })
  text: string

  @Field(() => Comment, { nullable: true })
  @ManyToOne({ entity: () => Comment, nullable: true })
  parentComment?: Comment

  @Field(() => Int)
  @Property({ default: 0, unsigned: true })
  voteCount: number

  @Field()
  isVoted: boolean

  @OneToMany(() => CommentVote, 'comment')
  votes = new Collection<CommentVote>(this)

  @Field()
  @Property({ default: false })
  isPinned: boolean

  @Field({ nullable: true })
  @Property({ nullable: true })
  pinPosition?: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  editedAt?: Date

  @Field()
  @Property({ default: false })
  isDeleted: boolean

  @Field()
  @Property({ default: false })
  isRemoved: boolean

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  removedReason?: string
}
