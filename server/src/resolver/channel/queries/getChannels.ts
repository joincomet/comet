import { Context } from '@/types'
import {
  Channel,
  ChannelPermission,
  ChannelUser,
  ServerPermission
} from '@/entity'
import { QueryOrder } from '@mikro-orm/core'

export async function getChannels(
  { em, user }: Context,
  serverId: string
): Promise<Channel[]> {
  await user.checkJoinedServer(em, serverId)

  const channels = await em.find(
    Channel,
    { server: serverId },
    { orderBy: { position: QueryOrder.ASC } }
  )

  const channelUsers = await em.find(ChannelUser, { user, channel: channels }, [
    'channel'
  ])

  channels.forEach(channel => {
    const channelUser = channelUsers.find(cu => cu.channel === channel)
    if (channelUser) {
      channel.mentionCount = channelUser.mentionCount
      channel.isUnread =
        channelUser.lastViewAt.getTime() < channel.lastMessageAt.getTime()
    } else {
      channel.isUnread = true
      channel.mentionCount = 0
    }
  })

  if (user.isAdmin) return channels

  return channels.filter(channel =>
    user.hasChannelPermission(
      em,
      channel.id,
      ChannelPermission.ViewChannel,
      ServerPermission.ViewChannels
    )
  )
}
