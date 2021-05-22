import { ServerUser, ServerUserStatus } from '@/entity'
import { Context } from '@/types'

export async function serverUsers(
  { em }: Context,
  serverId: string
): Promise<ServerUser[]> {
  em = em.fork()
  return em.find(
    ServerUser,
    {
      server: serverId,
      status: ServerUserStatus.Joined
    },
    ['user', 'role'],
    { user: { username: 'ASC' } }
  )
}
