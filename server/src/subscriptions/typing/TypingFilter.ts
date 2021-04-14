import { Channel, ChannelPermission, Group, ServerPermission } from '@/entity'
import { TypingPayload } from '@/subscriptions/typing/TypingPayload'
import { SubscriptionFilter } from '@/subscriptions/filters/SubscriptionFilter'

export async function TypingFilter({
  payload: {
    channelId: typingChannelId,
    groupId: typingGroupId,
    userId: typingUserId
  },
  context: { user, em },
  args: { channelId, groupId, userId }
}: SubscriptionFilter<TypingPayload>): Promise<boolean> {
  if (typingChannelId && channelId === typingChannelId) {
    const channel = await em.findOneOrFail(Channel, typingChannelId)
    return user.hasChannelPermission(
      em,
      channel.id,
      ChannelPermission.ViewChannel,
      ServerPermission.ViewChannels
    )
  } else if (typingGroupId && groupId === typingGroupId) {
    const group = await em.findOneOrFail(Group, typingGroupId)
    return group.users.contains(user)
  } else
    return typingUserId && (userId === typingUserId || user.id === typingUserId)
}
