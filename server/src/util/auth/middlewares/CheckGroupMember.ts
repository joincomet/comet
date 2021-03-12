import { Context } from '@/types'
import { createMethodDecorator } from 'type-graphql'
import { ChatGroup } from '@/entity'

/**
 * Expects groupId arg
 * Check if user is member of group
 */
export const CheckGroupMember = () =>
  createMethodDecorator<Context>(
    async ({ args: { groupId }, context: { em, user } }, next) => {
      if (!user) throw new Error('Not logged in')
      // if (!groupId) throw new Error('Args must include groupId')
      if (!groupId) return next()
      const group = await em.findOneOrFail(ChatGroup, groupId, ['users'])
      await user.checkInGroup(em, group)
      return next()
    }
  )
