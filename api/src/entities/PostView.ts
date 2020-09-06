import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Lazy } from '@/lazy'
import { User } from '@/entities/User'
import { Post } from '@/entities/Post'

@ObjectType()
@Entity()
export class PostView {
  @ManyToOne(() => User, (user) => user.postViews)
  user: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn()
  userId: string

  @ManyToOne(() => Post, (post) => post.postViews)
  post: Lazy<Post>

  @Field(() => ID)
  @PrimaryColumn()
  postId: string

  @Field()
  @Column()
  lastCommentCount: number

  @Field()
  @Column()
  createdAt: Date
}
