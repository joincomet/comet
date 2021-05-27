import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Role, Server, ServerUser, ServerUserStatus, User } from '@/entity'
import {logger} from "@/util";

@InputType()
export class LeaveServerInput {
  @Field(() => ID)
  serverId: string
}

export async function leaveServer(
  { em, userId, liveQueryStore }: Context,
  { serverId }: LeaveServerInput
): Promise<Server> {
  logger('leaveServer')
  const server = await em.findOneOrFail(Server, serverId, ['owner'])
  if (server.owner === em.getReference(User, userId))
    throw new Error('Cannot leave if owner')
  const serverUser = await em.findOneOrFail(ServerUser, {
    user: userId,
    server: serverId,
    status: ServerUserStatus.Joined
  })
  serverUser.role = await em.findOne(Role, { server, isDefault: true })
  serverUser.status = ServerUserStatus.None
  server.userCount--
  await em.persistAndFlush([serverUser, server])
  liveQueryStore.invalidate([
    `Query.serverUsers(serverId:"${server.id}")`
  ])
  server.isJoined = false
  return server
}
