import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Server, ServerUser } from '@/entity'
import { Context } from '@/types'
import { getJoinedServers } from '@/resolver/server/queries'
import { getReorderPosition } from '@/util'
import { QueryOrder } from '@mikro-orm/core'
import { ServerUserStatus } from '@/entity/server/ServerUserStatus'

@ArgsType()
export class ReorderServersArgs {
  @Field(() => ID, { nullable: true })
  beforeServerId?: string

  @Field(() => ID)
  serverId: string
}

export async function reorderServers(
  { em, user }: Context,
  { beforeServerId, serverId }: ReorderServersArgs,
  notifyServersUpdated: Publisher<{ userId: string }>
): Promise<Server[]> {
  const servers = await em.find(
    ServerUser,
    { user, status: ServerUserStatus.Joined },
    ['server'],
    {
      position: QueryOrder.ASC
    }
  )
  const server = servers.find(s => s.server.id === serverId)
  const firstServer = servers[0]
  const beforeServer = beforeServerId
    ? servers.find(s => s.server.id === beforeServerId)
    : null
  const afterServer = beforeServer
    ? servers[servers.indexOf(beforeServer) + 1]
    : null

  server.position = getReorderPosition(
    firstServer?.position,
    beforeServer?.position,
    afterServer?.position
  )

  await em.persistAndFlush(server)
  await notifyServersUpdated({ userId: user.id })
  return getJoinedServers({ em, user })
}
