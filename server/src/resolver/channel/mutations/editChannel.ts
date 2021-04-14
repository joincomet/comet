import { Context } from '@/types'
import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Channel, ServerPermission } from '@/entity'

export async function editChannel(
  { em, user }: Context,
  { channelId, name, isPrivate }: EditChannelArgs,
  notifyChannelUpdated: Publisher<{ channelId: string }>
): Promise<Channel> {
  const channel = await em.findOneOrFail(Channel, channelId, ['server'])
  await user.checkServerPermission(
    em,
    channel.server.id,
    ServerPermission.ManageChannels
  )
  em.assign(channel, { name, isPrivate })
  await em.persistAndFlush(channel)
  await notifyChannelUpdated({ channelId: channel.id })
  return channel
}
