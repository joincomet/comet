import { Server, ServerUser } from '@/entity'
import { Context } from '@/types'
import { QueryOrder } from '@mikro-orm/core'
import { ServerUserStatus } from '@/entity/server/ServerUserStatus'

export async function getJoinedServers({
  em,
  user
}: Context): Promise<Server[]> {
  const joins = await em.find(
    ServerUser,
    { user, status: ServerUserStatus.Joined },
    ['server', 'roles.channelRoles'],
    { position: QueryOrder.ASC }
  )
  return joins.map(j => j.server)
}
