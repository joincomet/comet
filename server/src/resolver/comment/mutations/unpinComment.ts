import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Comment, ServerPermission, User } from '@/entity'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import {logger} from "@/util";

@InputType()
export class UnpinCommentInput {
  @Field(() => ID)
  commentId: string
}

export async function unpinComment(
  { em, userId }: Context,
  { commentId }: UnpinCommentInput,
  notifyCommentChanged: Publisher<ChangePayload>
): Promise<Comment> {
  logger('unpinComment')
  const user = await em.findOneOrFail(User, userId)
  const comment = await em.findOneOrFail(Comment, commentId, ['post.server'])
  if (!comment.isPinned) throw new Error('Comment not pinned')
  await user.checkServerPermission(
    em,
    comment.post.server.id,
    ServerPermission.ManageComments
  )
  comment.isPinned = false
  comment.pinnedAt = null
  await em.persistAndFlush(comment)
  await notifyCommentChanged({ id: commentId, type: ChangeType.Updated })
  return comment
}
