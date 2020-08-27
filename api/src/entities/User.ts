import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Comment } from './Comment'
import { Lazy } from '../lazy'
import { Post } from './Post'
import { PostEndorsement } from './PostEndorsement'
import { CommentEndorsement } from './CommentEndorsement'
import { PostView } from './PostView'
import { Planet } from './Planet'

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @Column()
  username: string

  @Column({ nullable: true })
  email?: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  bio?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  profilePicUrl?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  bannerImageUrl?: string

  @Field()
  @Column()
  createdAt: Date

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastLogin?: Date

  @Column()
  passwordHash: string

  @Field()
  @Column({ default: false })
  admin: boolean

  @Column({ default: false })
  banned: boolean

  @Column({ nullable: true })
  banReason?: string

  @Column('text', { array: true, default: {} })
  ipAddresses: string[]

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Lazy<Comment[]>

  @OneToMany(() => Post, (post) => post.author)
  posts: Lazy<Post[]>

  @Field(() => [Planet])
  @ManyToMany(() => Planet, (planet) => planet.users)
  planets: Lazy<Planet[]>

  @Field(() => [Planet])
  @ManyToMany(() => Planet, (planet) => planet.moderators)
  moderatedPlanets: Lazy<Planet[]>

  @ManyToMany(() => Planet)
  @JoinTable()
  mutedPlanets: Lazy<Planet[]>

  @ManyToMany(() => Post)
  @JoinTable()
  savedPosts: Lazy<Post[]>

  @ManyToMany(() => Comment)
  @JoinTable()
  savedComments: Lazy<Comment[]>

  @ManyToMany(() => Post)
  @JoinTable()
  hiddenPosts: Lazy<Post[]>

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable()
  followers: Lazy<User[]>

  @ManyToMany(() => User, (user) => user.followers)
  following: Lazy<User[]>

  @ManyToMany(() => User, (user) => user.blockedUsers)
  @JoinTable()
  blockedBy: Lazy<User[]>

  @ManyToMany(() => User, (user) => user.blockedBy)
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
  commentCount: number

  @Field()
  postCount: number

  @OneToMany(() => PostEndorsement, (endorsement) => endorsement.user)
  postEndorsements: Lazy<PostEndorsement[]>

  @OneToMany(() => CommentEndorsement, (endorsement) => endorsement.user)
  commentEndorsements: Lazy<CommentEndorsement[]>

  @Field()
  @Column({ default: 0 })
  endorsementCount: number

  @Column({ nullable: true })
  lastPostedAt?: Date

  @Column({ nullable: true })
  lastUploadedImageAt?: Date

  @Column({ nullable: true })
  lastCommentedAt?: Date

  @Field({ nullable: true })
  @Column({ nullable: true })
  tag?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  tagColor?: string

  @OneToMany(() => PostView, (postView) => postView.user)
  postViews: Lazy<PostView[]>

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
  @Column({ default: false })
  appearOffline: boolean

  @Field()
  @Column({ default: 0 })
  xp: number

  @Field()
  level: number
}
