import { Authorized, Field, ID, Int, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId
} from 'typeorm'
import { Comment } from '@/comment/Comment.Entity'
import { Post } from '@/post/Post.Entity'
import dayjs from 'dayjs'
import { Planet } from '@/planet/Planet.Entity'
import { ChatGroup } from '@/chat/ChatGroup.Entity'
import { Lazy } from '@/Lazy'
import { Folder } from '@/folder/Folder.Entity'

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

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastLogin?: Date

  @Field()
  get isOnline(): boolean {
    if (!this.lastLogin) return false
    const timeout = 5 * 60 * 1000 // five minutes
    return new Date().getTime() - this.lastLogin.getTime() < timeout
  }

  @Column()
  passwordHash: string

  @Column({ default: false })
  deleted: boolean

  @Field()
  @Column({ default: false })
  admin: boolean

  @OneToMany(() => Comment, comment => comment.author)
  comments: Lazy<Comment[]>

  @OneToMany(() => Post, post => post.author)
  posts: Lazy<Post[]>

  @OneToMany(() => Folder, folder => folder.creator)
  folders: Lazy<Folder[]>

  @RelationId((user: User) => user.folders)
  folderIds: number[]

  @ManyToMany(() => Planet, planet => planet.users)
  joinedPlanets: Lazy<Planet[]>

  @RelationId((user: User) => user.joinedPlanets)
  joinedPlanetIds: number[]

  @Field(() => [Planet])
  @ManyToMany(() => Planet, planet => planet.moderators)
  moderatedPlanets: Lazy<Planet[]>

  @RelationId((user: User) => user.moderatedPlanets)
  moderatedPlanetIds: number[]

  @ManyToMany(() => Post)
  @JoinTable()
  hiddenPosts: Lazy<Post[]>

  @RelationId((user: User) => user.hiddenPosts)
  hiddenPostIds: number[]

  @ManyToMany(() => User, user => user.blockedUsers)
  blockedByUsers: Lazy<User[]>

  @RelationId((user: User) => user.blockedByUsers)
  blockedByUserIds: number[]

  @ManyToMany(() => User, user => user.blockedByUsers)
  @JoinTable()
  blockedUsers: Lazy<User[]>

  @RelationId((user: User) => user.blockedUsers)
  blockedUserIds: number[]

  @Field()
  @Column({ default: false })
  banned: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  banReason?: string

  @Field()
  isCurrentUser: boolean

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
  isBlocked: boolean // TODO FieldResolver

  /**
   * Current user is blocking this user
   */
  @Field()
  isBlocking: boolean // TODO FieldResolver

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

  @ManyToMany(() => ChatGroup, group => group.users)
  chatGroups: Lazy<ChatGroup[]>
}
