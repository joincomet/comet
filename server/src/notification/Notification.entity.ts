import { Field, ObjectType } from 'type-graphql'
import { Post } from '@/post/Post.entity'
import { Comment } from '@/comment/Comment.Entity'
import { User } from '@/user/User.entity'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity } from '@/Base.entity'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Notification extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  toUser: User

  @Field(() => User)
  @ManyToOne(() => User)
  fromUser: User

  @Field(() => Post)
  @ManyToOne(() => Post)
  post: Post

  @Field(() => Comment)
  @ManyToOne(() => Comment)
  comment: Comment

  @Field()
  @Property({ default: false })
  read: boolean

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment)
  parentComment: Comment
}
