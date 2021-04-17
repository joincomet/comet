import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Comment, Reply, ServerPermission } from '@/entity'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { BulkChangePayload } from '@/resolver/subscriptions/BulkChangePayload'

@InputType()
export class DeleteCommentInput {
  @Field(() => ID)
  commentId: string
}

export async function deleteComment(
  { em, user }: Context,
  { commentId }: DeleteCommentInput,
  notifyCommentChanged: Publisher<ChangePayload>,
  notifyRepliesChanged: Publisher<BulkChangePayload>
): Promise<Comment> {
  const comment = await em.findOneOrFail(Comment, commentId, [
    'post.server.owner',
    'author.user'
  ])
  if (comment.isDeleted) throw new Error('Comment already deleted')
  if (comment.author.user !== user)
    await user.checkServerPermission(
      em,
      comment.post.server.id,
      ServerPermission.ManageComments
    )
  comment.isDeleted = true
  // Delete replies associated with deleted comment
  const replies = await em.find(Reply, { comment })
  em.remove(replies)
  await notifyRepliesChanged({
    ids: replies.map(reply => reply.id),
    type: ChangeType.Deleted
  })
  await em.persistAndFlush(comment)
  comment.text = '[deleted]'
  comment.author = null
  await notifyCommentChanged({ id: commentId, type: ChangeType.Deleted })
  return comment
}
