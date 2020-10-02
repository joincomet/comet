import { Authorized, Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Comment } from '@/entities/Comment'
import { Lazy } from '@/Lazy'
import { Post } from '@/entities/Post'
import { PostUpvote } from '@/entities/PostUpvote'
import { CommentUpvote } from '@/entities/CommentUpvote'
import { Community } from '@/entities/Community'
import { formatDistanceToNowStrict } from 'date-fns'
import { UserProfile } from '@/types/UserProfile'
import { UserSettings } from '@/types/UserSettings'

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  get id36(): string {
    return this.id.toString(36)
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
  @Column()
  createdAt: Date

  @Authorized()
  @Field({ nullable: true })
  @Column({ nullable: true })
  lastLogin?: Date

  @Field()
  online: boolean

  @Column()
  passwordHash: string

  @Authorized('ADMIN')
  @Field()
  @Column({ default: false })
  admin: boolean

  @Authorized()
  @Field()
  @Column({ default: false })
  banned: boolean

  @Authorized()
  @Field()
  @Column({ nullable: true })
  banReason?: string

  @OneToMany(() => Comment, comment => comment.author)
  comments: Lazy<Comment[]>

  @OneToMany(() => Post, post => post.author)
  posts: Lazy<Post[]>

  @Field(() => [Community])
  @ManyToMany(() => Community, community => community.users)
  communities: Lazy<Community[]>

  @Field(() => [Community])
  @ManyToMany(() => Community, community => community.moderators)
  moderatedCommunities: Lazy<Community[]>

  @ManyToMany(() => Community)
  @JoinTable()
  mutedCommunities: Lazy<Community[]>

  @ManyToMany(() => Post)
  @JoinTable()
  savedPosts: Lazy<Post[]>

  @ManyToMany(() => Comment)
  @JoinTable()
  savedComments: Lazy<Comment[]>

  @ManyToMany(() => Post)
  @JoinTable()
  hiddenPosts: Lazy<Post[]>

  @ManyToMany(() => User, user => user.following)
  @JoinTable()
  followers: Lazy<User[]>

  @ManyToMany(() => User, user => user.followers)
  following: Lazy<User[]>

  @ManyToMany(() => User, user => user.blockedUsers)
  @JoinTable()
  blockedBy: Lazy<User[]>

  @ManyToMany(() => User, user => user.blockedBy)
  blockedUsers: Lazy<User[]>

  /**
   * Current user is following this user
   */
  @Field()
  isFollowing: boolean

  @Field()
  isCurrentUser: boolean

  @Field()
  followerCount: number

  @Field()
  followingCount: number

  @Field()
  commentCount: number

  @Field()
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
  isBlocked: boolean

  /**
   * Current user is blocking this user
   */
  @Field()
  isBlocking: boolean

  @Field()
  get timeSinceCreated(): string {
    return formatDistanceToNowStrict(new Date(this.createdAt)) + ' ago'
  }
}
