import { ChannelPermission, Message, ServerPermission } from '@/entity'
import { ChangePayload } from '@/resolver/subscriptions/ChangePayload'
import { SubscriptionFilter } from '@/resolver/subscriptions/filters/SubscriptionFilter'

export async function MessageSubscriptionFilter({
  payload: { id },
  context: { user, em }
}: SubscriptionFilter<ChangePayload>): Promise<boolean> {
  const message = await em.findOneOrFail(Message, id)
  return user.hasChannelPermission(
    em,
    message.channel.id,
    ChannelPermission.ViewChannel,
    ServerPermission.ViewChannels
  )
}
