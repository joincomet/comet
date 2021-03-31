import { Context, ServerPermission } from '@/types'
import { createMethodDecorator } from 'type-graphql'
import { Server } from '@/entity'

/**
 * Expects serverId arg
 * Check if user has given ServerPermission
 * @param permission Required ServerPermission
 */
export const CheckServerPermission = (permission: ServerPermission) =>
  createMethodDecorator<Context>(
    async ({ args: { serverId }, context: { em, user } }, next) => {
      if (!user) throw new Error('error.notLoggedIn')
      // if (!serverId) throw new Error('Args must include serverId')
      if (!serverId) return next()
      const server = await em.findOneOrFail(Server, serverId)
      await user.checkServerPermission(em, server, permission)
      return next()
    }
  )
