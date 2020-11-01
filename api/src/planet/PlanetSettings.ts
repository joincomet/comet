import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class PlanetSettings {
  @Field(() => Boolean)
  private = false

  @Field(() => Boolean)
  allowedPostersOnly = false

  @Field(() => Boolean)
  allowImages = true

  @Field(() => Boolean)
  allowLinks = true

  @Field(() => Boolean)
  allowText = true

  @Field(() => Boolean)
  nsfw = false
}
