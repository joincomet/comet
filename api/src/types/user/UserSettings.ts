import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class UserSettings {
  @Field()
  appearOffline: boolean = false

  @Field()
  nsfw: boolean = false

  @Field()
  private: boolean = false

  @Field()
  profanity: boolean = false
}
