import {
  Channel,
  ChannelPermission,
  ServerPermission,
  ServerUser,
  ServerUserStatus
} from '@/entity'
import { Context } from '@/types'

export async function channelUsers(
  { em }: Context,
  channelId: string
): Promise<ServerUser[]> {
  const channel = await em.findOneOrFail(Channel, channelId, ['server'])
  const users = await em.find(
    ServerUser,
    {
      server: channel.server,
      status: ServerUserStatus.Joined
    },
    ['user', 'roles'],
    { user: { name: 'ASC', tag: 'ASC' } }
  )

  return users.filter(su =>
    su.user.hasChannelPermission(
      em,
      channelId,
      ChannelPermission.ViewChannel,
      ServerPermission.ViewChannels
    )
  )
}
