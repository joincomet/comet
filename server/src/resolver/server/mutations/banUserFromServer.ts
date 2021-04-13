import { UserServerPayload } from '@/resolver/server/subscriptions/UserServerPayload'
import { Publisher } from 'type-graphql'
import { Context } from '@/types'
import { UserServerArgs } from '@/resolver/server/mutations/UserServerArgs'
import { ServerUser } from '@/entity'
import { ServerUserStatus } from '@/entity/server/ServerUserStatus'

export async function banUserFromServer(
  { em }: Context,
  { serverId, userId }: UserServerArgs,
  notifyUserLeftServer: Publisher<UserServerPayload>
): Promise<boolean> {
  const join = await em.findOneOrFail(ServerUser, {
    user: userId,
    server: serverId
  })
  if (join.status === ServerUserStatus.Banned)
    throw new Error('That user is already banned from this server')
  join.status = ServerUserStatus.Banned
  await notifyUserLeftServer({ serverId, userId })
  return true
}
