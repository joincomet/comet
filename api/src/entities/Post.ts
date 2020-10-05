import { Authorized, Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Comment } from '@/entities/Comment'
import { Lazy } from '@/Lazy'
import { User } from '@/entities/User'
import { PostUpvote } from '@/entities/relations/PostUpvote'
import { Community } from '@/entities/Community'
import { formatDistanceToNowStrict } from 'date-fns'
import { Save } from '@/entities/relations/Save'
import { PostHide } from '@/entities/relations/PostHide'

@ObjectType()
@Entity()
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number

  @Field()
  get id36(): string {
    return BigInt(this.id).toString(36)
  }

  @Field()
  @Column()
  title: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  textContent?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  link?: string

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  images?: string[]

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.posts)
  author: Lazy<User>

  @Field(() => ID)
  @Column({ nullable: true })
  authorId: number

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
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

  @Field()
  @Column({ default: false })
  sticky: boolean

  @Field()
  @Column({ default: false })
  postedToProfile: boolean

  @OneToMany(() => Comment, comment => comment.post)
  comments: Lazy<Comment[]>

  @Field()
  @Column({ default: 0 })
  commentCount: number

  @Field(() => Community, { nullable: true })
  @ManyToOne(() => Community, community => community.posts, {
    cascade: true,
    nullable: true
  })
  community?: Lazy<Community>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  communityId?: number

  @OneToMany(() => PostUpvote, vote => vote.post)
  upvotes: Lazy<PostUpvote[]>

  @Field()
  @Column({ default: 0 })
  upvoteCount: number

  @Field()
  upvoted: boolean

  @Authorized('ADMIN')
  @Field()
  @Column({ default: false })
  deleted: boolean

  @Authorized('ADMIN')
  @Field()
  @Column({ default: false })
  removed: boolean

  @Authorized('ADMIN')
  @Field()
  @Column({ nullable: true })
  removedReason?: string

  @OneToMany(() => Save, save => save.post)
  saves: Lazy<Save[]>

  @OneToMany(() => PostHide, hide => hide.post)
  hides: Lazy<PostHide[]>

  @Field()
  get relativeUrl(): string {
    const slug = this.title
      .toLowerCase()
      .trim()
      .split(' ')
      .slice(0, 9)
      .join('_')
      .replace(/[^a-z0-9_]+/gi, '')
      .replace(/[_](.)\1+/g, '$1')
    return `/+${(this.community as Community).name}/post/${this.id36}/${slug}`
  }
}
