import { Comment, ServerPermission, User } from '@/entity'
import { ChangePayload } from '@/resolver/subscriptions/ChangePayload'
import { SubscriptionFilter } from '@/resolver/subscriptions/filters/SubscriptionFilter'

export async function CommentSubscriptionFilter({
  payload: { id },
  context: { userId, em }
}: SubscriptionFilter<ChangePayload>): Promise<boolean> {
  const comment = await em.findOneOrFail(Comment, id, ['post'])
  const user = await em.findOneOrFail(User, userId)
  return user.hasServerPermission(
    em,
    comment.post.server.id,
    ServerPermission.ViewComments
  )
}
