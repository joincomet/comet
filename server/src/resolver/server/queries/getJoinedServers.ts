import { Server, ServerUser } from '@/entity'
import { Context } from '@/types'
import { QueryOrder } from '@mikro-orm/core'
import { ServerUserStatus } from '@/resolver/server/types/ServerUserStatus'

export async function getJoinedServers({
  em,
  user
}: Context): Promise<Server[]> {
  const joins = await em.find(
    ServerUser,
    { user, status: ServerUserStatus.Joined },
    ['server'],
    { position: QueryOrder.ASC }
  )
  return joins.map(j => j.server)
}
