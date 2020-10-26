import { Authorized, Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Comment } from '@/entities/Comment'
import { Lazy } from '@/Lazy'
import { User } from '@/entities/User'
import { PostRocket } from '@/entities/relations/PostRocket'
import { Planet } from '@/entities/Planet'
import { Save } from '@/entities/relations/Save'
import { PostHide } from '@/entities/relations/PostHide'
import { Embed } from '@/types/post/Embed'
import { URL } from 'url'
import dayjs from 'dayjs'

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

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true, name: 'image_urls' })
  imageURLs?: string[]

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

  @Field()
  @Column('bigint', { default: 0 })
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

  @Field()
  @Column('bigint', { default: 1 })
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

  @Field(() => String, { nullable: true })
  get domain(): string | undefined {
    if (!this.linkURL) return undefined
    let domain = new URL(this.linkURL).host
    if (domain.includes('www.')) domain = domain.split('www.')[1]
    return domain
  }

  @Field(() => String, { nullable: true })
  get thumbnailURL(): string | undefined {
    if (this.imageURLs && this.imageURLs.length > 0) return this.imageURLs[0]
    if (
      this.embed &&
      this.embed.links &&
      this.embed.links.thumbnail &&
      this.embed.links.thumbnail.length > 0
    )
      return this.embed.links.thumbnail[0].href
    return undefined
  }

  @Field(() => String, { nullable: true })
  get embedThumbnailURL(): string | undefined {
    if (
      this.embed &&
      this.embed.links &&
      this.embed.links.thumbnail &&
      this.embed.links.thumbnail.length > 0
    )
      return this.embed.links.thumbnail[0].href
    return undefined
  }
}
