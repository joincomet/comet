import { Context } from '@/types'
import { createMethodDecorator } from 'type-graphql'
import { ChatMessage } from '@/entity'

/**
 * Expects groupId arg
 * Check if user is member of group
 */
export const CheckMessageAuthor = () =>
  createMethodDecorator<Context>(
    async ({ args: { messageId }, context: { em, user } }, next) => {
      if (!user) throw new Error('Not logged in')
      // if (!messageId) throw new Error('Args must include messageId')
      if (!messageId) return next()
      const message = await em.findOneOrFail(ChatMessage, messageId, ['author'])
      if (message.author !== user)
        throw new Error('You are not the author of this message')
      return next()
    }
  )
