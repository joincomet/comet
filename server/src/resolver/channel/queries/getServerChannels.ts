import { ChannelPermission, Context, ServerPermission } from '@/types'
import { Channel, ChannelRole, ChannelUser, Server, ServerUser } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'

export async function getServerChannels(
  { em, user }: Context,
  serverId: string
): Promise<Channel[]> {
  const server = await em.findOneOrFail(Server, serverId)

  const channels = await em.find(
    Channel,
    { server },
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

  const join = await em.findOne(ServerUser, { user, server }, ['roles'])
  const roles = join.roles.getItems()

  const hasAdminPermission = roles.find(r =>
    r.permissions.includes(ServerPermission.Admin)
  )
  if (hasAdminPermission) return channels

  const channelRoles = await em.find(ChannelRole, {
    channel: channels,
    role: roles
  })
  return channels.filter(channel => {
    if (channel.isPrivate) {
      return !!channelRoles.find(cr =>
        cr.allowedPermissions.includes(ChannelPermission.ViewChannel)
      )
    } else {
      return !!channelRoles.find(
        cr => !cr.deniedPermissions.includes(ChannelPermission.ViewChannel)
      )
    }
  })
}
