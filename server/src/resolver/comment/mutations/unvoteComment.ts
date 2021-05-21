import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Comment, CommentVote, ServerPermission, User } from '@/entity'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'

@InputType()
export class UnvoteCommentInput {
  @Field(() => ID)
  commentId: string
}

export async function unvoteComment(
  { em, userId }: Context,
  { commentId }: UnvoteCommentInput,
  notifyCommentChanged: Publisher<ChangePayload>
): Promise<Comment> {
  const comment = await em.findOneOrFail(Comment, commentId, [
    'author.user',
    'author.roles',
    'post.server'
  ])
  const user = await em.findOneOrFail(User, userId)
  const vote = await em.findOneOrFail(CommentVote, { comment, user })
  comment.voteCount--
  comment.isVoted = false
  await em.remove(vote).persistAndFlush(comment)
  await notifyCommentChanged({ id: commentId, type: ChangeType.Updated })
  return comment
}
