import { Post, User } from '@/entity'
import { ChangePayload } from '@/resolver/subscriptions/ChangePayload'
import { SubscriptionFilter } from '@/resolver/subscriptions/filters/SubscriptionFilter'

export async function PostSubscriptionFilter({
  payload: { id },
  context: { userId, em }
}: SubscriptionFilter<ChangePayload>): Promise<boolean> {
  const user = await em.findOneOrFail(User, userId)
  const post = await em.findOneOrFail(Post, id)
  return user.hasJoinedServer(em, post.server.id)
}
