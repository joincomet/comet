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
import { Post } from '@/entities/Post'
import { PostUpvote } from '@/entities/relations/PostUpvote'
import { CommentUpvote } from '@/entities/relations/CommentUpvote'
import { formatDistanceToNowStrict } from 'date-fns'
import { UserProfile } from '@/types/user/UserProfile'
import { UserSettings } from '@/types/user/UserSettings'
import { CommunityUser } from '@/entities/relations/CommunityUser'
import { CommunityModerator } from '@/entities/relations/CommunityModerator'
import { CommunityMute } from '@/entities/relations/CommunityMute'
import { Save } from '@/entities/relations/Save'
import { UserBlock } from '@/entities/relations/UserBlock'
import { UserFollow } from '@/entities/relations/UserFollow'
import { PostHide } from '@/entities/relations/PostHide'
import { Ban } from '@/entities/moderation/Ban'
import { AllowedPoster } from '@/entities/relations/AllowedPoster'

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number

  @Field()
  get id36(): string {
    return BigInt(this.id).toString(36)
  }

  @Field()
  @Column()
  username: string

  @Authorized('USER')
  @Field()
  @Column({ nullable: true })
  email?: string

  @Authorized('USER')
  @Field()
  @Column('jsonb', {
    default: new UserSettings(),
    transformer: {
      to: value => value,
      from: value => {
        try {
          return JSON.parse(value) as UserSettings
        } catch {
          return value
        }
      }
    }
  })
  settings: UserSettings

  @Field()
  @Column('jsonb', {
    default: new UserProfile(),
    transformer: {
      to: value => value,
      from: value => {
        try {
          return JSON.parse(value) as UserProfile
        } catch {
          return value
        }
      }
    }
  })
  profile: UserProfile

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Authorized()
  @Field({ nullable: true })
  @Column({ nullable: true })
  lastLogin?: Date

  @Field()
  online: boolean

  @Column()
  passwordHash: string

  @Column({ default: false })
  deleted: boolean

  @Authorized('ADMIN')
  @Field()
  @Column({ default: false })
  admin: boolean

  @OneToMany(() => Comment, comment => comment.author)
  comments: Lazy<Comment[]>

  @OneToMany(() => Post, post => post.author)
  posts: Lazy<Post[]>

  @OneToMany(() => CommunityUser, community => community.user)
  communities: Lazy<CommunityUser[]>

  @OneToMany(() => CommunityModerator, moderator => moderator.user)
  moderatedCommunities: Lazy<CommunityModerator[]>

  @OneToMany(() => AllowedPoster, a => a.user)
  allowedCommunities: Lazy<AllowedPoster[]>

  @OneToMany(() => Ban, ban => ban.user)
  bans: Lazy<Ban[]>

  @OneToMany(() => CommunityMute, mute => mute.user)
  mutedCommunities: Lazy<CommunityMute[]>

  @OneToMany(() => Save, post => post.user)
  saves: Lazy<Save[]>

  @OneToMany(() => PostHide, hide => hide.user)
  hiddenPosts: Lazy<PostHide[]>

  @ManyToOne(() => UserBlock, block => block.from)
  blockTo: Lazy<UserBlock[]>

  @ManyToOne(() => UserBlock, block => block.to)
  blockFrom: Lazy<UserBlock[]>

  @ManyToOne(() => UserFollow, follow => follow.from)
  followTo: Lazy<UserFollow[]>

  @ManyToOne(() => UserFollow, follow => follow.to)
  followFrom: Lazy<UserFollow[]>

  @Field()
  following: boolean

  @Field()
  followed: boolean

  @Field()
  isCurrentUser: boolean

  @Field()
  followerCount: number

  @Field()
  followingCount: number

  @Field()
  @Column({ default: 0 })
  commentCount: number

  @Field()
  @Column({ default: 0 })
  postCount: number

  @OneToMany(() => PostUpvote, upvote => upvote.user)
  postUpvotes: Lazy<PostUpvote[]>

  @OneToMany(() => CommentUpvote, upvote => upvote.user)
  commentUpvotes: Lazy<CommentUpvote[]>

  @Field()
  @Column({ default: 0 })
  upvoteCount: number

  /**
   * Current user is blocked by this user
   */
  @Field()
  blocked: boolean

  /**
   * Current user is blocking this user
   */
  @Field()
  blocking: boolean

  @Field()
  get timeSinceCreated(): string {
    return formatDistanceToNowStrict(new Date(this.createdAt)) + ' ago'
  }
}
