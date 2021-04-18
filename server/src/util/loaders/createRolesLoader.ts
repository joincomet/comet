import DataLoader from 'dataloader'
import { Role, ServerUser, ServerUserStatus, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const createRolesLoader = (em: EntityManager, currentUser: User) => {
  return new DataLoader<string, Role[]>(async (serverIds: string[]) => {
    const serverUsers = await em.find(
      ServerUser,
      { server: serverIds, user: currentUser, status: ServerUserStatus.Joined },
      ['roles']
    )
    const map: Record<string, Role[]> = {}
    serverIds.forEach(
      serverId =>
        (map[serverId] =
          serverUsers.find(su => su.server.id === serverId)?.roles.getItems() ??
          [])
    )
    return serverIds.map(serverId => map[serverId])
  })
}
