import { Context } from '@/types'
import { Comment, Reply } from '@/entity'
import { PostCommentPayload } from '@/resolver/comment/subscriptions/PostCommentPayload'
import { Publisher } from 'type-graphql'

export async function deleteComment(
  { em, user }: Context,
  commentId: string,
  notifyCommentDeleted: Publisher<PostCommentPayload>
): Promise<boolean> {
  const comment = await em.findOne(Comment, commentId, ['author', 'post'])
  if (comment.author !== user) throw new Error('error.comment.notAuthor')

  if (comment.isDeleted) throw new Error('error.comment.alreadyDeleted')

  comment.post.commentCount--
  comment.isDeleted = true
  comment.isPinned = false
  await em.persistAndFlush(comment)
  await em.nativeDelete(Reply, { comment })
  await notifyCommentDeleted({ postId: comment.post.id, commentId: comment.id })
  return true
}
