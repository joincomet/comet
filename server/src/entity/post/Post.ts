import { Field, Int, ObjectType } from 'type-graphql'
import {
  Comment,
  Folder,
  FolderPost,
  LinkMetadata,
  PostImage,
  Server,
  ServerUser,
  User,
  PostVote,
  VoteType
} from '@/entity'
import { URL } from 'url'
import {
  Collection,
  Embedded,
  Entity,
  Formula,
  ManyToOne,
  OneToMany,
  Property,
  QueryOrder
} from '@mikro-orm/core'
import { BaseEntity } from '@/entity/BaseEntity'
import { GraphQLNonNegativeInt } from 'graphql-scalars'
import isURL from 'validator/lib/isURL'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Post extends BaseEntity {
  @Field()
  @Property({ columnType: 'text' })
  title: string

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  text?: string

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  linkUrl?: string

  @Field(() => LinkMetadata, { nullable: true })
  @Embedded({ entity: () => LinkMetadata, nullable: true, object: true })
  linkMetadata?: LinkMetadata

  @Field(() => [LinkMetadata])
  @Embedded(() => LinkMetadata, { object: true, array: true })
  linkMetadatas: LinkMetadata[] = []

  @Field(() => [PostImage])
  @Embedded(() => PostImage, { object: true, array: true })
  images: PostImage[] = []

  @Field({ nullable: true })
  get thumbnailUrl(): string | null {
    if (this.images && this.images.length > 0)
      return this.images[0].image.smallUrl
    if (!this.linkUrl) return null
    if (this.linkMetadata && this.linkMetadata.image)
      return this.linkMetadata.image.smallUrl
    if (this.linkMetadata && this.linkMetadata.logo)
      return this.linkMetadata.logo.smallUrl
    return null
  }

  @Field({ nullable: true })
  get domain(): string | null {
    if (!this.linkUrl) return null
    if (isURL(this.linkUrl)) {
      let domain = new URL(this.linkUrl).hostname
      if (domain.startsWith('www.')) domain = domain.substring(4)
      return domain
    }
    return null
  }

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  author?: User

  @Field(() => ServerUser, { nullable: true })
  serverUser?: ServerUser

  @Field()
  @Property()
  isPinned: boolean = false

  @Field({ nullable: true })
  @Property({ nullable: true })
  pinnedAt?: Date

  @OneToMany(() => Comment, 'post')
  comments = new Collection<Comment>(this)

  @Field(() => Server)
  @ManyToOne({ entity: () => Server })
  server: Server

  @OneToMany(() => FolderPost, 'post', {
    orderBy: { addedAt: QueryOrder.DESC }
  })
  folderPosts = new Collection<FolderPost>(this)

  @Field(() => [Folder], { nullable: true })
  folders?: Folder[]

  @Field(() => Int)
  @Property()
  voteCount: number = 0

  @Field(() => VoteType)
  voteType: VoteType = VoteType.None

  @OneToMany(() => PostVote, 'post')
  votes = new Collection<PostVote>(this)

  @Field(() => GraphQLNonNegativeInt)
  @Property({ unsigned: true })
  commentCount: number = 0

  @Field()
  get relativeUrl(): string {
    const slug = this.title
      .toLowerCase()
      .trim()
      .split(' ')
      .slice(0, 9)
      .join('_')
      .replace(/[^a-z0-9_]+/gi, '')
      .replace(/[_](.)\1+/g, '$1')
    return `/+${this.server.name}/post/${this.id}/${slug}`
  }

  @Formula(
    '(CAST(vote_count AS float) + 1)/((CAST((CAST(EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) AS int) -' +
      ' CAST(EXTRACT(EPOCH FROM created_at) AS int)+5000) AS FLOAT)/100.0)^(1.618))'
  )
  hotRank: number

  @Field({ nullable: true })
  @Property({ nullable: true })
  updatedAt?: Date

  @Field()
  @Property()
  isDeleted: boolean = false
}
