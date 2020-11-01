import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Embed {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  thumbnailURL?: string

  @Field({ nullable: true })
  faviconURL?: string
}
