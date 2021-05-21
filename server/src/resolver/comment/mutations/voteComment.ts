import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Comment, CommentVote, ServerPermission, User } from '@/entity'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'

@InputType()
export class VoteCommentInput {
  @Field(() => ID)
  commentId: string
}

export async function voteComment(
  { em, userId }: Context,
  { commentId }: VoteCommentInput,
  notifyCommentChanged: Publisher<ChangePayload>
): Promise<Comment> {
  const user = await em.findOneOrFail(User, userId)
  const comment = await em.findOneOrFail(Comment, commentId, [
    'author.user',
    'author.roles',
    'post.server'
  ])
  let vote = await em.findOne(CommentVote, { comment, user })
  if (vote) throw new Error('Already voted this comment')
  vote = em.create(CommentVote, { comment, user })
  comment.voteCount++
  comment.isVoted = true
  await em.persistAndFlush([vote, comment])
  await notifyCommentChanged({ id: commentId, type: ChangeType.Updated })
  return comment
}
