import { Context, ServerPermission } from '@/types'
import { createMethodDecorator } from 'type-graphql'
import { Channel } from '@/entity'

/**
 * Expects channelId arg
 * Check if user has given ServerPermission
 * @param permission Required ServerPermission
 */
export const CheckChannelServerPermission = (permission: ServerPermission) =>
  createMethodDecorator<Context>(
    async ({ args: { channelId }, context: { em, user } }, next) => {
      if (!user) throw new Error('error.notLoggedIn')
      if (!channelId) return next()
      const channel = await em.findOneOrFail(Channel, channelId, ['server'])
      await user.checkServerPermission(em, channel.server, permission)
      return next()
    }
  )
