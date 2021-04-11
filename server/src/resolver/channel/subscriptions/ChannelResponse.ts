import { Field, ID, ObjectType } from 'type-graphql'
import { Channel } from '@/entity'

@ObjectType()
export class ChannelResponse {
  @Field(() => ID)
  serverId: string

  @Field(() => Channel)
  channel: Channel
}

export type ChannelID = string
