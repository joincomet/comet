import { Context } from '@/types'
import { createMethodDecorator } from 'type-graphql'
import { Channel, Server } from '@/entity'

/**
 * Expects channelId arg
 * Check if user is in server of channel
 */
export const CheckJoinedChannelServer = () =>
  createMethodDecorator<Context>(
    async ({ args: { channelId }, context: { em, user } }, next) => {
      if (!user) throw new Error('error.notLoggedIn')
      // if (!channelId) throw new Error('Args must include channelId')
      if (!channelId) return next()
      const { server } = await em.findOneOrFail(Channel, channelId, ['server'])
      await user.checkJoinedServer(em, server)
      return next()
    }
  )
