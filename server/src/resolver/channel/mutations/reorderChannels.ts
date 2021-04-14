import { Context } from '@/types'
import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Channel, Server } from '@/entity'
import { getReorderPosition } from '@/util'
import { QueryOrder } from '@mikro-orm/core'

export async function reorderChannels(
  { em, user }: Context,
  { beforeChannelId, channelId }: ReorderChannelArgs,
  notifyChannelsUpdated: Publisher<{ serverId: string }>
): Promise<Server> {
  const channel = await em.findOneOrFail(Channel, channelId, ['server'])
  const channels = await em.find(
    Channel,
    { server: channel.server },
    { orderBy: { position: QueryOrder.ASC } }
  )
  const firstChannel = channels[0]
  const beforeChannel = beforeChannelId
    ? channels.find(c => c.id === beforeChannelId)
    : null
  const afterChannel = beforeChannel
    ? channels[channels.indexOf(beforeChannel) + 1]
    : null

  channel.position = getReorderPosition(
    firstChannel?.position,
    beforeChannel?.position,
    afterChannel?.position
  )

  await em.persistAndFlush(channel)
  await notifyChannelsUpdated({ serverId: channel.server.id })
  return channel.server
}
