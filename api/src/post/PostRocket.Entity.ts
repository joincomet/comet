import { Field, ID, Int, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/user/User.Entity'
import { Post } from '@/post/Post.Entity'

@ObjectType()
@Entity()
export class PostRocket {
  @ManyToOne(() => User, user => user.posts)
  user: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  userId: number

  @ManyToOne(() => Post, post => post.rockets)
  post: Lazy<Post>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  postId: number

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
