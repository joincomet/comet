import { Channel, Group, ServerPermission, User } from '@/entity'
import { TypingPayload } from '@/resolver/subscriptions/typing/TypingPayload'
import { SubscriptionFilter } from '@/resolver/subscriptions/filters/SubscriptionFilter'

export async function TypingFilter({
  payload: {
    channelId: typingChannelId,
    groupId: typingGroupId,
    userId: typingUserId
  },
  context: { userId: currentUserId, em },
  args: { channelId, groupId, userId }
}: SubscriptionFilter<TypingPayload>): Promise<boolean> {
  if (typingChannelId && channelId === typingChannelId) {
    const channel = await em.findOneOrFail(Channel, typingChannelId, ['server'])
    const user = currentUserId
      ? await em.findOneOrFail(User, currentUserId)
      : null
    if (channel.isPrivate) {
      return user.hasServerPermission(
        em,
        channel.id,
        ServerPermission.PrivateChannels
      )
    } else if (!channel.server.isPublic) {
      return user.hasJoinedServer(em, channel.server.id)
    } else return true
  } else if (typingGroupId && groupId === typingGroupId) {
    if (!currentUserId) return false
    const group = await em.findOneOrFail(Group, typingGroupId)
    return group.users.contains(em.getReference(User, currentUserId))
  } else if (typingUserId) if (!currentUserId) return false
  return (
    typingUserId && (userId === typingUserId || currentUserId === typingUserId)
  )
}
