import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class CommunitySettings {
  @Field()
  private: boolean = false

  @Field()
  allowedPostersOnly: boolean = false

  @Field()
  allowImages: boolean = true

  @Field()
  allowLinks: boolean = true

  @Field()
  allowText: boolean = true

  @Field()
  nsfw: boolean = false
}
