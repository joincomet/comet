import { Reply } from '@/entity'
import { ChangePayload } from '@/subscriptions/ChangePayload'
import { SubscriptionFilter } from '@/subscriptions/filters/SubscriptionFilter'

export async function ReplySubscriptionFilter({
  payload: { id },
  context: { user, em }
}: SubscriptionFilter<ChangePayload>): Promise<boolean> {
  const reply = await em.findOneOrFail(Reply, id, ['toUser'])
  return reply.toUser.id === user.id
}
