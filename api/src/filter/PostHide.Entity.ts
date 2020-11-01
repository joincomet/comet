import { Field, ID, ObjectType } from 'type-graphql'
import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/user/User.Entity'
import { Post } from '@/post/Post.Entity'

@ObjectType()
@Entity()
export class PostHide {
  @ManyToOne(() => User, user => user.hiddenPosts)
  user: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  userId: number

  @ManyToOne(() => Post, post => post.hides)
  post: Lazy<Post>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  postId: number

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
}
