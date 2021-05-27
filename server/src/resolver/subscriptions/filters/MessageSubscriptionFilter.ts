import { ChannelType, Message, ServerPermission, User } from '@/entity'
import { ChangePayload } from '@/resolver/subscriptions/ChangePayload'
import { SubscriptionFilter } from '@/resolver/subscriptions/filters/SubscriptionFilter'

export async function MessageSubscriptionFilter({
  payload: { id },
  context: { userId, em }
}: SubscriptionFilter<ChangePayload>): Promise<boolean> {
  const message = await em.findOneOrFail(Message, id)
  if (message.channel) {
    if (message.channel.type === ChannelType.Private) {
      if (!userId) return false
      const user = await em.findOneOrFail(User, userId)
      return (
        !!user &&
        (await user.hasServerPermission(
          em,
          message.channel.id,
          ServerPermission.PrivateChannels
        ))
      )
    } else return true
  } else if (message.group) {
    if (!userId) return false
    const user = await em.findOneOrFail(User, userId)
    return user.isInGroup(em, message.group.id)
  }
  else if (message.toUser){
    if (!userId) return false
    return (message.toUser === em.getReference(User, userId) || message.author === em.getReference(User, userId))
  }
}
