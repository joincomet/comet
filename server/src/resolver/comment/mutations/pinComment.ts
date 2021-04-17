import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Comment, ServerPermission } from '@/entity'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'

@InputType()
export class PinCommentInput {
  @Field(() => ID)
  commentId: string
}

export async function pinComment(
  { em, user }: Context,
  { commentId }: PinCommentInput,
  notifyCommentChanged: Publisher<ChangePayload>
): Promise<Comment> {
  const comment = await em.findOneOrFail(Comment, commentId, ['post.server'])
  if (comment.isPinned) throw new Error('Comment already pinned')
  await user.checkServerPermission(
    em,
    comment.post.server.id,
    ServerPermission.ManageComments
  )
  comment.isPinned = true
  comment.pinnedAt = new Date()
  await em.persistAndFlush(comment)
  await notifyCommentChanged({ id: commentId, type: ChangeType.Updated })
  return comment
}
