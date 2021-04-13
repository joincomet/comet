import { Context } from '@/types'
import { Publisher } from 'type-graphql'
import { Channel, ChannelUser } from '@/entity'

export interface ChannelUserPayload {
  channelId: string
  userId: string
}

export async function readChannel(
  { em, user }: Context,
  channelId: string,
  notifyChannelRead: Publisher<ChannelUserPayload>
): Promise<Channel> {
  const channel = await em.findOneOrFail(Channel, channelId)
  let channelUser = await em.findOne(ChannelUser, { user, channel })
  if (!channelUser) channelUser = em.create(ChannelUser, { user, channel })
  channelUser.lastViewAt = new Date()
  channelUser.mentionCount = 0
  await em.persistAndFlush(channelUser)
  channel.isUnread = false
  channel.mentionCount = 0
  await notifyChannelRead({ channelId, userId: user.id })
  return channel
}
