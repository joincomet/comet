import { Context, ServerPermission } from '@/types'
import { createMethodDecorator } from 'type-graphql'
import { Post } from '@/entity'

/**
 * Expects postId arg
 * Check if user has given ServerPermission for post server
 * @param permission Required ServerPermission
 */
export const CheckPostServerPermission = (permission: ServerPermission) =>
  createMethodDecorator<Context>(
    async ({ args: { postId }, context: { em, user } }, next) => {
      if (!user) throw new Error('Not logged in')
      // if (!postId) throw new Error('Args must include postId')
      if (!postId) return next()
      const post = await em.findOneOrFail(Post, postId, ['server'])
      await user.checkServerPermission(em, post.server, permission)
      return next()
    }
  )
