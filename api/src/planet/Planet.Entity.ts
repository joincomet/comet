import { Field, ID, Int, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId
} from 'typeorm'
import { User } from '@/user/User.Entity'
import { Post } from '@/post/Post.Entity'
import { PlanetRule } from '@/planet/PlanetRule'
import dayjs from 'dayjs'
import { Color } from '@/Color'
import { Galaxy } from '@/Galaxy'
import { ChatChannel } from '@/chat/ChatChannel.Entity'
import { Lazy } from '@/Lazy'

@ObjectType()
@Entity()
export class Planet {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number

  @Field()
  get id36(): string {
    return BigInt(this.id).toString(36)
  }

  @Field()
  @Column()
  name: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  customName?: string

  @Field()
  @Column({ default: false })
  nsfw: boolean

  @Field(() => Color, { nullable: true })
  @Column({ type: 'enum', enum: Color, default: Color.blue })
  color: Color

  @Field(() => [PlanetRule])
  @Column('jsonb', {
    array: true,
    default: () => 'array[]::jsonb[]'
  })
  rules: PlanetRule[]

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field()
  get timeSinceCreated(): string {
    // @ts-ignore
    return dayjs(new Date(this.createdAt)).twitter()
  }

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  creator: Lazy<User>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  creatorId: number

  @OneToMany(() => Post, post => post.planet)
  posts: Lazy<Post[]>

  @Field(() => [User])
  @ManyToMany(() => User, user => user.joinedPlanets)
  @JoinTable()
  users: Lazy<User[]>

  @RelationId((planet: Planet) => planet.users)
  userIds: number[]

  @Field(() => [Galaxy])
  @Column({ type: 'enum', enum: Galaxy, array: true, default: [] })
  galaxies: Galaxy[]

  @ManyToMany(() => User)
  @JoinTable()
  bannedUsers: Lazy<User[]>

  @Field(() => [User])
  @ManyToMany(() => User, mod => mod.moderatedPlanets)
  @JoinTable()
  moderators: Lazy<User[]>

  @RelationId((planet: Planet) => planet.moderators)
  moderatorIds: number[]

  @Field()
  isMuted: boolean

  @Field()
  isJoined: boolean

  @Field(() => Int)
  @Column('bigint', { default: 1 })
  userCount: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatarUrl?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  bannerUrl?: string

  @Field()
  @Column({ default: false })
  banned: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  banReason?: string

  @Field(() => [ChatChannel])
  @OneToMany(() => ChatChannel, channel => channel.planet)
  channels: Lazy<ChatChannel[]>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  defaultChannelId?: number

  @Field()
  @Column({ default: false })
  private: boolean

  @Field()
  @Column({ default: false })
  featured: boolean
}
