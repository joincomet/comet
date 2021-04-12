import { UserServerArgs } from '@/resolver/server/mutations/UserServerArgs'
import { Context } from '@/types'
import { ServerUser } from '@/entity'
import { ServerUserStatus } from '@/resolver/server/types/ServerUserStatus'

export async function unbanUserFromServer(
  { em }: Context,
  { serverId, userId }: UserServerArgs
): Promise<boolean> {
  const join = await em.findOneOrFail(ServerUser, {
    user: userId,
    server: serverId
  })
  if (join.status !== ServerUserStatus.Banned)
    throw new Error('That user is not banned from this server')
  join.status = ServerUserStatus.None
  return true
}
