import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { ServerUser, ServerUserStatus } from '@/entity'
import {getReorderPosition, logger} from '@/util'

@InputType()
export class MoveServerInput {
  @Field(() => ID)
  serverId: string

  @Field(() => ID, { nullable: true })
  beforeServerId?: string
}

export async function moveServer(
  { em, userId, liveQueryStore }: Context,
  { serverId, beforeServerId }: MoveServerInput
): Promise<void> {
  logger('moveServer')
  const serverUsers = await em.find(
    ServerUser,
    { user: userId, status: ServerUserStatus.Joined },
    ['server'],
    {
      position: 'ASC'
    }
  )
  const serverUser = serverUsers.find(s => s.server.id === serverId)
  const firstServerUser = serverUsers[0]
  const beforeServerUser = beforeServerId
    ? serverUsers.find(s => s.server.id === beforeServerId)
    : null
  const afterServerUser = beforeServerUser
    ? serverUsers[serverUsers.indexOf(beforeServerUser) + 1]
    : null
  serverUser.position = getReorderPosition(
    firstServerUser?.position,
    beforeServerUser?.position,
    afterServerUser?.position
  )
  await em.persistAndFlush(serverUser)
  liveQueryStore.invalidate(`Server:${serverId}`)
}
