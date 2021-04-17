import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Comment, CommentVote, ServerPermission } from '@/entity'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'

@InputType()
export class UnvoteCommentInput {
  @Field(() => ID)
  commentId: string
}

export async function unvoteComment(
  { em, user }: Context,
  { commentId }: UnvoteCommentInput,
  notifyCommentChanged: Publisher<ChangePayload>
): Promise<Comment> {
  const comment = await em.findOneOrFail(Comment, commentId, ['post.server'])
  const vote = await em.findOneOrFail(CommentVote, { comment, user })
  await user.checkServerPermission(
    em,
    comment.post.server.id,
    ServerPermission.VoteComment
  )
  comment.voteCount--
  comment.isVoted = false
  await em.remove(vote).persistAndFlush(comment)
  await notifyCommentChanged({ id: commentId, type: ChangeType.Updated })
  return comment
}
