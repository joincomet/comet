import DataLoader from 'dataloader'
import { Channel, ChannelUser, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const channelMentionCountLoader = (
  em: EntityManager,
  userId: string
) => {
  const loader = new DataLoader<string, number>(
    async (channelIds: string[]) => {
      loader.clearAll()
      const channelUsers = await em.find(ChannelUser, {
        user: userId,
        channel: channelIds
      })
      const map: Record<string, number> = {}
      channelIds.forEach(
        channelId =>
          (map[channelId] =
            channelUsers.find(
              cu => cu.channel === em.getReference(Channel, channelId)
            )?.mentionCount ?? 0)
      )
      return channelIds.map(channelId => map[channelId])
    }
  )
  return loader
}
