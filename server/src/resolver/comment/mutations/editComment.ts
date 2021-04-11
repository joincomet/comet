import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Length } from 'class-validator'
import { Context } from '@/types'
import { Comment } from '@/entity'
import { handleText } from '@/util'

@ArgsType()
export class EditCommentArgs {
  @Field(() => ID)
  commentId: string

  @Field()
  @Length(1, 100000, {
    message: 'Text must be between 1 and 100000 characters'
  })
  text: string
}

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
