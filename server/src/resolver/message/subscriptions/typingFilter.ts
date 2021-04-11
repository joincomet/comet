import { ChannelPermission, SubscriptionFilter } from '@/types'
import { TypingPayload } from '@/resolver/message'
import { Channel, Group } from '@/entity'

export const typingFilter = async ({
  payload: {
    channelId: typingChannelId,
    groupId: typingGroupId,
    userId: typingUserId
  },
  context: { user, em },
  args: { channelId, groupId, userId }
}: SubscriptionFilter<TypingPayload>) => {
  if (typingChannelId && channelId === typingChannelId) {
    const channel = await em.findOneOrFail(Channel, typingChannelId)
    return user.hasChannelPermission(
      em,
      channel.id,
      ChannelPermission.ViewChannel
    )
  } else if (typingGroupId && groupId === typingGroupId) {
    const group = await em.findOneOrFail(Group, typingGroupId)
    return group.users.contains(user)
  } else
    return typingUserId && (userId === typingUserId || user.id === typingUserId)
}
