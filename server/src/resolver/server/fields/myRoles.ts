import { Role, Server, ServerUser } from '@/entity'
import { Context } from '@/types'
import { QueryOrder } from '@mikro-orm/core'

export async function myRoles(
  { em, user }: Context,
  server: Server
): Promise<Role[]> {
  await user.checkJoinedServer(em, server.id)
  const serverUser = await em.findOneOrFail(
    ServerUser,
    { server, user },
    ['roles.channelRoles'],
    { roles: { position: QueryOrder.ASC } }
  )
  return serverUser.roles
    .getItems()
    .sort((a, b) => b.position.localeCompare(a.position))
}
