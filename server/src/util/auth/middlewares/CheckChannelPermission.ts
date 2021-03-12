import { ChannelPermission, Context, ServerPermission } from '@/types'
import { createMethodDecorator } from 'type-graphql'
import { ChatChannel } from '@/entity'

/**
 * Expects channelId arg
 * Check if user has given ChannelPermission
 * @param channelPermission Required ChannelPermission
 * @param serverPermission Fallback ServerPermission (if ChannelPermission is neither accepted or denied)
 */
export const CheckChannelPermission = (
  channelPermission: ChannelPermission,
  serverPermission: ServerPermission
) =>
  createMethodDecorator<Context>(
    async ({ args: { channelId }, context: { em, user } }, next) => {
      if (!user) throw new Error('Not logged in')

      //if (!channelId) throw new Error('Args must include channelId')
      if (!channelId) return next()

      const channel = await em.findOneOrFail(ChatChannel, channelId)

      if (channel.server) {
        await user.checkChannelPermission(
          em,
          channel,
          channelPermission,
          serverPermission
        )
      }

      return next()
    }
  )
