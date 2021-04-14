import { Context } from '@/types'
import { ServerUser, User } from '@/entity'

export async function getMutualServers(
  { em, user }: Context,
  userId: string
): Promise<ServerUser[]> {
  const them = await em.findOneOrFail(User, userId)
  const theirServerUsers = await em.find(ServerUser, { user: them }, ['server'])
  const theirServerIds = theirServerUsers.map(
    serverUser => serverUser.server.id
  )
  const myServerUsers = await em.find(ServerUser, { user }, ['server'])

  return myServerUsers
    .map(serverUser =>
      theirServerIds.includes(serverUser.server.id)
        ? theirServerUsers.find(
            theirServerUser =>
              theirServerUser.server.id === serverUser.server.id
          )
        : null
    )
    .filter(serverUser => !!serverUser)
}
