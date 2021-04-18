import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Server, ServerUser, ServerUserStatus } from '@/entity'

@InputType()
export class LeaveServerInput {
  @Field(() => ID)
  serverId: string
}

export async function leaveServer(
  { em, user, liveQueryStore }: Context,
  { serverId }: LeaveServerInput
): Promise<boolean> {
  const server = await em.findOneOrFail(Server, serverId, ['owner'])
  if (server.owner === user) throw new Error('Cannot leave if owner')
  const serverUser = await em.findOneOrFail(ServerUser, {
    user,
    server: serverId,
    status: ServerUserStatus.Joined
  })
  serverUser.status = ServerUserStatus.None
  await em.persistAndFlush(serverUser)
  liveQueryStore.invalidate(`User:${user.id}`)
  return true
}
