import { Context } from '@/types'
import { Channel, ServerPermission } from '@/entity'
import { Publisher } from 'type-graphql'

export async function deleteChannel(
  { em, user }: Context,
  channelId: string,
  notifyChannelsUpdated: Publisher<{ serverId: string }>
): Promise<boolean> {
  const channel = await em.findOneOrFail(Channel, channelId, ['server'])
  await user.checkServerPermission(
    em,
    channel.server.id,
    ServerPermission.ManageChannels
  )
  channel.isDeleted = true
  await em.persistAndFlush(channel)
  await notifyChannelsUpdated({ serverId: channel.server.id })
  return true
}
