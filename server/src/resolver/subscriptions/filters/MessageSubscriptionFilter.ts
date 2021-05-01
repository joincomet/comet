import { ChannelPermission, Message, ServerPermission, User } from '@/entity'
import { ChangePayload } from '@/resolver/subscriptions/ChangePayload'
import { SubscriptionFilter } from '@/resolver/subscriptions/filters/SubscriptionFilter'

export async function MessageSubscriptionFilter({
  payload: { id },
  context: { userId, em }
}: SubscriptionFilter<ChangePayload>): Promise<boolean> {
  const message = await em.findOneOrFail(Message, id)
  const user = await em.findOneOrFail(User, userId)
  if (message.channel)
    return user.hasChannelPermission(
      em,
      message.channel.id,
      ChannelPermission.ViewChannel
    )
  else if (message.group) return user.isInGroup(em, message.group.id)
  else if (message.toUser)
    return message.toUser === user || message.author === user
}
