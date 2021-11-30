import { EntityManager } from '@mikro-orm/postgresql'
import { Server, ServerUser, ServerUserStatus } from '@/entity'
import DataLoader from 'dataloader'
import {logger} from "@/util";

export const serverOnlineCountLoader = (em: EntityManager) => {
  const loader = new DataLoader<string, number>(async (serverIds: string[]) => {
    logger('serverOnlineCountLoader', serverIds)
    loader.clearAll()
    const serverUsers = await em.find(
      ServerUser,
      {
        server: serverIds,
        status: ServerUserStatus.Joined
      },
      ['user']
    )
    const map: Record<string, number> = {}
    serverIds.forEach(
      serverId =>
        (map[serverId] = serverUsers.filter(
          su =>
            su.user.isOnline && su.server === em.getReference(Server, serverId)
        ).length)
    )
    return serverIds.map(postId => map[postId])
  })
  return loader
}
