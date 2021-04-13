import { Context } from '@/types'
import { Role, ServerPermission, ServerUser } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'

export async function getRoleUsers(
  { em, user }: Context,
  roleId: string
): Promise<ServerUser[]> {
  const role = await em.findOneOrFail(Role, roleId, ['server'])
  await user.checkServerPermission(
    em,
    role.server.id,
    ServerPermission.ManageRoles
  )
  return em.find(ServerUser, { server: role.server, roles: role }, ['user'], {
    username: QueryOrder.ASC
  })
}
