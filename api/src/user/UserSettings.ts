import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class UserSettings {
  @Field(() => Boolean)
  appearOffline = false

  @Field(() => Boolean)
  nsfw = false

  @Field(() => Boolean)
  private = false

  @Field(() => Boolean)
  profanity = false
}
