import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/entities/User'
import { Post } from '@/entities/Post'
import { Comment } from '@/entities/Comment'

@ObjectType()
@Entity()
export class Save {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number

  @ManyToOne(() => User, user => user.saves)
  user: Lazy<User>

  @Field(() => ID)
  @Column('bigint')
  userId: number

  @ManyToOne(() => Post, post => post.saves, { nullable: true })
  post: Lazy<Post>

  @Field(() => ID, { nullable: true })
  @Column('bigint', { nullable: true })
  postId: number

  @ManyToOne(() => Comment, comment => comment.saves, { nullable: true })
  comment: Lazy<Comment>

  @Field(() => ID, { nullable: true })
  @Column('bigint', { nullable: true })
  commentId: number

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field({ nullable: true })
  @Column({ nullable: true })
  folder?: string
}
