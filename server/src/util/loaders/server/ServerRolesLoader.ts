import DataLoader from 'dataloader'
import { Role, Server } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import { QueryOrder } from '@mikro-orm/core'
import {logger} from "@/util";

export const serverRolesLoader = (em: EntityManager) => {
  const loader = new DataLoader<string, Role[]>(async (serverIds: string[]) => {
    logger('serverRolesLoader', serverIds)
    loader.clearAll()
    const roles = await em.find(
      Role,
      { server: serverIds },
      { orderBy: { createdAt: QueryOrder.DESC } }
    )

    const map: Record<string, Role[]> = {}
    serverIds.forEach(
      serverId =>
        (map[serverId] =
          roles.filter(
            role => role.server === em.getReference(Server, serverId)
          ) ?? [])
    )
    return serverIds.map(serverId => map[serverId])
  })
  return loader
}
