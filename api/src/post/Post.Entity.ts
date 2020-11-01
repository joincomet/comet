import { Authorized, Field, ID, Int, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Comment } from '@/comment/Comment.Entity'
import { Lazy } from '@/Lazy'
import { User } from '@/user/User.Entity'
import { PostRocket } from '@/post/PostRocket.Entity'
import { Planet } from '@/planet/Planet.Entity'
import { Save } from '@/folder/Save.Entity'
import { PostHide } from '@/filter/PostHide.Entity'
import { Embed } from '@/post/Embed'
import { URL } from 'url'
import dayjs from 'dayjs'
import { isURL } from '@/IsURL'

@ObjectType()
@Entity()
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number

  @Field()
  get id36(): string {
    return BigInt(this.id).toString(36)
  }

  @Field()
  @Column()
  title: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  textContent?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  linkURL?: string

  @Field(() => Embed, { nullable: true })
  @Column('jsonb', {
    nullable: true,
    transformer: {
      to: value => value,
      from: value => {
        try {
          return JSON.parse(value) as Embed
        } catch {
          return value
        }
      }
    }
  })
  embed?: Embed

  @Field({ nullable: true })
  get thumbnailURL(): string | null {
    if (this.imageURLs.length > 0) return this.imageURLs[0]
    if (this.embed && this.embed.thumbnailURL) return this.embed.thumbnailURL
    return null
  }

  @Field({ nullable: true })
  get faviconURL(): string | null {
    if (!this.linkURL) return null
    if (this.embed && this.embed.faviconURL) return this.embed.faviconURL
    return null
  }

  @Field(() => [String])
  @Column('text', {
    array: true,
    name: 'image_urls',
    default: () => 'array[]::text[]'
  })
  imageURLs: string[]

  @Field({ nullable: true })
  get domain(): string | null {
    if (isURL(this.linkURL)) {
      let domain = new URL(this.linkURL).hostname
      if (domain.startsWith('www.')) domain = domain.substring(4)
      return domain
    }
    return null
  }

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.posts)
  author: Lazy<User>

  @Field(() => ID)
  @Column({ nullable: true })
  authorId: number

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field()
  get timeSince(): string {
    // return formatDistanceToNowStrict(new Date(this.createdAt)) + ' ago'
    return dayjs(new Date(this.createdAt)).fromNow()
  }

  @Field({ nullable: true })
  @Column({ nullable: true })
  editedAt?: Date

  @Field({ nullable: true })
  get timeSinceEdited(): string | null {
    if (!this.editedAt) return null
    // return formatDistanceToNowStrict(new Date(this.editedAt)) + ' ago'
    return dayjs(new Date(this.editedAt)).fromNow()
  }

  @Field()
  @Column({ default: false })
  sticky: boolean

  @Field()
  @Column({ default: false })
  postedToProfile: boolean

  @OneToMany(() => Comment, comment => comment.post)
  comments: Lazy<Comment[]>

  @Field(() => Int)
  @Column({ default: 0 })
  commentCount: number

  @Field(() => Planet, { nullable: true })
  @ManyToOne(() => Planet, planet => planet.posts, {
    cascade: true,
    nullable: true
  })
  planet?: Lazy<Planet>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  planetId?: number

  @OneToMany(() => PostRocket, vote => vote.post)
  rockets: Lazy<PostRocket[]>

  @Field(() => Int)
  @Column({ default: 1 })
  rocketCount: number

  @Field()
  rocketed: boolean

  @Authorized('ADMIN')
  @Field()
  @Column({ default: false })
  deleted: boolean

  @Authorized('ADMIN')
  @Field()
  @Column({ default: false })
  removed: boolean

  @Authorized('ADMIN')
  @Field()
  @Column({ nullable: true })
  removedReason?: string

  @OneToMany(() => Save, save => save.post)
  saves: Lazy<Save[]>

  @OneToMany(() => PostHide, hide => hide.post)
  hides: Lazy<PostHide[]>

  @Field()
  get relativeURL(): string {
    const slug = this.title
      .toLowerCase()
      .trim()
      .split(' ')
      .slice(0, 9)
      .join('_')
      .replace(/[^a-z0-9_]+/gi, '')
      .replace(/[_](.)\1+/g, '$1')
    return `/+${(this.planet as Planet).name}/post/${this.id36}/${slug}`
  }
}
