import { Field, ID, ObjectType } from 'type-graphql'
import { Channel } from '@/entity'

@ObjectType()
export class ChannelsReorderedResponse {
  @Field(() => ID)
  serverId: string

  @Field(() => [Channel])
  channels: Channel[]
}
