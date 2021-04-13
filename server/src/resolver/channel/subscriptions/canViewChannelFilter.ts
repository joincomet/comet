import { SubscriptionFilter } from '@/types'
import { ChannelPermission, ServerPermission } from '@/entity'

export const canViewChannelFilter = async ({
  payload: { channelId },
  context: { em, user }
}: SubscriptionFilter<{ channelId: string }>) => {
  return user.hasChannelPermission(
    em,
    channelId,
    ChannelPermission.ViewChannel,
    ServerPermission.ViewChannels
  )
}
