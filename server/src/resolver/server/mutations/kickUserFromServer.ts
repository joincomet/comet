import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import {
  Server,
  ServerPermission,
  ServerUser,
  ServerUserStatus
} from '@/entity'

@InputType()
export class KickUserFromServerInput {
  @Field(() => ID)
  serverId: string

  @Field(() => ID)
  userId: string
}

export async function kickUserFromServer(
  { em, user, liveQueryStore }: Context,
  { serverId, userId }: KickUserFromServerInput
): Promise<boolean> {
  if (user.id === userId) throw new Error('Cannot kick yourself')
  const server = await em.findOneOrFail(Server, serverId, ['owner'])
  if (server.owner.id === userId) throw new Error('Cannot kick server owner')
  await user.checkServerPermission(em, serverId, ServerPermission.ManageUsers)
  const serverUser = await em.findOneOrFail(ServerUser, {
    user: userId,
    server,
    status: ServerUserStatus.Joined
  })
  serverUser.status = ServerUserStatus.None
  await em.persistAndFlush(serverUser)
  liveQueryStore.invalidate(`User:${userId}`)
  return true
}
