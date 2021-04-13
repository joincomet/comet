import {
  Channel,
  ChannelPermission,
  ServerPermission,
  ServerUser
} from '@/entity'
import { Context } from '@/types'
import { QueryOrder } from '@mikro-orm/core'

export async function getChannelUsers(
  { em }: Context,
  channelId: string
): Promise<ServerUser[]> {
  const channel = await em.findOneOrFail(Channel, channelId, ['server'])
  const serverUsers = await em.find(
    ServerUser,
    { server: channel.server },
    ['user'],
    { user: { username: QueryOrder.ASC } }
  )
  return serverUsers.filter(serverUser =>
    serverUser.user.hasChannelPermission(
      em,
      channelId,
      ChannelPermission.ViewChannel,
      ServerPermission.ViewChannels
    )
  )
}
