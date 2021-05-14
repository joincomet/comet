import { Server } from '@/entity'
import { Context } from '@/types'

export async function server(
  { em, userId }: Context,
  serverId: string
): Promise<Server> {
  return em.findOneOrFail(Server, serverId, ['owner'])
}
