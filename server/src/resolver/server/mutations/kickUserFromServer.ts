import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import {
  Role,
  Server,
  ServerPermission,
  ServerUser,
  ServerUserStatus,
  User
} from '@/entity'
import {logger} from "@/util";

@InputType()
export class KickUserFromServerInput {
  @Field(() => ID)
  serverId: string

  @Field(() => ID)
  userId: string
}

export async function kickUserFromServer(
  { em, userId: currentUserId, liveQueryStore }: Context,
  { serverId, userId }: KickUserFromServerInput
): Promise<boolean> {
  logger('kickUserFromServer')
  const user = await em.findOneOrFail(User, currentUserId)
  if (user.id === userId) throw new Error('Cannot kick yourself')
  const server = await em.findOneOrFail(Server, serverId, ['owner'])
  if (server.owner.id === userId) throw new Error('Cannot kick server owner')
  await user.checkServerPermission(em, serverId, ServerPermission.ManageUsers)
  const serverUser = await em.findOneOrFail(ServerUser, {
    user: userId,
    server,
    status: ServerUserStatus.Joined
  })
  serverUser.role = await em.findOne(Role, { server, isDefault: true })
  serverUser.status = ServerUserStatus.None
  server.userCount--
  await em.persistAndFlush([serverUser, server])
  liveQueryStore.invalidate(`User:${userId}`)
  return true
}
