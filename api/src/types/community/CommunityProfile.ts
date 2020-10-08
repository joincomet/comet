import { Field, ObjectType } from 'type-graphql'
import { CommunityRule } from '@/types/community/CommunityRule'

@ObjectType()
export class CommunityProfile {
  @Field({ nullable: true })
  avatarURL?: string

  @Field({ nullable: true })
  bannerURL?: string

  @Field({ nullable: true })
  color?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  customName?: string

  @Field({ nullable: true })
  twitterUsername?: string

  @Field({ nullable: true })
  discordInvite?: string

  @Field(() => [CommunityRule], { nullable: true })
  rules?: CommunityRule[]
}
