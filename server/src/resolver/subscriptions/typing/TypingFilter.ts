import {
  Channel,
  ChannelPermission,
  Group,
  ServerPermission,
  User
} from '@/entity'
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
    const channel = await em.findOneOrFail(Channel, typingChannelId)
    const user = await em.findOneOrFail(User, currentUserId)
    return user.hasChannelPermission(
      em,
      channel.id,
      ChannelPermission.ViewChannel,
      ServerPermission.ViewChannels
    )
  } else if (typingGroupId && groupId === typingGroupId) {
    const group = await em.findOneOrFail(Group, typingGroupId)
    return group.users.contains(em.getReference(User, currentUserId))
  } else
    return (
      typingUserId &&
      (userId === typingUserId || currentUserId === typingUserId)
    )
}
