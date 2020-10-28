import { Field, Float, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Embed {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string
}
