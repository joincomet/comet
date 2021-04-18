import DataLoader from 'dataloader'
import { Channel, ChannelUser, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const createChannelsLoader = (em: EntityManager, user: User) => {
  return new DataLoader<string, Channel[]>(async (serverIds: string[]) => {
    const channels = await em.find(
      Channel,
      { server: serverIds },
      { orderBy: { position: 'ASC' } }
    )
    const channelUsers = await em.find(ChannelUser, { user, channel: channels })
    channels.forEach(channel => {
      const channelUser = channelUsers.find(cu => cu.user === user)
      channel.isUnread = channelUser
        ? channelUser.lastViewAt.getTime() < channel.lastMessageAt.getTime()
        : true
      channel.mentionCount = channelUser?.mentionCount ?? 0
    })
    const map: Record<string, Channel[]> = {}
    serverIds.forEach(
      serverId =>
        (map[serverId] = channels.filter(
          channel => channel.server.id === serverId
        ))
    )
    return serverIds.map(serverId => map[serverId])
  })
}
