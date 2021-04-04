import {Context} from '@/types'
import {createMethodDecorator} from 'type-graphql'
import {Server} from '@/entity'

/**
 * Expects serverId arg
 * Check if user is owner of server
 */
export const CheckServerOwner = () =>
  createMethodDecorator<Context>(
    async ({ args: { serverId }, context: { em, user } }, next) => {
      if (!user) throw new Error('error.notLoggedIn')
      // if (!serverId) throw new Error('Args must include serverId')
      if (!serverId) return next()
      const server = await em.findOneOrFail(Server, serverId, ['owner'])
      if (server.owner !== user) throw new Error('error.server.notOwner')
      return next()
    }
  )
