import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Channel, ServerPermission, User } from '@/entity'

@InputType()
export class DeleteChannelInput {
  @Field(() => ID)
  channelId: string
}

export async function deleteChannel(
  { em, userId, liveQueryStore }: Context,
  { channelId }: DeleteChannelInput
): Promise<boolean> {
  const channel = await em.findOneOrFail(Channel, channelId, [
    'server.systemMessagesChannel'
  ])
  const user = await em.findOneOrFail(User, userId)
  await user.checkServerPermission(
    em,
    channel.server.id,
    ServerPermission.ManageChannels
  )
  channel.isDeleted = true
  if (channel.server.systemMessagesChannel === channel)
    channel.server.systemMessagesChannel = null
  await em.persistAndFlush([channel, channel.server])
  liveQueryStore.invalidate(`Channel:${channelId}`)
  return true
}
