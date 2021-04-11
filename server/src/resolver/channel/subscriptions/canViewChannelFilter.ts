import {
  ChannelPermission,
  ServerPermission,
  SubscriptionFilter
} from '@/types'

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
