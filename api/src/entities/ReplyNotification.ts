import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from './Post'
import { Lazy } from '../lazy'
import { Comment } from './Comment'
import { User } from './User'

@ObjectType()
@Entity()
export class ReplyNotification {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  toUser: Lazy<User>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  toUserId: string

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  fromUser: Lazy<User>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  fromUserId: string

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post)
  post: Lazy<Post>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  postId: string

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment)
  comment: Lazy<Comment>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  commentId: string

  @Field()
  @Column({ default: false })
  read: boolean

  @Field()
  @Column()
  createdAt: Date

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  parentCommentId: string
}
