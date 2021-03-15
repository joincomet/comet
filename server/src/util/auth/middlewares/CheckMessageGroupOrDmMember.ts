import { Context } from '@/types'
import { createMethodDecorator } from 'type-graphql'
import { Message } from '@/entity'

/**
 * Expects groupId arg
 * Check if user is member of group
 */
export const CheckMessageGroupOrDmMember = () =>
  createMethodDecorator<Context>(
    async ({ args: { messageId }, context: { em, user } }, next) => {
      if (!user) throw new Error('Not logged in')
      // if (!messageId) throw new Error('Args must include messageId')
      if (!messageId) return next()
      const message = await em.findOneOrFail(Message, messageId, [
        'group.users',
        'directMessage.user1',
        'directMessage.user2'
      ])
      if (message.group) {
        await user.checkInGroup(em, message.group)
      } else if (message.directMessage) {
        await user.checkInDM(em, message.directMessage)
      }
      return next()
    }
  )
