import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Post } from '@/post/Post.Entity'
import { Lazy } from '@/Lazy'
import { Comment } from '@/comment/Comment.Entity'
import { User } from '@/user/User.Entity'

@ObjectType()
@Entity()
export class Notification {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number

  @Field()
  get id36(): string {
    return BigInt(this.id).toString(36)
  }

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  toUser: Lazy<User>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  toUserId: number

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  fromUser: Lazy<User>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  fromUserId: number

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post)
  post: Lazy<Post>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  postId: number

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment)
  comment: Lazy<Comment>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  commentId: number

  @Field()
  @Column({ default: false })
  read: boolean

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  parentCommentId: number
}
