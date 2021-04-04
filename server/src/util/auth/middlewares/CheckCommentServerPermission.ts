import {Context, ServerPermission} from '@/types'
import {createMethodDecorator} from 'type-graphql'
import {Comment} from '@/entity'

/**
 * Expects commentId arg
 * Check if user has given ServerPermission for comment server
 * @param permission Required ServerPermission
 */
export const CheckCommentServerPermission = (permission: ServerPermission) =>
  createMethodDecorator<Context>(
    async ({ args: { commentId }, context: { em, user } }, next) => {
      if (!user) throw new Error('error.notLoggedIn')
      // if (!commentId) throw new Error('Args must include commentId')
      if (!commentId) return next()
      const comment = await em.findOneOrFail(Comment, commentId, [
        'post.server'
      ])
      await user.checkServerPermission(em, comment.post.server, permission)
      return next()
    }
  )
