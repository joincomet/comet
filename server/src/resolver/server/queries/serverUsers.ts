import { ServerUser, ServerUserStatus } from '@/entity'
import { Context } from '@/types'

export async function serverUsers(
  { em }: Context,
  serverId: string
): Promise<ServerUser[]> {
  return em.find(
    ServerUser,
    {
      server: serverId,
      status: ServerUserStatus.Joined
    },
    ['user', 'roles'],
    { user: { username: 'ASC' } }
  )
}
