import { Context } from '@/types'
import { Server, ServerUser, User } from '@/entity'

export async function getMutualServers(
  { em, user }: Context,
  userId: string
): Promise<Server[]> {
  const them = await em.findOneOrFail(User, userId)
  const myServers = (await em.find(ServerUser, { user }, ['server'])).map(
    j => j.server
  )
  const theirServers = (
    await em.find(ServerUser, { user: them }, ['server'])
  ).map(j => j.server.id)
  return myServers.filter(s => theirServers.includes(s.id))
}
