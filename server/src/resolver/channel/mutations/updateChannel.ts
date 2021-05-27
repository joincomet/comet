import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Channel, ChannelType, ServerPermission, User } from '@/entity'
import { MaxLength } from 'class-validator'
import {logger} from "@/util";

@InputType()
export class UpdateChannelInput {
  @Field(() => ID)
  channelId: string

  @Field({ nullable: true })
  @MaxLength(500)
  description?: string

  @Field(() => ChannelType, { nullable: true })
  type?: boolean
}

export async function updateChannel(
  { em, userId, liveQueryStore }: Context,
  { channelId, description, type }: UpdateChannelInput
): Promise<Channel> {
  logger('updateChannel')
  description = description.trim()
  const user = await em.findOneOrFail(User, userId)
  const channel = await em.findOneOrFail(Channel, channelId, ['server'])
  await user.checkServerPermission(
    em,
    channel.server.id,
    ServerPermission.ManageChannels
  )

  em.assign(channel, {
    description,
    type: type ?? channel.type
  })
  await em.persistAndFlush(channel)
  liveQueryStore.invalidate(`Channel:${channelId}`)
  return channel
}
