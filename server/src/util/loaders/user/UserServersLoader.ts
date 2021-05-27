import DataLoader from 'dataloader'
import { Server, ServerUser, ServerUserStatus, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import {logger} from "@/util";

export const userServersLoader = (em: EntityManager, currentUserId: string) => {
  const loader = new DataLoader<string, Server[]>(async (userIds: string[]) => {
    logger('userServersLoader', userIds)
    loader.clearAll()
    if (!currentUserId) return userIds.map(_ => [])
    const serverUsers = await em.find(
      ServerUser,
      {
        user: userIds,
        status: ServerUserStatus.Joined,
        server: { isDeleted: false }
      },
      ['server'],
      { position: 'ASC' }
    )
    const myServers = serverUsers
      .filter(su => su.user === em.getReference(User, currentUserId))
      .map(su => su.server)
    const map: Record<string, Server[]> = {}
    userIds.forEach(userId => {
      map[userId] = serverUsers
        .filter(
          serverUser =>
            serverUser.user === em.getReference(User, userId) &&
            myServers.includes(serverUser.server)
        )
        .map(su => su.server)
    })
    return userIds.map(userId => map[userId])
  })
  return loader
}
