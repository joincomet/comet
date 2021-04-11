import { Field, ID, ObjectType } from 'type-graphql'
import { Channel } from '@/entity'

@ObjectType()
export class ChannelDeletedResponse {
  @Field(() => ID)
  serverId: string

  @Field(() => ID)
  channelId: string
}
