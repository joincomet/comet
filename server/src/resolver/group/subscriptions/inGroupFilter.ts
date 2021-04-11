import { SubscriptionFilter } from '@/types'
import { Group } from '@/entity'

export const inGroupFilter = async ({
  payload: { groupId },
  context: { em, user }
}: SubscriptionFilter<{ groupId: string }>) => {
  const group = await em.findOneOrFail(Group, groupId, ['users'])
  return group.users.contains(user)
}
