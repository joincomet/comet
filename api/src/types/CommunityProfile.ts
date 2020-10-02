import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class CommunityProfile {
  @Field({ nullable: true })
  avatar?: string

  @Field({ nullable: true })
  banner?: string

  @Field({ nullable: true })
  color?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  customName?: string
}
