import { EntityManager } from '@mikro-orm/postgresql'
import { Server, ServerUser, ServerUserStatus } from '@/entity'
import DataLoader from 'dataloader'

export const serverJoinedLoader = (
  em: EntityManager,
  currentUserId: string
) => {
  return new DataLoader<string, boolean>(async (serverIds: string[]) => {
    const serverUsers = await em.find(ServerUser, {
      server: serverIds,
      user: currentUserId,
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
