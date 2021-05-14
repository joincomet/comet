import DataLoader from 'dataloader'
import {
  Server,
  ServerPermission,
  ServerUser,
  ServerUserStatus,
  User
} from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const serverPermissionsLoader = (em: EntityManager, userId: string) => {
  return new DataLoader<string, ServerPermission[]>(
    async (serverIds: string[]) => {
      if (!userId) return serverIds.map(_ => null)
      const currentUser = await em.findOneOrFail(User, userId)
      const serverUsers = await em.find(
        ServerUser,
        {
          server: serverIds,
          user: currentUser,
          status: ServerUserStatus.Joined
        },
        ['roles', 'server']
      )
      const map: Record<string, ServerPermission[]> = {}
      serverIds.forEach(serverId => {
        const serverUser = serverUsers.find(
          su => su.server === em.getReference(Server, serverId)
        )
        if (!serverUser) {
          map[serverId] = []
          return
        }
        if (currentUser.isAdmin || serverUser.server.owner === currentUser) {
          map[serverId] = Object.values(ServerPermission)
          return
        }
        const perms: ServerPermission[] = []
        const roles = serverUser?.roles.getItems() ?? []
        roles.forEach(role => perms.push(...role.permissions))
        map[serverId] = [...new Set(perms)]
      })
      return serverIds.map(serverId => map[serverId])
    }
  )
}
