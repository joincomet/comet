import { SubscriptionFilter } from '@/types'
import { ChannelPermission, Message, ServerPermission } from '@/entity'
import { MessagePayload } from '@/resolver/message/subscriptions/MessagePayload'

export const canViewMessageFilter = async ({
  payload: { messageId },
  context: { user, em }
}: SubscriptionFilter<MessagePayload>) => {
  const message = await em.findOneOrFail(Message, messageId, [
    'channel.server',
    'group.users',
    'toUser',
    'author'
  ])

  if (message.channel) {
    return user.hasChannelPermission(
      em,
      message.channel.id,
      ChannelPermission.ViewChannel,
      ServerPermission.ViewChannels
    )
  } else if (message.group) return message.group.users.contains(user)
  else if (message.toUser)
    return message.toUser === user || message.author === user
  else return false
}
