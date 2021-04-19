import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Server, ServerUser, ServerUserStatus, User } from '@/entity'

@InputType()
export class LeaveServerInput {
  @Field(() => ID)
  serverId: string
}

export async function leaveServer(
  { em, userId, liveQueryStore }: Context,
  { serverId }: LeaveServerInput
): Promise<boolean> {
  const server = await em.findOneOrFail(Server, serverId, ['owner'])
  if (server.owner === em.getReference(User, userId))
    throw new Error('Cannot leave if owner')
  const serverUser = await em.findOneOrFail(ServerUser, {
    user: userId,
    server: serverId,
    status: ServerUserStatus.Joined
  })
  serverUser.status = ServerUserStatus.None
  await em.persistAndFlush(serverUser)
  liveQueryStore.invalidate(`User:${userId}`)
  return true
}
