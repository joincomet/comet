import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Channel, ServerPermission } from '@/entity'

@InputType()
export class DeleteChannelInput {
  @Field(() => ID)
  channelId: string
}

export async function deleteChannel(
  { em, user, liveQueryStore }: Context,
  { channelId }: DeleteChannelInput
): Promise<boolean> {
  const channel = await em.findOneOrFail(Channel, channelId, ['server'])
  await user.checkServerPermission(
    em,
    channel.server.id,
    ServerPermission.ManageChannels
  )
  channel.isDeleted = true
  await em.persistAndFlush(channel)
  liveQueryStore.invalidate(`Channel:${channelId}`)
  return true
}
