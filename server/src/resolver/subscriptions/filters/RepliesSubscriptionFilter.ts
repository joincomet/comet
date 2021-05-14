import { Reply } from '@/entity'
import { SubscriptionFilter } from '@/resolver/subscriptions/filters/SubscriptionFilter'
import { ChangePayload } from '@/resolver/subscriptions'

export async function RepliesSubscriptionFilter({
  payload: { id },
  context: { userId, em }
}: SubscriptionFilter<ChangePayload>): Promise<boolean> {
  const reply = await em.findOne(Reply, { id, user: userId })
  return !!reply
}
