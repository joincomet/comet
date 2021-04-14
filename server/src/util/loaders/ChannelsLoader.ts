import DataLoader from 'dataloader'
import { Channel } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const createChannelsLoader = (em: EntityManager) => {
  return new DataLoader<string, Channel[]>(async (serverIds: string[]) => {
    const channels = await em.find(
      Channel,
      { server: serverIds },
      { orderBy: { position: 'ASC' } }
    )
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
