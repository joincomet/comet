import { Field, ID, Int, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId
} from 'typeorm'
import { Post } from '@/post/Post.Entity'
import { User } from '@/user/User.Entity'
import dayjs from 'dayjs'
import { Lazy } from '@/Lazy'

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

  @Field()
  get timeSinceFull(): string {
    // @ts-ignore
    return dayjs(new Date(this.createdAt)).format('dddd, MMMM D, YYYY h:mm A')
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

  @ManyToMany(() => User)
  @JoinTable()
  rocketers: Lazy<User[]>

  @RelationId((comment: Comment) => comment.rocketers)
  rocketerIds: number[]

  @Field(() => Int)
  @Column({ default: 1 })
  rocketCount: number

  @Field()
  isRocketed: boolean

  @Field()
  @Column({ default: false })
  deleted: boolean

  @Field()
  @Column({ default: false })
  removed: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  removedReason?: string

  @Field()
  @Column({ default: false })
  pinned: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  pinnedAt?: Date
}
