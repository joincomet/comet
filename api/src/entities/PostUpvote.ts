import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/entities/User'
import { Post } from '@/entities/Post'

@ObjectType()
@Entity()
export class PostUpvote {
  @ManyToOne(() => User, user => user.posts)
  user: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn()
  userId: bigint

  @ManyToOne(() => Post, post => post.upvotes)
  post: Lazy<Post>

  @Field(() => ID)
  @PrimaryColumn()
  postId: bigint

  @Field()
  @Column()
  createdAt: Date

  @Field()
  @Column({ default: true })
  active: boolean
}
