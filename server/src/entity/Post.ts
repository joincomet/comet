import { Field, Int, ObjectType } from 'type-graphql'
import { Comment, User, Server, LinkMetadata, BaseEntity } from '@/entity'
import { URL } from 'url'
import { isUrl } from '@/util/isUrl'
import {
  ArrayType,
  Collection,
  Embedded,
  Entity,
  Formula,
  ManyToOne,
  OneToMany,
  Property
} from '@mikro-orm/core'
import { PostVote } from '@/entity/PostVote'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Post extends BaseEntity {
  @Field()
  @Property()
  title: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  text?: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  linkUrl?: string

  @Field(() => LinkMetadata, { nullable: true })
  @Embedded({ entity: () => LinkMetadata, nullable: true, object: true })
  linkMetadata?: LinkMetadata

  @Field({ nullable: true })
  get thumbnailUrl(): string | null {
    if (this.imageUrls && this.imageUrls.length > 0) return this.imageUrls[0]
    if (!this.linkUrl) return null
    if (this.linkMetadata && this.linkMetadata.image)
      return this.linkMetadata.image
    if (this.linkMetadata && this.linkMetadata.logo)
      return this.linkMetadata.logo
    return null
  }

  @Field(() => [String])
  @Property({ type: ArrayType, default: [] })
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
  @ManyToOne(() => User)
  author: User

  @Field()
  @Property({ default: false })
  isPinned: boolean

  @Field({ nullable: true })
  @Property({ nullable: true })
  pinPosition?: string

  @OneToMany(() => Comment, 'post')
  comments = new Collection<Comment>(this)

  @ManyToOne({ entity: () => Server })
  server: Server

  @Field(() => Int)
  @Property({ default: 0 })
  voteCount: number

  @Field()
  isVoted: boolean

  @OneToMany(() => PostVote, 'post')
  votes = new Collection<PostVote>(this)

  @Field(() => Int)
  @Property({ default: 0 })
  commentCount: number

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
    const server = this.server as Server
    return `/server/${server.id}/post/${this.id}`
  }

  @Formula(
    '(CAST(rocket_count AS float) + 1)/((CAST((CAST(EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) AS int) -' +
      ' CAST(EXTRACT(EPOCH FROM created_at) AS int)+5000) AS FLOAT)/100.0)^(1.618))'
  )
  hotRank: number

  @Field({ nullable: true })
  @Property({ nullable: true })
  editedAt?: Date

  @Field()
  @Property({ default: false })
  isDeleted: boolean

  @Field()
  @Property({ default: false })
  isRemoved: boolean

  @Field({ nullable: true })
  @Property({ nullable: true })
  removedReason?: string
}
