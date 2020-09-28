import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Comment } from '@/entities/Comment'
import { Lazy } from '@/Lazy'
import { User } from '@/entities/User'

@ObjectType()
@Entity()
export class CommentUpvote {
  @ManyToOne(() => User, (user) => user.posts)
  user: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn()
  userId: number

  @ManyToOne(() => Comment, (comment) => comment.upvotes)
  comment: Lazy<Comment>

  @Field(() => ID)
  @PrimaryColumn()
  commentId: number

  @Field()
  @Column()
  createdAt: Date

  @Field()
  @Column({ default: true })
  active: boolean
}
