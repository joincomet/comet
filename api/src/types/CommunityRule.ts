import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class CommunityRule {
  @Field()
  name: string

  @Field()
  description: string
}
