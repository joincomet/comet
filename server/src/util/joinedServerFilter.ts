import { SubscriptionFilter } from '@/types'

export const joinedServerFilter = async ({
  payload: { serverId },
  context: { em, user }
}: SubscriptionFilter<{ serverId: string }>) => {
  return user.hasJoinedServer(em, serverId)
}
