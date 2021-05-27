import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Channel, ServerPermission, User } from '@/entity'
import {logger} from "@/util";

@InputType()
export class DeleteChannelInput {
  @Field(() => ID)
  channelId: string
}

export async function deleteChannel(
  { em, userId, liveQueryStore }: Context,
  { channelId }: DeleteChannelInput
): Promise<string> {
  logger('deleteChannel')
  const channel = await em.findOneOrFail(Channel, channelId, [
    'server'
  ])
  const user = await em.findOneOrFail(User, userId)
  await user.checkServerPermission(
    em,
    channel.server.id,
    ServerPermission.ManageChannels
  )
  channel.isDeleted = true
  if (channel.isDefault) {
    const firstChannel = await em.findOne(Channel, { id: { $ne: channel.id }})
    firstChannel.isDefault = true
    em.persist(firstChannel)
  }
  await em.persistAndFlush([channel, channel.server])
  liveQueryStore.invalidate(`Channel:${channelId}`)
  return channelId
}
