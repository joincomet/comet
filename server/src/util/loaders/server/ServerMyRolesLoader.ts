import DataLoader from 'dataloader'
import { Role, Server, ServerUser, ServerUserStatus, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const serverMyRolesLoader = (em: EntityManager, userId: string) => {
  return new DataLoader<string, Role[]>(async (serverIds: string[]) => {
    const serverUsers = await em.find(
      ServerUser,
      { server: serverIds, user: userId, status: ServerUserStatus.Joined },
      ['roles']
    )
    const map: Record<string, Role[]> = {}
    serverIds.forEach(
      serverId =>
        (map[serverId] =
          serverUsers
            .find(su => su.server === em.getReference(Server, serverId))
            ?.roles.getItems() ?? [])
    )
    return serverIds.map(serverId => map[serverId])
  })
}
