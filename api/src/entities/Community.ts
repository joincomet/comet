import { Authorized, Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
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
import { CommunitySettings } from '@/types/CommunitySettings'
import { CommunityProfile } from '@/types/CommunityProfile'
import { CommunityJoin } from '@/entities/relations/CommunityJoin'
import { CommunityMute } from '@/entities/relations/CommunityMute'
import { Moderator } from '@/entities/relations/Moderator'
import { AllowedPoster } from '@/entities/relations/AllowedPoster'
import { Ban } from '@/entities/moderation/Ban'

@ObjectType()
@Entity()
export class Community {
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
  @Column('jsonb', {
    default: new CommunitySettings(),
    transformer: {
      to: value => value,
      from: value => {
        try {
          return JSON.parse(value) as CommunitySettings
        } catch {
          return value
        }
      }
    }
  })
  settings: CommunitySettings

  @Field()
  @Column('jsonb', {
    default: new CommunityProfile(),
    transformer: {
      to: value => value,
      from: value => {
        try {
          return JSON.parse(value) as CommunityProfile
        } catch (e) {
          return value
        }
      }
    }
  })
  profile: CommunityProfile

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Authorized('ADMIN')
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  creator: Lazy<User>

  @Authorized('ADMIN')
  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  creatorId: number

  @OneToMany(() => Post, post => post.community)
  posts: Lazy<Post[]>

  @OneToMany(() => CommunityJoin, user => user.community)
  users: Lazy<CommunityJoin[]>

  @OneToMany(() => AllowedPoster, allowed => allowed.community)
  allowedPosters: Lazy<User[]>

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  tags?: string[]

  @OneToMany(() => Ban, ban => ban.community)
  bans: Lazy<Ban[]>

  @Field({ nullable: true })
  userCount: number

  @OneToMany(() => Moderator, mod => mod.community)
  moderators: Lazy<Moderator[]>

  @OneToMany(() => CommunityMute, mute => mute.community)
  mutes: Lazy<CommunityMute[]>

  @Field()
  muted: boolean

  @Field()
  joined: boolean

  @Field()
  postCount: number

  @Column('int', { select: false, default: 0 })
  total: number
}
