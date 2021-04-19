import { ChannelPermission, Message, ServerPermission, User } from '@/entity'
import { ChangePayload } from '@/resolver/subscriptions/ChangePayload'
import { SubscriptionFilter } from '@/resolver/subscriptions/filters/SubscriptionFilter'

export async function MessageSubscriptionFilter({
  payload: { id },
  context: { userId, em }
}: SubscriptionFilter<ChangePayload>): Promise<boolean> {
  const message = await em.findOneOrFail(Message, id)
  const user = await em.findOneOrFail(User, userId)
  return user.hasChannelPermission(
    em,
    message.channel.id,
    ChannelPermission.ViewChannel,
    ServerPermission.ViewChannels
  )
}
