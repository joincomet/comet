import { Context } from '@/types'
import { MiddlewareFn } from 'type-graphql'
import { ChatGroup, User, UserBlock } from '@/entity'

/**
 * Expects userId arg
 * Check if user is blocked
 */
export const CheckBlock: MiddlewareFn<Context> = async (
  { args: { userId }, context: { em, user } },
  next
) => {
  if (!user) throw new Error('Not logged in')
  // if (!userId) throw new Error('Args must include userId')
  if (!userId) return next()
  const blockedUser = await em.findOneOrFail(User, userId)
  const block = await em.findOneOrFail(UserBlock, {
    $or: [
      { user, blockedUser },
      { user: blockedUser, blockedUser: user }
    ]
  })
  if (block) {
    if (block.user === user) throw new Error('You are blocking that user')
    else if (block.user === blockedUser)
      throw new Error('That user has blocked you')
  }
  return next()
}
