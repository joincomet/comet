import DataLoader from 'dataloader'
import {
  Server,
  ServerPermission,
  ServerUser,
  ServerUserStatus,
  User
} from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import {logger} from "@/util";

export const serverPermissionsLoader = (em: EntityManager, userId: string) => {
  const loader = new DataLoader<string, ServerPermission[]>(
    async (serverIds: string[]) => {
      logger('serverPermissionsLoader', serverIds)
      loader.clearAll()
      if (!userId) return serverIds.map(_ => [])
      const currentUser = em.getReference(User, userId)
      const serverUsers = await em.find(
        ServerUser,
        {
          server: serverIds,
          user: currentUser,
          status: ServerUserStatus.Joined
        },
        ['role', 'server']
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
        const role = serverUser.role
        if (currentUser.isAdmin || serverUser.server.owner === currentUser || role.permissions.includes(ServerPermission.Admin)) {
          map[serverId] = Object.values(ServerPermission)
          return
        }
        const perms: ServerPermission[] = []
        perms.push(...role.permissions)
        map[serverId] = [...new Set(perms)]
      })
      return serverIds.map(serverId => map[serverId])
    }
  )
  return loader
}
