import DataLoader from 'dataloader'
import { ServerUser, ServerUserStatus, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const createServersLoader = (em: EntityManager, currentUser: User) => {
  return new DataLoader<string, ServerUser[]>(async (userIds: string[]) => {
    const serverUsers = await em.find(
      ServerUser,
      { user: userIds, status: ServerUserStatus.Joined },
      ['server'],
      { position: 'ASC' }
    )
    const myServers = serverUsers
      .filter(su => su.user === currentUser)
      .map(su => su.server)
    const map: Record<string, ServerUser[]> = {}
    userIds.forEach(userId => {
      if (userId === currentUser.id) {
        map[userId] = serverUsers.filter(
          serverUser => serverUser.user.id === userId
        )
      } else {
        map[userId] = serverUsers.filter(
          serverUser =>
            serverUser.user.id === userId &&
            myServers.includes(serverUser.server)
        )
      }
    })
    return userIds.map(userId => map[userId])
  })
}
