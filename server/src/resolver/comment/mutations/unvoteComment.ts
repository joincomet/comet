import { Comment, CommentVote } from '@/entity'
import { Context } from '@/types'
import { Publisher } from 'type-graphql'

export async function unvoteComment(
  { em, user }: Context,
  commentId: string,
  notifyCommentUpdated: Publisher<{ commentId: string }>
) {
  const comment = await em.findOneOrFail(Comment, commentId)
  const vote = await em.findOneOrFail(CommentVote, { user, comment })
  comment.voteCount--
  comment.isVoted = false
  await em.remove(vote).persistAndFlush([comment])
  await notifyCommentUpdated({ commentId: comment.id })
  return comment
}
