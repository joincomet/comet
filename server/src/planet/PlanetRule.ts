import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class PlanetRule {
  @Field()
  name: string

  @Field()
  description: string
}
