import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Lazy } from '@/Lazy'
import { Post } from '@/entities/Post'
import { CommentUpvote } from '@/entities/CommentUpvote'
import { User } from '@/entities/User'
import { formatDistanceToNowStrict } from 'date-fns'

@ObjectType()
@Entity()
export class Comment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  get id36(): string {
    return this.id.toString(36)
  }

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.comments)
  author: Lazy<User>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  authorId: number

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, (post) => post.comments)
  post: Lazy<Post>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  postId: number

  @Field()
  @Column('text')
  textContent: string

  @Field()
  @Column()
  createdAt: Date

  @Field()
  get timeSince(): string {
    return formatDistanceToNowStrict(new Date(this.createdAt)) + ' ago'
  }

  @Field({ nullable: true })
  @Column({ nullable: true })
  editedAt?: Date

  @Field({ nullable: true })
  get editedTimeSince(): string | null {
    if (!this.editedAt) return null
    return formatDistanceToNowStrict(new Date(this.editedAt)) + ' ago'
  }

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  parentCommentId: number

  childComments: Comment[] = []

  @OneToMany(() => CommentUpvote, (upvote) => upvote.comment)
  upvotes: Lazy<CommentUpvote[]>

  @Field()
  @Column({ default: 0 })
  upvoteCount: number

  personalUpvoteCount: number

  @Field()
  upvoted: boolean

  @Column({ default: false })
  deleted: boolean

  @Column({ default: false })
  removed: boolean

  @Column({ nullable: true })
  removedReason?: string

  @Field({ nullable: true })
  level?: number
}
