import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { Comment, CommentVote, User, VoteType } from '@/entity'
import {logger} from "@/util";

@InputType()
export class UpdateCommentVoteInput {
  @Field(() => ID)
  commentId: string

  @Field(() => VoteType)
  type: VoteType
}

export async function updateCommentVote(
  { em, userId }: Partial<Context>,
  { commentId, type }: UpdateCommentVoteInput,
  notifyCommentChanged: Publisher<ChangePayload>
): Promise<Comment> {
  logger('updateCommentVote')
  const user = await em.findOneOrFail(User, userId)
  const comment = await em.findOneOrFail(Comment, commentId, [
    'author',
    'post.server'
  ])
  if (type === VoteType.Down && !comment.post.server.isDownvotesEnabled)
    throw new Error('This server does not allow downvotes')
  let vote = await em.findOne(CommentVote, { comment, user })
  if (!vote) vote = em.create(CommentVote, { comment, user })
  if (type === VoteType.Up) {
    comment.voteCount++
    if (vote.type === VoteType.Down) comment.voteCount++
  } else if (type === VoteType.Down) {
    comment.voteCount--
    if (vote.type === VoteType.Up) comment.voteCount--
  } else if (type === VoteType.None) {
    if (vote.type === VoteType.Up) comment.voteCount--
    else if (vote.type === VoteType.Down) comment.voteCount++
  }
  comment.voteType = type
  vote.type = type
  await em.persistAndFlush([vote, comment])
  await notifyCommentChanged({ id: commentId, type: ChangeType.Updated })
  return comment
}
