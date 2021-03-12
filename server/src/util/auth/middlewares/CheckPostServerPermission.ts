import { ChannelPermission, Context, ServerPermission } from '@/types'
import { MiddlewareFn } from 'type-graphql'
import { ChatChannel, ChatMessage, Post, Server } from '@/entity'

/**
 * Expects postId arg
 * Check if user has given ServerPermission for post server
 * @param permission Required ServerPermission
 */
export function CheckPostServerPermission(
  permission: ServerPermission
): MiddlewareFn<Context> {
  return async ({ args: { postId }, context: { em, user } }, next) => {
    if (!user) throw new Error('Not logged in')
    // if (!postId) throw new Error('Args must include postId')
    if (!postId) return next()
    const post = await em.findOneOrFail(Post, postId, ['server'])
    await user.checkServerPermission(em, post.server, permission)
    return next()
  }
}
