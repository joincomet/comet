import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class ChannelDeletedResponse {
  @Field(() => ID)
  serverId: string

  @Field(() => ID)
  channelId: string
}
