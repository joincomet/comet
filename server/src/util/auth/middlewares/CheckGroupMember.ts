import { Context } from '@/types'
import { createMethodDecorator } from 'type-graphql'
import { Group } from '@/entity'

/**
 * Expects groupId arg
 * Check if user is member of group
 */
export const CheckGroupMember = () =>
  createMethodDecorator<Context>(
    async ({ args: { groupId }, context: { em, user } }, next) => {
      if (!user) throw new Error('error.notLoggedIn')
      // if (!groupId) throw new Error('Args must include groupId')
      if (!groupId) return next()
      const group = await em.findOneOrFail(Group, groupId, ['users'])
      await user.checkInGroup(em, group)
      return next()
    }
  )
