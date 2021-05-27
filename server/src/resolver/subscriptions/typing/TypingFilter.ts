import { TypingPayload } from '@/resolver/subscriptions/typing/TypingPayload'
import { SubscriptionFilter } from '@/resolver/subscriptions/filters/SubscriptionFilter'

export function TypingFilter({
  payload: {
    channelId: typingChannelId,
    groupId: typingGroupId,
    userId: typingUserId
  },
  context: { userId: currentUserId },
  args: { channelId, groupId, userId }
}: SubscriptionFilter<TypingPayload>): boolean {
  if (typingChannelId && channelId === typingChannelId) {
    return true
  } else if (typingGroupId && groupId === typingGroupId) {
    return !!currentUserId;
  } else if (typingUserId) {
    if (!currentUserId) return false
    return (
      typingUserId && (userId === typingUserId || currentUserId === typingUserId)
    )
  }
}
