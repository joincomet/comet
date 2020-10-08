import { Field, Float, Int, ObjectType } from 'type-graphql'

@ObjectType()
class EmbedMeta {
  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  site?: string

  @Field({ nullable: true })
  keywords?: string

  @Field({ nullable: true })
  themeColor?: string

  @Field({ nullable: true })
  canonical?: string

  @Field({ nullable: true })
  media?: string

  @Field({ nullable: true })
  author?: string

  @Field({ nullable: true })
  authorURL?: string

  @Field({ nullable: true })
  shortlink?: string
}

@ObjectType()
class EmbedMedia {
  @Field(() => Int, { nullable: true })
  width?: number

  @Field(() => Int, { nullable: true })
  height?: number

  @Field(() => Float, { nullable: true })
  aspectRatio?: number

  @Field({ nullable: true })
  scrolling?: boolean
}

@ObjectType()
class EmbedIcon {
  @Field()
  href: string

  @Field(() => [String])
  rel: string[]

  @Field()
  type: string

  @Field(() => EmbedMedia, { nullable: true })
  media?: EmbedMedia
}

@ObjectType()
class EmbedThumbnail {
  @Field()
  href: string

  @Field()
  type: string

  @Field(() => [String])
  rel: string[]

  @Field(() => EmbedMedia, { nullable: true })
  media?: EmbedMedia
}

@ObjectType()
class EmbedLinks {
  @Field(() => [EmbedThumbnail], { nullable: true })
  thumbnail?: EmbedThumbnail[]

  @Field(() => [EmbedIcon], { nullable: true })
  icon?: EmbedIcon[]

  @Field(() => [EmbedPlayer], { nullable: true })
  player?: EmbedPlayer[]
}

@ObjectType()
class EmbedPlayer {
  @Field()
  href: string

  @Field()
  type: string

  @Field(() => [String])
  rel: string[]

  @Field(() => EmbedMedia, { nullable: true })
  media?: EmbedMedia

  @Field({ nullable: true })
  html?: string
}

@ObjectType()
export class Embed {
  @Field(() => EmbedMeta, { nullable: true })
  meta?: EmbedMeta

  @Field(() => EmbedLinks, { nullable: true })
  links?: EmbedLinks

  @Field(() => [String], { nullable: true })
  rel?: string[]

  @Field({ nullable: true })
  html?: string
}
