import { Field, ID, Int, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { Comment } from '@/comment/Comment.Entity'
import { Lazy } from '@/Lazy'
import { User } from '@/user/User.Entity'

@ObjectType()
@Entity()
export class CommentRocket {
  @ManyToOne(() => User, user => user.posts)
  user: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  userId: number

  @ManyToOne(() => Comment, comment => comment.rockets)
  comment: Lazy<Comment>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  commentId: number

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @Field(() => Int)
  @Column({ default: 1 })
  value: -1 | 0 | 1
}
