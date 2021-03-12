import { ChannelPermission, Context, ServerPermission } from '@/types'
import { MiddlewareFn } from 'type-graphql'
import { ChatMessage } from '@/entity'

/**
 * Expects messageId arg
 * Check if message was sent in channel and user has given ChannelPermission or fallback ServerPermission
 * @param channelPermission Required ChannelPermission
 * @param serverPermission Fallback ServerPermission (if ChannelPermission is neither accepted or denied)
 */
export function CheckMessageChannelPermission(
  channelPermission: ChannelPermission,
  serverPermission: ServerPermission
): MiddlewareFn<Context> {
  return async ({ args: { messageId }, context: { em, user } }, next) => {
    if (!user) throw new Error('Not logged in')

    // if (!messageId) throw new Error('Args must include messageId')
    if (!messageId) return next()

    const message = await em.findOneOrFail(ChatMessage, messageId, ['channel'])

    if (!message.channel) throw new Error('Message was not sent in a Channel')

    await user.checkChannelPermission(
      em,
      message.channel,
      channelPermission,
      serverPermission
    )

    return next()
  }
}
