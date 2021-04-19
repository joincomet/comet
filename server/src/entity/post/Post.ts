import { Field, Int, ObjectType } from 'type-graphql'
import {
  Comment,
  Folder,
  FolderPost,
  LinkMetadata,
  Server,
  ServerUser,
  User
} from '@/entity'
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
  Property,
  QueryOrder
} from '@mikro-orm/core'
import { PostVote } from '@/entity/post/PostVote'
import { BaseEntity } from '@/entity/BaseEntity'

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
  @Property({ type: ArrayType })
  imageUrls: string[] = []

  @Field({ nullable: true })
  get domain(): string | null {
    if (isUrl(this.linkUrl)) {
      let domain = new URL(this.linkUrl).hostname
      if (domain.startsWith('www.')) domain = domain.substring(4)
      return domain
    }
    return null
  }

  @Field(() => ServerUser, { nullable: true })
  @ManyToOne(() => ServerUser)
  author?: ServerUser

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
  @Property({ unsigned: true })
  voteCount: number = 0

  @Field()
  isVoted: boolean

  @OneToMany(() => PostVote, 'post')
  votes = new Collection<PostVote>(this)

  @Field(() => Int)
  @Property({ unsigned: true })
  commentCount: number = 0

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
    return `/server/${this.server.id}/posts/${this.id}`
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
