import { Role, ServerPermission } from '@/entity'
import { Publisher } from 'type-graphql'
import { Context } from '@/types'

export async function deleteRole(
  { em, user }: Context,
  roleId: string,
  notifyRolesUpdated: Publisher<{ serverId: string }>
): Promise<boolean> {
  const role = await em.findOneOrFail(Role, roleId, ['server'])
  await user.checkServerPermission(
    em,
    role.server.id,
    ServerPermission.ManageRoles
  )
  await em.remove(role).flush()
  await notifyRolesUpdated({ serverId: role.server.id })
  return true
}
