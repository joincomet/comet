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
import { User } from '@/entities/User'
import { Post } from '@/entities/Post'
import { PlanetSettings } from '@/types/planet/PlanetSettings'
import { PlanetProfile } from '@/types/planet/PlanetProfile'
import { PlanetUser } from '@/entities/relations/PlanetUser'
import { PlanetMute } from '@/entities/relations/PlanetMute'
import { PlanetModerator } from '@/entities/relations/PlanetModerator'
import { AllowedPoster } from '@/entities/relations/AllowedPoster'
import { Ban } from '@/entities/moderation/Ban'

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
  @Column('jsonb', {
    default: new PlanetSettings(),
    transformer: {
      to: value => value,
      from: value => {
        try {
          return JSON.parse(value) as PlanetSettings
        } catch {
          return value
        }
      }
    }
  })
  settings: PlanetSettings

  @Field()
  @Column('jsonb', {
    default: new PlanetProfile(),
    transformer: {
      to: value => value,
      from: value => {
        try {
          return JSON.parse(value) as PlanetProfile
        } catch (e) {
          return value
        }
      }
    }
  })
  profile: PlanetProfile

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

  @OneToMany(() => Post, post => post.planet)
  posts: Lazy<Post[]>

  @OneToMany(() => PlanetUser, user => user.planet)
  users: Lazy<PlanetUser[]>

  @OneToMany(() => AllowedPoster, allowed => allowed.planet)
  allowedPosters: Lazy<User[]>

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

  @Column({ default: -1 })
  avatarVersion: number

  @Field({ nullable: true })
  get avatarURL(): string | null {
    return this.avatarVersion >= 0
      ? `https://${process.env.MEDIA_DOMAIN}/p/${this.id36}/avatar-${this.avatarVersion}.png`
      : null
  }

  @Column({ default: -1 })
  bannerVersion: number

  @Field({ nullable: true })
  get bannerURL(): string | null {
    return this.bannerVersion >= 0
      ? `https://${process.env.MEDIA_DOMAIN}/p/${this.id36}/banner-${this.bannerVersion}.png`
      : null
  }
}
