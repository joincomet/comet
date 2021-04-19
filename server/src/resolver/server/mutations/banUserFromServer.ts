import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import {
  Server,
  ServerPermission,
  ServerUser,
  ServerUserStatus,
  User
} from '@/entity'

@InputType()
export class BanUserFromServerInput {
  @Field(() => ID)
  serverId: string

  @Field(() => ID)
  userId: string
}

export async function banUserFromServer(
  { em, userId: currentUserId, liveQueryStore }: Context,
  { serverId, userId }: BanUserFromServerInput
): Promise<boolean> {
  if (currentUserId === userId) throw new Error('Cannot ban yourself')
  const server = await em.findOneOrFail(Server, serverId, ['owner'])
  if (server.owner.id === userId) throw new Error('Cannot ban server owner')
  const user = await em.findOneOrFail(User, currentUserId)
  await user.checkServerPermission(em, serverId, ServerPermission.ManageUsers)
  const serverUser = await em.findOneOrFail(ServerUser, {
    user: userId,
    server,
    status: ServerUserStatus.Joined
  })
  serverUser.status = ServerUserStatus.Banned
  await em.persistAndFlush(serverUser)
  liveQueryStore.invalidate(`User:${userId}`)
  return true
}
