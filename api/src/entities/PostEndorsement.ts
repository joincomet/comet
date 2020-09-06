import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Lazy } from '@/lazy'
import { User } from '@/entities/User'
import { Post } from '@/entities/Post'

@ObjectType()
@Entity()
export class PostEndorsement {
  @ManyToOne(() => User, (user) => user.posts)
  user: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn()
  userId: string

  @ManyToOne(() => Post, (post) => post.endorsements)
  post: Lazy<Post>

  @Field(() => ID)
  @PrimaryColumn()
  postId: string

  @Field()
  @Column()
  createdAt: Date

  @Field()
  @Column({ default: true })
  active: boolean
}
