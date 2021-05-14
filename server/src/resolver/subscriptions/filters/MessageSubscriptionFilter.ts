import { Message, ServerPermission, User } from '@/entity'
import { ChangePayload } from '@/resolver/subscriptions/ChangePayload'
import { SubscriptionFilter } from '@/resolver/subscriptions/filters/SubscriptionFilter'

export async function MessageSubscriptionFilter({
  payload: { id },
  context: { userId, em }
}: SubscriptionFilter<ChangePayload>): Promise<boolean> {
  const message = await em.findOneOrFail(Message, id, ['channel.server'])
  const user = await em.findOneOrFail(User, userId)
  if (message.channel) {
    if (message.channel.isPrivate) {
      return user.hasServerPermission(
        em,
        message.channel.id,
        ServerPermission.PrivateChannels
      )
    } else if (!message.channel.server.isPublic) {
      return user.hasJoinedServer(em, message.channel.server.id)
    } else return true
  } else if (message.group) return user.isInGroup(em, message.group.id)
  else if (message.toUser)
    return message.toUser === user || message.author === user
}
