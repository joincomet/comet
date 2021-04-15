import { Comment, ServerPermission } from '@/entity'
import { ChangePayload } from '@/resolver/subscriptions/ChangePayload'
import { SubscriptionFilter } from '@/resolver/subscriptions/filters/SubscriptionFilter'

export async function CommentSubscriptionFilter({
  payload: { id },
  context: { user, em }
}: SubscriptionFilter<ChangePayload>): Promise<boolean> {
  const comment = await em.findOneOrFail(Comment, id, ['post'])
  return user.hasServerPermission(
    em,
    comment.post.server.id,
    ServerPermission.ViewComments
  )
}
