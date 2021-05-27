import DataLoader from 'dataloader'
import { ChannelUser } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import {logger} from "@/util";

export const channelUnreadLoader = (em: EntityManager, userId: string) => {
  const loader = new DataLoader<string, boolean>(
    async (channelIds: string[]) => {
      logger('channelUnreadLoader', channelIds)
      loader.clearAll()
      if (!userId) return channelIds.map(_ => false)
      const channelUsers = await em.find(
        ChannelUser,
        {
          user: userId,
          channel: channelIds
        },
        ['channel']
      )
      const map: Record<string, boolean> = {}
      channelIds.forEach(channelId => {
        const channelUser = channelUsers.find(cu => cu.channel.id === channelId)
        map[channelId] = channelUser
          ? channelUser.lastViewAt.getTime() <
            channelUser.channel.lastMessageAt.getTime()
          : true
      })
      return channelIds.map(channelId => map[channelId])
    }
  )
  return loader
}
