import { ChannelPermission, SubscriptionFilter } from '@/types'
import { MessagePayload } from '@/resolver/message'
import { Message } from '@/entity'

export const canViewMessageFilter = async ({
  payload: { messageId },
  context: { user, em }
}: SubscriptionFilter<MessageSentPayload>) => {
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
      ChannelPermission.ViewChannel
    )
  } else if (message.group) return message.group.users.contains(user)
  else if (message.toUser)
    return message.toUser === user || message.author === user
  else return false
}
