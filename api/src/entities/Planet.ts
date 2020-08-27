import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  OneToMany,
  ManyToOne
} from 'typeorm'
import { Lazy } from '../lazy'
import { User } from './User'
import { Post } from './Post'
import { Galaxy } from './Galaxy'
import { Sort } from '../args/FeedArgs'
import { CommentSort } from '../args/UserCommentsArgs'

@ObjectType()
@Entity()
export class Planet {
  @Field(() => ID)
  @PrimaryColumn()
  name: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  customName?: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string

  @Field()
  @Column()
  createdAt: Date

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  creator: Lazy<User>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  creatorId: string

  @OneToMany(() => Post, (post) => post.planet)
  posts: Lazy<Post[]>

  @ManyToMany(() => User, (user) => user.planets)
  @JoinTable()
  users: Lazy<User[]>

  @ManyToMany(() => User)
  @JoinTable()
  bannedUsers: Lazy<User[]>

  @Field({ nullable: true })
  userCount: number

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.moderatedPlanets)
  @JoinTable()
  moderators: Lazy<User[]>

  @Field(() => Galaxy)
  @ManyToOne(() => Galaxy, (galaxy) => galaxy.planets, { cascade: true })
  galaxy: Lazy<Galaxy>

  @Field()
  @Column({ default: true })
  allowTextPosts: boolean

  @Field()
  @Column({ default: true })
  allowLinkPosts: boolean

  @Field()
  @Column({ default: true })
  allowImagePosts: boolean

  @Field()
  @Column({ default: false })
  modPostsOnly: boolean

  @Field(() => Sort)
  @Column({
    type: 'enum',
    enum: Sort,
    default: Sort.HOT
  })
  defaultSort: Sort

  @Field(() => CommentSort)
  @Column({
    type: 'enum',
    enum: CommentSort,
    default: CommentSort.TOP
  })
  defaultCommentSort: CommentSort

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatarImageUrl?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  bannerImageUrl?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  themeColor?: string

  @Field()
  muted: boolean

  @Field()
  joined: boolean

  @Field()
  postCount: number

  @Column('int', { select: false, default: 0 })
  total: number

  personalUserCount = 0
}
