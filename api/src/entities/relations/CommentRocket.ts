import { Field, ID, ObjectType } from 'type-graphql'
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { Comment } from '@/entities/Comment'
import { Lazy } from '@/Lazy'
import { User } from '@/entities/User'

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
}
