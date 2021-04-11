import { Context } from '@/types'
import { Comment, CommentVote } from '@/entity'
import { Publisher } from 'type-graphql'

export async function voteComment(
  { em, user }: Context,
  commentId: string,
  notifyCommentUpdated?: Publisher<{ commentId: string }>
): Promise<Comment> {
  const comment = await em.findOneOrFail(Comment, commentId)
  let vote = await em.findOne(CommentVote, { user, comment })
  if (vote) throw new Error('error.comment.alreadyVoted')
  vote = em.create(CommentVote, { user, comment })
  comment.voteCount++
  comment.isVoted = true
  await em.persistAndFlush([comment, vote])
  if (notifyCommentUpdated)
    await notifyCommentUpdated({ commentId: comment.id })
  return comment
}
