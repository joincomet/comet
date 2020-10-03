import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from '@/entities/Post'
import { Lazy } from '@/Lazy'
import { Comment } from '@/entities/Comment'
import { User } from '@/entities/User'

@ObjectType()
@Entity()
export class Notification {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: bigint

  @Field()
  get id36(): string {
    return this.id.toString(36)
  }

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  toUser: Lazy<User>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  toUserId: bigint

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  fromUser: Lazy<User>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  fromUserId: bigint

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post)
  post: Lazy<Post>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  postId: bigint

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment)
  comment: Lazy<Comment>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  commentId: bigint

  @Field()
  @Column({ default: false })
  read: boolean

  @Field()
  @Column()
  createdAt: Date

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  parentCommentId: bigint
}
