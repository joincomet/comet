import { ServerPermission, SubscriptionFilter } from '@/types'
import { Comment } from '@/entity'

export const canViewCommentsFilter = async ({
  payload: { commentId },
  context: { user, em }
}: SubscriptionFilter<{ commentId: string }>) => {
  const comment = await em.findOneOrFail(Comment, commentId, ['post.server'])
  return user.hasServerPermission(
    em,
    comment.post.server.id,
    ServerPermission.ViewComments
  )
}
