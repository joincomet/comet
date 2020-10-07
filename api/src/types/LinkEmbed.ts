import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class LinkEmbed {
  @Field()
  temp: string
}
