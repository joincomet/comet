import { Role, ServerUser, ServerUserStatus } from '@/entity'
import { Context } from '@/types'

export async function roleUsers(
  { em }: Context,
  roleId: string
): Promise<ServerUser[]> {
  const role = await em.findOneOrFail(Role, roleId, ['server'])
  return em.find(
    ServerUser,
    { server: role.server, roles: role, status: ServerUserStatus.Joined },
    ['user'],
    {
      user: { name: 'ASC', tag: 'ASC' }
    }
  )
}
