import { Field, ID, Int, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Lazy } from '@/Lazy'
import { Post } from '@/post/Post.Entity'
import { CommentRocket } from '@/comment/CommentRocket.Entity'
import { User } from '@/user/User.Entity'
import { Save } from '@/folder/Save.Entity'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

@ObjectType()
@Entity()
export class Comment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number

  @Field()
  get id36(): string {
    return BigInt(this.id).toString(36)
  }

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.comments)
  author: Lazy<User>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  authorId: number

  @OneToMany(() => Save, save => save.comment)
  saves: Lazy<Save[]>

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, post => post.comments)
  post: Lazy<Post>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  postId: number

  @Field()
  @Column('text')
  textContent: string

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field()
  get timeSince(): string {
    // @ts-ignore
    return dayjs(new Date(this.createdAt)).twitter()
  }

  @Field({ nullable: true })
  @Column({ nullable: true })
  editedAt?: Date

  @Field({ nullable: true })
  get timeSinceEdited(): string | null {
    if (!this.editedAt) return null
    // @ts-ignore
    return dayjs(new Date(this.editedAt)).twitter()
  }

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true, type: 'bigint' })
  parentCommentId: number

  @OneToMany(() => CommentRocket, upvote => upvote.comment)
  rockets: Lazy<CommentRocket[]>

  @Field(() => Int)
  @Column({ default: 1 })
  rocketCount: number

  @Field()
  rocketed: boolean

  @Column({ default: false })
  deleted: boolean

  @Column({ default: false })
  removed: boolean

  @Column({ nullable: true })
  removedReason?: string

  @Field({ nullable: true })
  level?: number
}
