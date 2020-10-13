import { Field, ID, ObjectType } from 'type-graphql'
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/entities/User'
import { Post } from '@/entities/Post'

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
}
