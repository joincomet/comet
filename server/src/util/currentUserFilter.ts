import {
  ChannelPermission,
  ServerPermission,
  SubscriptionFilter
} from '@/types'

export const currentUserFilter = ({
  payload: { userId },
  context: { user }
}: SubscriptionFilter<{ userId: string }>) => {
  return user.id === userId
}
