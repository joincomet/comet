import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Server, ServerUser } from '@/entity'
import { Context } from '@/types'
import { getJoinedServers } from '@/resolver/server/queries'
import { ReorderUtils } from '@/util'
import { QueryOrder } from '@mikro-orm/core'

@ArgsType()
export class ReorderServersArgs {
  @Field(() => ID, { nullable: true })
  beforeServerId: string

  @Field(() => ID)
  serverId: string
}

export async function reorderServers(
  { em, user }: Context,
  { beforeServerId, serverId }: ReorderServersArgs,
  notifyServersReordered: Publisher<{ userId: string }>
): Promise<Server[]> {
  const serverJoin = await em.findOneOrFail(ServerUser, {
    server: serverId
  })
  const beforeServerJoin = beforeServerId
    ? await em.findOne(ServerUser, { server: beforeServerId })
    : null

  if (beforeServerJoin) {
    serverJoin.position = ReorderUtils.positionAfter(beforeServerJoin.position)
  } else {
    const firstServerJoin = await em.findOne(
      ServerUser,
      { user },
      { orderBy: { position: QueryOrder.ASC } }
    )
    serverJoin.position = firstServerJoin
      ? ReorderUtils.positionBefore(firstServerJoin.position)
      : ReorderUtils.FIRST_POSITION
  }

  await em.persistAndFlush(serverJoin)
  await notifyServersReordered({ userId: user.id })
  return getJoinedServers({ em, user })
}
