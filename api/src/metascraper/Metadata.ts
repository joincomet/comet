import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Metadata {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  date?: string

  @Field({ nullable: true })
  author?: string

  @Field({ nullable: true })
  publisher?: string

  @Field({ nullable: true })
  image?: string

  @Field({ nullable: true })
  logo?: string

  @Field({ nullable: true })
  url?: string

  @Field({ nullable: true })
  twitterCard?: string
}
