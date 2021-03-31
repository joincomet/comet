import { ChannelPermission, Context, ServerPermission } from '@/types'
import { createMethodDecorator } from 'type-graphql'
import { Message } from '@/entity'

/**
 * Expects messageId arg
 * Check if message was sent in channel and user has given ChannelPermission or fallback ServerPermission
 * @param channelPermission Required ChannelPermission
 * @param serverPermission Fallback ServerPermission (if ChannelPermission is neither accepted or denied)
 */
export const CheckMessageChannelPermission = (
  channelPermission: ChannelPermission,
  serverPermission: ServerPermission
) =>
  createMethodDecorator<Context>(
    async ({ args: { messageId }, context: { em, user } }, next) => {
      if (!user) throw new Error('error.notLoggedIn')

      // if (!messageId) throw new Error('Args must include messageId')
      if (!messageId) return next()

      const message = await em.findOneOrFail(Message, messageId, ['channel'])

      if (!message.channel) throw new Error('error.message.notSentInChannel')

      await user.checkChannelPermission(
        em,
        message.channel,
        channelPermission,
        serverPermission
      )

      return next()
    }
  )
