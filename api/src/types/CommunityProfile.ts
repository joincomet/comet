import { Field, ObjectType } from 'type-graphql'
import { CommunityRule } from '@/types/CommunityRule'

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

  @Field({ nullable: true })
  twitter?: string

  @Field({ nullable: true })
  discordInvite?: string

  @Field(() => [CommunityRule], { nullable: true })
  rules?: CommunityRule[]
}
