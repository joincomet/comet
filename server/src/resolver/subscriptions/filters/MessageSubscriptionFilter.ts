import { ChannelType, Message, ServerPermission, User } from '@/entity'
import { ChangePayload } from '@/resolver/subscriptions/ChangePayload'
import { SubscriptionFilter } from '@/resolver/subscriptions/filters/SubscriptionFilter'

export async function MessageSubscriptionFilter({
  payload: { id },
  context: { userId, em }
}: SubscriptionFilter<ChangePayload>): Promise<boolean> {
  const message = await em.findOneOrFail(Message, id, ['channel.server'])
  const user = userId ? await em.findOneOrFail(User, userId) : null
  if (message.channel) {
    if (message.channel.type === ChannelType.Private) {
      return (
        !!user &&
        (await user.hasServerPermission(
          em,
          message.channel.id,
          ServerPermission.PrivateChannels
        ))
      )
    } else return true
  } else if (message.group)
    return !!user && (await user.isInGroup(em, message.group.id))
  else if (message.toUser)
    return !!user && (message.toUser === user || message.author === user)
}
