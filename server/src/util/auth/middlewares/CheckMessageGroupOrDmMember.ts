import { Context } from '@/types'
import { MiddlewareFn } from 'type-graphql'
import { ChatGroup, ChatMessage, DirectMessage } from '@/entity'

/**
 * Expects groupId arg
 * Check if user is member of group
 */
export const CheckMessageGroupOrDmMember: MiddlewareFn<Context> = async (
  { args: { messageId }, context: { em, user } },
  next
) => {
  if (!user) throw new Error('Not logged in')
  // if (!messageId) throw new Error('Args must include messageId')
  if (!messageId) return next()
  const message = await em.findOneOrFail(ChatMessage, messageId, [
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
