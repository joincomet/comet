import { Authorized, Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/entities/User'
import { Post } from '@/entities/Post'
import { Tag } from '@/entities/Tag'
import { CommunitySettings } from '@/types/CommunitySettings'

@ObjectType()
@Entity()
export class Community {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  get id36(): string {
    return this.id.toString(36)
  }

  @Field()
  @Column()
  name: string

  @Authorized('MOD')
  @Field()
  @Column({ default: CommunitySettings })
  settings: CommunitySettings

  @Field()
  @Column()
  createdAt: Date

  @Authorized('ADMIN')
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  creator: Lazy<User>

  @Authorized('ADMIN')
  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  creatorId: number

  @OneToMany(() => Post, (post) => post.community)
  posts: Lazy<Post[]>

  @ManyToMany(() => User, (user) => user.communities)
  @JoinTable()
  users: Lazy<User[]>

  @ManyToMany(() => User)
  @JoinTable()
  allowedPosters: Lazy<User[]>

  @ManyToMany(() => Tag, (tag) => tag.communities)
  @JoinTable()
  tags: Lazy<Tag[]>

  @ManyToMany(() => User)
  @JoinTable()
  bannedUsers: Lazy<User[]>

  @Field({ nullable: true })
  userCount: number

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.moderatedCommunities)
  @JoinTable()
  moderators: Lazy<User[]>

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
