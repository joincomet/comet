import { Context } from '@/types'
import { Server, ServerPermission, ServerUser } from '@/entity'

export async function getServerPermissions(
  { em, user }: Context,
  serverId: string
): Promise<ServerPermission[]> {
  const server = await em.findOneOrFail(Server, serverId, ['owner'])
  if (user.isAdmin || server.owner === user) {
    return [...new Set<ServerPermission>(Object.values(ServerPermission))]
  }
  const perms = new Set<ServerPermission>()
  const join = await em.findOneOrFail(ServerUser, { user, server }, ['roles'])
  const userRoles = join.roles.getItems()
  userRoles.forEach(role => role.permissions.forEach(perm => perms.add(perm)))
  return [...perms]
}
