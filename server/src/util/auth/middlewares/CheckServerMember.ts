import { Context } from '@/types'
import { MiddlewareFn } from 'type-graphql'
import { Server } from '@/entity'

/**
 * Expects serverId arg
 * Check if user is owner of server
 */
export const CheckServerMember: MiddlewareFn<Context> = async (
  { args: { serverId }, context: { em, user } },
  next
) => {
  if (!user) throw new Error('Not logged in')
  // if (!serverId) throw new Error('Args must include serverId')
  if (!serverId) return next()
  const server = await em.findOneOrFail(Server, serverId)
  await user.checkJoinedServer(em, server)
  return next()
}
