import { ChannelPermission, Context, ServerPermission } from '@/types'
import { MiddlewareFn } from 'type-graphql'
import { ChatChannel, ChatMessage, Server } from '@/entity'

/**
 * Expects serverId arg
 * Check if user has given ServerPermission
 * @param permission Required ServerPermission
 */
export function CheckServerPermission(
  permission: ServerPermission
): MiddlewareFn<Context> {
  return async ({ args: { serverId }, context: { em, user } }, next) => {
    if (!user) throw new Error('Not logged in')
    // if (!serverId) throw new Error('Args must include serverId')
    if (!serverId) return next()
    const server = await em.findOneOrFail(Server, serverId)
    await user.checkServerPermission(em, server, permission)
    return next()
  }
}
