import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Comment, ServerPermission, User } from '@/entity'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import {logger} from "@/util";

@InputType()
export class PinCommentInput {
  @Field(() => ID)
  commentId: string
}

export async function pinComment(
  { em, userId }: Context,
  { commentId }: PinCommentInput,
  notifyCommentChanged: Publisher<ChangePayload>
): Promise<Comment> {
  logger('pinComment')
  const user = await em.findOneOrFail(User, userId)
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
