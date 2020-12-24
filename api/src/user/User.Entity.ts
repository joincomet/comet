import { Authorized, Field, ID, Int, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Comment } from '@/comment/Comment.Entity'
import { Post } from '@/post/Post.Entity'
import dayjs from 'dayjs'
import { Planet } from '@/planet/Planet.Entity'

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

  @Field(() => String)
  get name() {
    if (this.realName) return this.realName
    return this.username
  }

  @Authorized('USER')
  @Field()
  @Column({ nullable: true })
  email?: string

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Authorized()
  @Field({ nullable: true })
  @Column({ nullable: true })
  lastLogin?: Date

  @Field()
  isOnline: boolean

  @Column()
  passwordHash: string

  @Column({ default: false })
  deleted: boolean

  @Field()
  @Column({ default: false })
  admin: boolean

  @OneToMany(() => Comment, comment => comment.author)
  comments: Promise<Comment[]>

  @OneToMany(() => Post, post => post.author)
  posts: Promise<Post[]>

  @ManyToMany(() => Planet, planet => planet.users)
  joinedPlanets: Promise<Planet[]>

  @Field(() => [Planet])
  @ManyToMany(() => Planet, planet => planet.moderators)
  moderatedPlanets: Promise<Planet[]>

  @ManyToMany(() => Planet)
  @JoinTable()
  mutedPlanets: Promise<Planet[]>

  @ManyToMany(() => Post)
  @JoinTable()
  hiddenPosts: Promise<Post[]>

  @ManyToMany(() => User, user => user.blocking)
  blockers: Promise<User[]>

  @ManyToMany(() => User, user => user.blockers)
  @JoinTable()
  blocking: Promise<User[]>

  @ManyToMany(() => User, user => user.following)
  followers: Promise<User[]>

  @ManyToMany(() => User, user => user.followers)
  @JoinTable()
  following: Promise<User[]>

  @Field()
  @Column({ default: false })
  banned: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  banReason?: string

  @Field()
  isFollowing: boolean

  @Field()
  isFollowed: boolean

  @Field()
  isCurrentUser: boolean

  @Field(() => Int)
  @Column('bigint', { default: 0 })
  followerCount: number

  @Field(() => Int)
  @Column('bigint', { default: 0 })
  followingCount: number

  @Field(() => Int)
  @Column({ default: 0 })
  commentCount: number

  @Field(() => Int)
  @Column({ default: 0 })
  postCount: number

  @Field(() => Int)
  @Column('bigint', { default: 0 })
  rocketCount: number

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
    // @ts-ignore
    return dayjs(new Date(this.createdAt)).twitter()
  }

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatarUrl?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  bannerUrl?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  realName?: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  bio?: string

  @Field()
  @Column({ default: false })
  appearOffline: boolean

  @Field()
  @Column({ default: false })
  allowNsfw: boolean

  @Field()
  @Column({ default: false })
  allowProfanity: boolean

  @Field()
  @Column({ default: false })
  private: boolean
}
