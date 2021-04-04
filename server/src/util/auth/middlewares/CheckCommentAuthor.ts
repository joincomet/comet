import {Context} from '@/types'
import {createMethodDecorator} from 'type-graphql'
import {Comment} from '@/entity'

/**
 * Expects groupId arg
 * Check if user is member of group
 */
export const CheckCommentAuthor = () =>
  createMethodDecorator<Context>(
    async ({ args: { commentId }, context: { em, user } }, next) => {
      if (!user) throw new Error('error.notLoggedIn')
      // if (!commentId) throw new Error('Args must include commentId')
      if (!commentId) return next()
      const message = await em.findOneOrFail(Comment, commentId, ['author'])
      if (message.author !== user) throw new Error('error.comment.notAuthor')
      return next()
    }
  )
