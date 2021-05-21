import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Comment, Reply, ServerPermission, User } from '@/entity'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'

@InputType()
export class DeleteCommentInput {
  @Field(() => ID)
  commentId: string
}

export async function deleteComment(
  { em, userId }: Context,
  { commentId }: DeleteCommentInput,
  notifyCommentChanged: Publisher<ChangePayload>,
  notifyReplyChanged: Publisher<ChangePayload>
): Promise<Comment> {
  const user = await em.findOneOrFail(User, userId)
  const comment = await em.findOneOrFail(Comment, commentId, [
    'post.server.owner',
    'author.user'
  ])
  if (comment.isDeleted) throw new Error('Comment already deleted')
  if (comment.author !== user)
    await user.checkServerPermission(
      em,
      comment.post.server.id,
      ServerPermission.ManageComments
    )
  comment.isDeleted = true
  // Delete replies associated with deleted comment
  const replies = await em.find(Reply, { comment })
  em.remove(replies)
  for (const reply of replies) {
    await notifyReplyChanged({
      id: reply.id,
      type: ChangeType.Deleted
    })
  }
  await em.persistAndFlush(comment)
  comment.text = '[deleted]'
  comment.author = null
  await notifyCommentChanged({ id: commentId, type: ChangeType.Deleted })
  return comment
}
