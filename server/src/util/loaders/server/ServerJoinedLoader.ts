import { EntityManager } from '@mikro-orm/postgresql'
import { Server, ServerUser, ServerUserStatus } from '@/entity'
import DataLoader from 'dataloader'
import {logger} from "@/util";

export const serverJoinedLoader = (em: EntityManager, userId: string) => {
  const loader = new DataLoader<string, boolean>(
    async (serverIds: string[]) => {
      logger('serverJoinedLoader', serverIds)
      loader.clearAll()
      if (!userId) return serverIds.map(_ => false)
      const serverUsers = await em.find(ServerUser, {
        server: serverIds,
        user: userId,
        status: ServerUserStatus.Joined
      })
      const map: Record<string, boolean> = {}
      serverIds.forEach(
        serverId =>
          (map[serverId] = !!serverUsers.find(
            su => su.server === em.getReference(Server, serverId)
          ))
      )
      return serverIds.map(serverId => map[serverId])
    }
  )
  return loader
}
