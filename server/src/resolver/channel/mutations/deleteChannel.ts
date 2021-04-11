import { Context } from '@/types'
import { Channel } from '@/entity'
import { Publisher } from 'type-graphql'
import { ChannelPayload } from '@/resolver/channel/subscriptions/ChannelPayload'

export async function deleteChannel(
  { em }: Context,
  channelId: string,
  notifyChannelDeleted: Publisher<ChannelPayload>
): Promise<boolean> {
  const channel = await em.findOneOrFail(Channel, channelId, ['server'])
  channel.isDeleted = true
  await em.persistAndFlush(channel)
  await notifyChannelDeleted({ serverId: channel.server.id, channelId })
  return true
}
