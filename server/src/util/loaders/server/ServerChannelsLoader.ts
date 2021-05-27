import DataLoader from 'dataloader'
import { Channel, Server } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import {logger} from "@/util";

export const serverChannelsLoader = (em: EntityManager) => {
  const loader = new DataLoader<string, Channel[]>(
    async (serverIds: string[]) => {
      logger('serverChannelsLoader', serverIds)
      loader.clearAll()
      const channels = await em.find(
        Channel,
        { server: serverIds, isDeleted: false },
        { orderBy: { position: 'DESC' } }
      )
      const map: Record<string, Channel[]> = {}
      serverIds.forEach(
        serverId =>
          (map[serverId] = channels.filter(
            channel => channel.server === em.getReference(Server, serverId)
          ))
      )
      return serverIds.map(serverId => map[serverId])
    }
  )
  return loader
}
