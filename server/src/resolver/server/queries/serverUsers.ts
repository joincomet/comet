import { ServerUser, ServerUserStatus } from '@/entity'
import { Context } from '@/types'
import {logger} from "@/util";

export async function serverUsers(
  { em }: Context,
  serverId: string
): Promise<ServerUser[]> {
  logger('serverUsers')
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
