import { Reply } from '@/entity'
import { SubscriptionFilter } from '@/resolver/subscriptions/filters/SubscriptionFilter'
import { BulkChangePayload } from '@/resolver/subscriptions/BulkChangePayload'

export async function RepliesSubscriptionFilter({
  payload: { ids },
  context: { user, em }
}: SubscriptionFilter<BulkChangePayload>): Promise<boolean> {
  const replies = await em.find(Reply, { id: ids, toUser: user })
  return !!replies.length
}
