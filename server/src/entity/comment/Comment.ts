import { Field, Int, ObjectType } from 'type-graphql'
import { LinkMetadata, Post, ServerUser, User } from '@/entity'
import {
  Collection,
  Embedded,
  Entity,
  ManyToOne,
  OneToMany,
  Property
} from '@mikro-orm/core'
import { CommentVote } from '@/entity/comment/CommentVote'
import { BaseEntity } from '@/entity/BaseEntity'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Comment extends BaseEntity {
  @Field(() => ServerUser, { nullable: true })
  @ManyToOne(() => ServerUser)
  author?: ServerUser

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
  @Property({ unsigned: true })
  voteCount: number = 0

  @Field()
  isVoted: boolean

  @OneToMany(() => CommentVote, 'comment')
  votes = new Collection<CommentVote>(this)

  @Field()
  @Property()
  isPinned: boolean = false

  @Field({ nullable: true })
  @Property({ nullable: true })
  pinnedAt?: Date

  @Field({ nullable: true })
  @Property({ nullable: true })
  updatedAt?: Date

  @Field()
  @Property()
  isDeleted: boolean = false

  @Field(() => [LinkMetadata])
  @Embedded(() => LinkMetadata, { object: true, array: true })
  linkMetadatas: LinkMetadata[] = []
}
