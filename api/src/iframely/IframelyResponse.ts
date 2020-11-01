import { Field, Float, Int, ObjectType } from 'type-graphql'

@ObjectType()
class Meta {
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
class Media {
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
class Icon {
  @Field()
  href: string

  @Field(() => [String])
  rel: string[]

  @Field()
  type: string

  @Field(() => Media, { nullable: true })
  media?: Media
}

@ObjectType()
class Thumbnail {
  @Field()
  href: string

  @Field()
  type: string

  @Field(() => [String])
  rel: string[]

  @Field(() => Media, { nullable: true })
  media?: Media
}

@ObjectType()
class Links {
  @Field(() => [Thumbnail], { nullable: true })
  thumbnail?: Thumbnail[]

  @Field(() => [Icon], { nullable: true })
  icon?: Icon[]

  @Field(() => [Player], { nullable: true })
  player?: Player[]
}

@ObjectType()
class Player {
  @Field()
  href: string

  @Field()
  type: string

  @Field(() => [String])
  rel: string[]

  @Field(() => Media, { nullable: true })
  media?: Media

  @Field({ nullable: true })
  html?: string
}

@ObjectType()
export class IframelyResponse {
  @Field(() => Meta, { nullable: true })
  meta?: Meta

  @Field(() => Links, { nullable: true })
  links?: Links

  @Field(() => [String], { nullable: true })
  rel?: string[]

  @Field({ nullable: true })
  html?: string
}
