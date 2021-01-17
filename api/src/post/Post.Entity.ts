import { Field, ID, Int, ObjectType } from 'type-graphql'
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
import { Comment } from '@/comment/Comment.Entity'
import { User } from '@/user/User.Entity'
import { Planet } from '@/planet/Planet.Entity'
import { URL } from 'url'
import dayjs from 'dayjs'
import { isUrl } from '@/IsUrl'
import { Metadata } from '@/metascraper/Metadata'
import { Folder } from '@/folder/Folder.Entity'
import { Lazy } from '@/Lazy'

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

  @Field({ nullable: true })
  @Column({ nullable: true })
  title: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  textContent?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  linkUrl?: string

  @Field(() => Metadata, { nullable: true })
  @Column('jsonb', {
    nullable: true,
    transformer: {
      to: value => value,
      from: value => {
        try {
          return JSON.parse(value) as Metadata
        } catch {
          return value
        }
      }
    }
  })
  meta?: Metadata

  @Field({ nullable: true })
  get thumbnailUrl(): string | null {
    if (this.imageUrls && this.imageUrls.length > 0) return this.imageUrls[0]
    if (!this.linkUrl) return null
    if (this.meta && this.meta.image) return this.meta.image
    if (this.meta && this.meta.logo) return this.meta.logo
    return null
  }

  @Field({ nullable: true })
  get logoUrl(): string | null {
    if (!this.linkUrl) return null
    if (this.meta && this.meta.logo) return this.meta.logo
    return null
  }

  @Field(() => [String])
  @Column('text', {
    array: true,
    default: () => 'array[]::text[]'
  })
  imageUrls: string[]

  @Field({ nullable: true })
  get domain(): string | null {
    if (isUrl(this.linkUrl)) {
      let domain = new URL(this.linkUrl).hostname
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
    // @ts-ignore
    return dayjs(new Date(this.createdAt)).twitter()
  }

  @Field()
  get timeSinceFull(): string {
    // @ts-ignore
    return dayjs(new Date(this.createdAt)).format('dddd, MMMM D, YYYY h:mm A')
  }

  @Field({ nullable: true })
  @Column({ nullable: true })
  editedAt?: Date

  @Field({ nullable: true })
  @Column({ nullable: true })
  pinnedAt?: Date

  @Field({ nullable: true })
  @Column({ nullable: true })
  pinnedByAuthorAt?: Date

  @Field({ nullable: true })
  get timeSinceEdited(): string | null {
    if (!this.editedAt) return null
    // @ts-ignore
    return dayjs(new Date(this.editedAt)).twitter()
  }

  @Field()
  @Column({ default: false })
  pinned: boolean

  @Field()
  @Column({ default: false })
  pinnedByAuthor: boolean

  @OneToMany(() => Comment, comment => comment.post)
  comments: Lazy<Comment[]>

  @Field(() => Planet, { nullable: true })
  @ManyToOne(() => Planet, planet => planet.posts, {
    cascade: true,
    nullable: true
  })
  planet?: Lazy<Planet>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  planetId?: number

  @ManyToMany(() => User)
  @JoinTable()
  rocketers: Lazy<User[]>

  @Field(() => Int)
  @Column({ default: 1 })
  rocketCount: number

  @Field(() => Int)
  @Column({ default: 0 })
  commentCount: number

  @Field()
  isRocketed: boolean

  @Field()
  @Column({ default: false })
  deleted: boolean

  @Field()
  @Column({ default: false })
  removed: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  removedReason?: string

  @Field()
  @Column({ default: false })
  nsfw: boolean

  @Field()
  get relativeUrl(): string {
    /*const slug = this.title
      .toLowerCase()
      .trim()
      .split(' ')
      .slice(0, 9)
      .join('-')
      .replace(/[^a-z0-9-]+/gi, '')
      .replace(/[-](.)\1+/g, '$1')*/
    return `/post/${this.id36}`
  }

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post)
  repost: Lazy<Post>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  repostId: number

  @Field(() => [Folder])
  @ManyToMany(() => Folder, folder => folder.posts)
  folders: Lazy<Folder[]>
}
