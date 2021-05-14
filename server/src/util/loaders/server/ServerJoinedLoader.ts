import { EntityManager } from '@mikro-orm/postgresql'
import { Server, ServerUser, ServerUserStatus } from '@/entity'
import DataLoader from 'dataloader'

export const serverJoinedLoader = (em: EntityManager, userId: string) => {
  return new DataLoader<string, boolean>(async (serverIds: string[]) => {
    if (!userId) return serverIds.map(_ => null)
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
  })
}
