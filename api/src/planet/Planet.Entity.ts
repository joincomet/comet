import { Authorized, Field, ID, Int, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/user/User.Entity'
import { Post } from '@/post/Post.Entity'
import { PlanetUser } from '@/planet/PlanetUser.Entity'
import { PlanetMute } from '@/filter/PlanetMute.Entity'
import { PlanetModerator } from '@/moderation/PlanetModerator.Entity'
import { Ban } from '@/moderation/Ban.Entity'
import { PlanetRule } from '@/planet/PlanetRule'
import dayjs from 'dayjs'

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

  @Field()
  @Column({ default: false })
  nsfw: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  color?: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  customName?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  twitterUsername?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  discordInvite?: string

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

  @Authorized('ADMIN')
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  creator: Lazy<User>

  @Authorized('ADMIN')
  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  creatorId: number

  @OneToMany(() => Post, post => post.planet)
  posts: Lazy<Post[]>

  @OneToMany(() => PlanetUser, user => user.planet)
  users: Lazy<PlanetUser[]>

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  tags?: string[]

  @OneToMany(() => Ban, ban => ban.planet)
  bans: Lazy<Ban[]>

  @Field(() => Int)
  @Column('bigint', { default: 1 })
  userCount: number

  @OneToMany(() => PlanetModerator, mod => mod.planet)
  moderators: Lazy<PlanetModerator[]>

  @OneToMany(() => PlanetMute, mute => mute.planet)
  mutes: Lazy<PlanetMute[]>

  @Field()
  muted: boolean

  @Field()
  joined: boolean

  @Field(() => Int)
  @Column('bigint', { default: 0 })
  postCount: number

  /*@Column('int', { select: false, default: 0 })
  total: number*/

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatarUrl?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  bannerUrl?: string
}
