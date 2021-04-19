import DataLoader from 'dataloader'
import { Role, Server, ServerUser, ServerUserStatus, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const serverRolesLoader = (em: EntityManager) => {
  return new DataLoader<string, Role[]>(async (serverIds: string[]) => {
    const roles = await em.find(
      Role,
      { server: serverIds },
      { orderBy: { position: 'DESC' } }
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
}
