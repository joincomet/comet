import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Length } from 'class-validator'
import { Context } from '@/types'
import { Comment } from '@/entity'
import { handleText } from '@/util'

export async function editComment(
  { em, user }: Context,
  { commentId, text }: EditCommentArgs,
  notifyCommentUpdated: Publisher<{ commentId: string }>
): Promise<Comment> {
  const comment = await em.findOne(Comment, commentId, ['author'])
  if (comment.author !== user) throw new Error('error.post.notAuthor')
  text = handleText(text)
  comment.editedAt = new Date()
  comment.text = text
  await em.persistAndFlush(comment)
  await notifyCommentUpdated({ commentId: comment.id })
  return comment
}
